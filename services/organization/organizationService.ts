import { db, storage } from '@/config/firebaseConfig';
import { Organization } from '@/model/organization';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    increment,
    limit,
    query,
    serverTimestamp,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';


export type OrganizationInput = Omit<Organization, 'id' | 'ownerUid'> & { id?: number };

export interface OrganizationDocument extends Organization {
    docId: string;
    createdAt: Timestamp;
}

const organizationsCollectionRef = collection(db, 'organizations');

/**
 * Adiciona uma nova organização ao Firestore.
 * @param {OrganizationInput} organizationData - Os dados da organização.
 * @returns {Promise<string>} O ID do documento Firestore recém-criado.
 */
const addOrganization = async (organizationData: OrganizationInput): Promise<string> => {
    try {
        const dataToSave = {
            ...organizationData,
            id: organizationData.id || Date.now(),
            createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(organizationsCollectionRef, dataToSave);
        return docRef.id;
    } catch (error) {
        console.error('Erro ao adicionar organização:', error);
        throw new Error('Não foi possível adicionar a organização.');
    }
};

/**
 * Busca todas as organizações do Firestore.
 * @returns {Promise<OrganizationDocument[]>} Uma lista de organizações.
 */
const getAllOrganizations = async (): Promise<OrganizationDocument[]> => {
    try {
        const querySnapshot = await getDocs(organizationsCollectionRef);
        return querySnapshot.docs.map((doc) => ({
            docId: doc.id,
            ...(doc.data() as Omit<OrganizationDocument, 'docId'>),
        }));
    } catch (error) {
        console.error('Erro ao buscar organizações:', error);
        throw new Error('Não foi possível buscar as organizações.');
    }
};

/**
 * Busca uma única organização pelo seu ID de documento do Firestore.
 * @param {string} docId - O ID do documento da organização.
 * @returns {Promise<OrganizationDocument|null>} O objeto da organização ou null se não encontrado.
 */
const getOrganizationByDocId = async (docId: string): Promise<OrganizationDocument | null> => {
    try {
        const docRef = doc(db, 'organizations', docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { docId: docSnap.id, ...(docSnap.data() as Omit<OrganizationDocument, 'docId'>) };
        }
        return null;
    } catch (error) {
        console.error('Erro ao buscar organização por ID:', error);
        throw new Error('Não foi possível buscar a organização.');
    }
};

/**
 * Busca uma única organização pelo seu ID numérico (o campo 'id' dentro do documento).
 * @param {number} id - O ID numérico da organização.
 * @returns {Promise<OrganizationDocument|null>} O objeto da organização ou null se não encontrado.
 */
const getOrganizationById = async (id: string): Promise<OrganizationDocument | null> => {
    try {
        const q = query(organizationsCollectionRef, where('id', '==', id), limit(1));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0]; 
            return { docId: docSnap.id, ...(docSnap.data() as Omit<OrganizationDocument, 'docId'>) };
        }

        return null;
    } catch (error) {
        console.error('Erro ao buscar organização por ID numérico:', error);
        throw new Error('Não foi possível buscar a organização.');
    }
};

/**
 * Atualiza uma organização existente no Firestore.
 * @param {string} docId - O ID do documento a ser atualizado.
 * @param {Partial<OrganizationInput>} updatedData - Os campos a serem atualizados.
 */
const updateOrganization = async (docId: string, updatedData: Partial<OrganizationInput>): Promise<void> => {
    try {
        const docRef = doc(db, 'organizations', docId);
        await updateDoc(docRef, updatedData);
    } catch (error) {
        console.error('Erro ao atualizar organização:', error);
        throw new Error('Não foi possível atualizar a organização.');
    }
};

/**
 * Deleta uma organização do Firestore e o seu logo do Storage.
 * @param {string} docId - O ID do documento a ser deletado.
 */
const deleteOrganization = async (docId: string): Promise<void> => {
    try {
        const docRef = doc(db, 'organizations', docId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error('Organização não encontrada.');
        }

        const organizationData = docSnap.data() as Organization;

        if (organizationData.team.logo) {
            try {
                const logoRef = ref(storage, organizationData.team.logo);
                await deleteObject(logoRef);
            } catch (err) {
                console.warn('Erro ao deletar o logo do Storage:', err);
            }
        }

        await deleteDoc(docRef);
    } catch (error) {
        console.error('Erro ao deletar organização:', error);
        throw new Error('Não foi possível deletar la organização.');
    }
};

export const organizationService = {
    addOrganization,
    getAllOrganizations,
    getOrganizationByDocId,
    updateOrganization,
    deleteOrganization,
    getOrganizationById
};
