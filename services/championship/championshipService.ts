import { db, storage } from '@/config/firebaseConfig';
import { Championship, Match } from '@/model/championship';
import { Team } from '@/model/team';
import {
    addDoc,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    Timestamp,
    updateDoc
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

export type ChampionshipInput = Omit<Championship, 'id'> & { id?: number };

export interface ChampionshipDocument extends Championship {
    docId: string;
    createdAt: Timestamp;
}

const championshipsCollectionRef = collection(db, 'championships');

/**
 * Adiciona um novo campeonato ao Firestore.
 * @param {ChampionshipInput} championshipData - Os dados do campeonato.
 * @returns {Promise<string>} O ID do documento Firestore recém-criado.
 */
const addChampionship = async (championshipData: ChampionshipInput): Promise<string> => {
    try {
        const dataToSave = {
            ...championshipData,
            id: championshipData.id || Date.now(),
            createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(championshipsCollectionRef, dataToSave);
        return docRef.id;
    } catch (error) {
        console.error('Erro ao adicionar campeonato:', error);
        throw new Error('Não foi possível adicionar o campeonato.');
    }
};

/**
 * Busca todos os campeonatos do Firestore, ordenados pela data de criação.
 * @returns {Promise<ChampionshipDocument[]>} Uma lista de campeonatos.
 */
const getAllChampionships = async (): Promise<ChampionshipDocument[]> => {
    try {
        const querySnapshot = await getDocs(championshipsCollectionRef);

        const championshipList = querySnapshot.docs.map((doc) => ({
            docId: doc.id,
            ...(doc.data() as Omit<ChampionshipDocument, 'docId'>),
        }));

        return championshipList;

    } catch (error) {
        console.error('Erro ao buscar campeonatos:', error);
        throw new Error('Não foi possível buscar os campeonatos.');
    }
};

/**
 * Busca um único campeonato pelo seu ID de documento do Firestore.
 * @param {string} docId - O ID do documento do campeonato.
 * @returns {Promise<ChampionshipDocument|null>} O objeto do campeonato ou null se não encontrado.
 */
const getChampionshipByDocId = async (docId: string): Promise<ChampionshipDocument | null> => {
    try {
        const docRef = doc(db, 'championships', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { docId: docSnap.id, ...(docSnap.data() as Omit<ChampionshipDocument, 'docId'>) };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar campeonato por ID:', error);
        throw new Error('Não foi possível buscar o campeonato.');
    }
};

/**
 * Atualiza um campeonato existente no Firestore.
 * @param {string} docId - O ID do documento a ser atualizado.
 * @param {Partial<ChampionshipInput>} updatedData - Os campos a serem atualizados.
 */
const updateChampionship = async (docId: string, updatedData: Partial<ChampionshipInput>): Promise<void> => {
    try {
        const docRef = doc(db, 'championships', docId);
        await updateDoc(docRef, updatedData);
    } catch (error) {
        console.error('Erro ao atualizar campeonato:', error);
        throw new Error('Não foi possível atualizar o campeonato.');
    }
};

/**
 * Deleta um campeonato do Firestore.
 * @param {string} docId - O ID do documento a ser deletado.
 */
const deleteChampionship = async (docId: string): Promise<void> => {
    try {
        const docRef = doc(db, 'championships', docId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error('Campeonato não encontrado.');
        }

        const championshipData = docSnap.data() as { image?: string };

        if (championshipData.image) {
            try {
                const imageRef = ref(storage, championshipData.image);
                await deleteObject(imageRef);
                console.log('Imagem deletada com sucesso.');
            } catch (err) {
                console.warn('Erro ao deletar a imagem do Storage:', err);
            }
        }

        await deleteDoc(docRef);
        console.log('Campeonato deletado com sucesso.');
    } catch (error) {
        console.error('Erro ao deletar campeonato:', error);
        throw new Error('Não foi possível deletar o campeonato.');
    }
};

/**
 * Adiciona uma equipa ao array 'registeredTeams' de um campeonato.
 * @param {string} docId - O ID do documento do campeonato.
 * @param {Team} team - O objeto da equipa a ser adicionada.
 */
const addTeamToChampionship = async (docId: string, teamId: number): Promise<void> => {
    try {
        const docRef = doc(db, 'championships', docId);

        await updateDoc(docRef, {
            registeredTeams: arrayUnion(teamId),
        });
    } catch (error) {
        console.error('Erro ao adicionar a equipe ao campeonato:', error);
        throw new Error('Não foi possível inscrever a equipe.');
    }
};

/**
 * Publica um campeonato, alterando o campo 'isPublished' para true.
 * @param {string} docId - O ID do documento do campeonato.
 */
const publishChampionship = async (docId: string): Promise<void> => {
    try {
        const docRef = doc(db, 'championships', docId);
        await updateDoc(docRef, {
            isPublished: true,
        });
    } catch (error) {
        console.error('Erro ao publicar campeonato:', error);
        throw new Error('Não foi possível publicar o campeonato.');
    }
};


const startTournament = async (docId: string, matches: Match[]): Promise<void> => {
    try {
        const docRef = doc(db, 'championships', docId);

        await updateDoc(docRef, {
            matches: matches
        });
    } catch (error) {
        console.error('Erro ao iniciar torneio:', error);
        throw error;
    }
};

export const championshipService = {
    addChampionship,
    getAllChampionships,
    getChampionshipByDocId,
    updateChampionship,
    deleteChampionship,
    addTeamToChampionship,
    publishChampionship,
    startTournament
};
