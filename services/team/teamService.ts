import { db, storage } from '@/config/firebaseConfig';
import { Team } from '@/model/team';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

export interface Player {
    id: number;
    name: string;
    photo?: string | null;
}

export type TeamInput = Omit<Team, 'id'> & { id?: number };

export interface TeamDocument extends Team {
    docId: string;
    createdAt: Timestamp;
}

const teamsCollectionRef = collection(db, 'teams');

/**
 * Adiciona uma nova equipa ao Firestore.
 */
const addTeam = async (teamData: Team): Promise<string> => {
    try {
        const dataToSave = {
            ...teamData,
            id: teamData.id || Date.now(),
            createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(teamsCollectionRef, dataToSave);
        return docRef.id;
    } catch (error) {
        console.error('Erro ao adicionar equipa:', error);
        throw new Error('Não foi possível adicionar a equipa.');
    }
};

/**
 * Busca todas as equipas do Firestore.
 */
const getAllTeams = async (): Promise<TeamDocument[]> => {
    try {
        const querySnapshot = await getDocs(teamsCollectionRef);
        return querySnapshot.docs.map((doc) => ({
            docId: doc.id,
            ...(doc.data() as Omit<TeamDocument, 'docId'>),
        }));
    } catch (error) {
        console.error('Erro ao buscar equipas:', error);
        throw new Error('Não foi possível buscar as equipas.');
    }
};

/**
 * Deleta uma equipa do Firestore e as suas imagens associadas.
 */
const deleteTeam = async (docId: string): Promise<void> => {
    try {
        const docRef = doc(db, 'teams', docId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) throw new Error('Equipa não encontrada.');

        const teamData = docSnap.data() as Team;

        if (teamData.logo) {
            try {
                await deleteObject(ref(storage, teamData.logo));
            } catch (err) { console.warn('Erro ao deletar o logo:', err); }
        }

        if (teamData.players) {
            for (const player of teamData.players) {
                if (player.photo) {
                    try {
                        await deleteObject(ref(storage, player.photo));
                    } catch (err) { console.warn(`Erro ao deletar foto do jogador ${player.name}:`, err); }
                }
            }
        }
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Erro ao deletar equipa:', error);
        throw new Error('Não foi possível deletar a equipa.');
    }
};

const getTeamsByIds = async (ids: number[]): Promise<TeamDocument[]> => {
    if (!ids || ids.length === 0) {
        return [];
    }

    try {
        const q = query(teamsCollectionRef, where('id', 'in', ids));

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            docId: doc.id,
            ...(doc.data() as Omit<TeamDocument, 'docId'>),
        }));
    } catch (error) {
        console.error('Erro ao buscar equipas por IDs:', error);
        throw new Error('Não foi possível buscar as equipas.');
    }
};


export const teamService = {
    addTeam,
    getAllTeams,
    deleteTeam,
    getTeamsByIds
};