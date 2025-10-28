import { storage } from '@/config/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


/**
 * Faz o upload de um ficheiro para o Firebase Storage e retorna o seu URL de download público.
 * @param uri O URI local do ficheiro (do ImagePicker, etc.).
 * @param path A pasta de destino no Firebase Storage (ex: 'news-covers').
 * @returns O URL público de download do ficheiro enviado.
 */
const uploadFileAndGetURL = async (uri: string, path: string): Promise<string> => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();

        const fileName = `${path}/${Date.now()}-${Math.random().toString(36).substring(2)}`;
        const storageRef = ref(storage, fileName);

        const snapshot = await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;

    } catch (error) {
        console.error("Erro ao fazer upload do ficheiro:", error);
        throw new Error("O upload do ficheiro falhou.");
    }
};

export const storageService = {
    uploadFileAndGetURL,
};