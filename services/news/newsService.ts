import { db } from '@/config/firebaseConfig';
import { News } from '@/model/news';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore';

/**
 * Interface para os dados que são enviados para criar uma nova notícia.
 * O 'id' é opcional, pois pode ser gerado automaticamente.
 */
export type NewsInput = Omit<News, 'id'> & { id?: number };

/**
 * Interface completa da notícia retornada pelo service.
 * Inclui o ID do documento do Firestore ('docId') para operações futuras
 * e um timestamp para ordenação confiável.
 */
export interface NewsDocument extends News {
    docId: string;
    createdAt: Timestamp;
}


const newsCollectionRef = collection(db, 'news');

/**
 * Adiciona uma nova notícia ao Firestore.
 * @param {NewsInput} newsData - Os dados da notícia a serem adicionados.
 * @returns {Promise<string>} O ID do documento Firestore recém-criado.
 */
const addNews = async (newsData: NewsInput): Promise<string> => {
    try {
        const dataToSave = {
            ...newsData,
            id: newsData.id || Date.now(),
            createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(newsCollectionRef, dataToSave);
        console.log('Notícia adicionada com ID de documento:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Erro ao adicionar notícia:', error);
        throw new Error('Não foi possível adicionar a notícia.');
    }
};

/**
 * Busca todas as notícias do Firestore, ordenadas pela data de criação.
 * @returns {Promise<NewsDocument[]>} Uma lista de objetos de notícias.
 */
const getAllNews = async (): Promise<NewsDocument[]> => {
    try {
        const q = query(newsCollectionRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const newsList = querySnapshot.docs.map((doc) => ({
            docId: doc.id,
            ...(doc.data() as Omit<NewsDocument, 'docId'>),
        }));

        return newsList;
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
        throw new Error('Não foi possível buscar as notícias.');
    }
};

/**
 * Busca uma única notícia pelo seu ID de documento do Firestore.
 * @param {string} docId - O ID do documento da notícia.
 * @returns {Promise<NewsDocument|null>} O objeto da notícia ou null se não for encontrado.
 */
const getNewsByDocId = async (docId: string): Promise<NewsDocument | null> => {
    try {
        const docRef = doc(db, 'news', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { docId: docSnap.id, ...(docSnap.data() as Omit<NewsDocument, 'docId'>) };
        } else {
            console.log('Nenhuma notícia encontrada com este ID de documento!');
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar notícia por ID:', error);
        throw new Error('Não foi possível buscar a notícia.');
    }
};

/**
 * Atualiza uma notícia existente no Firestore.
 * @param {string} docId - O ID do documento da notícia a ser atualizada.
 * @param {Partial<NewsInput>} updatedData - Um objeto com os campos a serem atualizados.
 */
const updateNews = async (docId: string, updatedData: Partial<NewsInput>): Promise<void> => {
    try {
        const docRef = doc(db, 'news', docId);
        await updateDoc(docRef, updatedData);
        console.log('Notícia atualizada com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar notícia:', error);
        throw new Error('Não foi possível atualizar a notícia.');
    }
};

/**
 * Deleta uma notícia do Firestore.
 * @param {string} docId - O ID do documento da notícia a ser deletada.
 */
const deleteNews = async (docId: string): Promise<void> => {
    try {
        const docRef = doc(db, 'news', docId);
        await deleteDoc(docRef);
        console.log('Notícia deletada com sucesso!');
    } catch (error) {
        console.error('Erro ao deletar notícia:', error);
        throw new Error('Não foi possível deletar a notícia.');
    }
};

export const newsService = {
    addNews,
    getAllNews,
    getNewsByDocId,
    updateNews,
    deleteNews,
};

