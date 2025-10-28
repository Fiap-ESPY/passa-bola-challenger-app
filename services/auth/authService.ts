import { auth, db } from '@/config/firebaseConfig';
import { UserRole } from '@/model/enum/userRole';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';


/**
 * Interface para os dados do perfil do utilizador que são guardados no Firestore.
 */
export interface UserProfile {
    uid: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt: Date;
}

/**
 * Interface para os dados da sessão do utilizador, que serão guardados no storage local.
 * Combina dados do Auth e do Firestore.
 */
export interface UserSessionData {
    uid: string;
    email: string;
    name: string;
    role: UserRole;
    organizationId?: string;
}

/**
 * Parâmetros necessários para registar um novo utilizador.
 */
interface RegisterParams {
    email: string;
    pass: string;
    name: string;
    role: UserRole;
}

/**
 * Regista um novo utilizador no Firebase Auth e guarda o seu perfil no Firestore.
 * @param {RegisterParams} params - Os dados necessários para o registo.
 * @returns {Promise<UserSessionData>} Os dados da sessão do utilizador recém-criado.
 */
const register = async ({ email, pass, name, role }: RegisterParams): Promise<UserSessionData> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;

        const userProfile: UserProfile = {
            uid: user.uid,
            email: user.email || email,
            name,
            role,
            createdAt: new Date(),
        };

        await setDoc(doc(db, 'users', user.uid), userProfile);

        return {
            uid: user.uid,
            email: user.email || email,
            name,
            role,
        };
    } catch (error) {
        console.error('Erro ao registar utilizador:', error);
        throw error;
    }
};

/**
 * Autentica um utilizador com e-mail e palavra-passe.
 * @param {string} email - O e-mail do utilizador.
 * @param {string} pass - A palavra-passe do utilizador.
 * @returns {Promise<UserSessionData>} Os dados da sessão do utilizador autenticado.
 */
const login = async (email: string, pass: string): Promise<UserSessionData> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;

        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
            throw new Error('Perfil de utilizador não encontrado no Firestore.');
        }

        const userProfile = docSnap.data() as UserProfile;

        return {
            uid: user.uid,
            email: user.email || email,
            name: userProfile.name,
            role: userProfile.role,
        };
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
};

/**
 * Termina a sessão do utilizador atual.
 */
const logout = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        throw error;
    }
};

/**
 * Observador em tempo real para o estado de autenticação.
 * Ideal para ser usado no componente raiz da sua aplicação para gerir a sessão global.
 * @param {(session: UserSessionData | null) => void} callback - Função que será chamada sempre que o estado de autenticação mudar.
 * @returns {() => void} Uma função para cancelar a subscrição do observador.
 */
const onAuthChange = (callback: (session: UserSessionData | null) => void): (() => void) => {
    return onAuthStateChanged(auth, async (user: User | null) => {
        if (!user) {
            callback(null);
            return;
        }

        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const userProfile = docSnap.data() as UserProfile;
            callback({
                uid: user.uid,
                email: user.email || '',
                name: userProfile.name,
                role: userProfile.role,
            });
        } else {
            console.error('Utilizador autenticado mas sem perfil correspondente.');
            callback(null);
        }
    });
};

export const authService = {
    register,
    login,
    logout,
    onAuthChange,
};

