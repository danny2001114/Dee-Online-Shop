import dayjs from "dayjs"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    updateProfile,
    type AuthError,
    type User
} from "firebase/auth"
import { auth, db } from "@/App/firebase"
import { useException } from "@/Utilities/helpers"
import { ElMessage } from "element-plus"
import { 
    collection, 
    doc, 
    getCountFromServer, 
    setDoc, 
    updateDoc 
} from "firebase/firestore"
import { useCollection, useDocument } from "vuefire"
import type { 
    AuthLogin, 
    AuthForm, 
    UserForm, 
    UserModel
} from "@/Models/UserModel"

export default class UserService {
    static #collection = 'users';

    static async login(credential: AuthLogin) {
        await signInWithEmailAndPassword(
            auth,
            credential.email,
            credential.password
        )
        .catch(err => {
            console.error(err);
            const error = err as AuthError;

            if (error.code == "not-found") ElMessage.error("User Not Found!");
        });
    }

    static async logout() {
        await signOut(auth)
        .catch(err => {
            console.error(err);

            ElMessage.error("Failed To Sign Out!");
        });
    }

    static getList() {
        return useCollection<UserModel>(this.#getCollection());
    }

    static getDetail(id: string) {
        return useDocument<UserModel>(this.#getDoc(id));
    }

    static async CountUsers() {
        return await getCountFromServer(this.#getCollection())
        .then((res) => {
            return res.data().count;
        });
    }

    static async createAuth(form: AuthForm) {
        try {
            const user = await createUserWithEmailAndPassword(auth, form.email, form.password)
                .then(async (credential) => {
                    const user = credential.user;

                    ElMessage.success(`Signed Up User Completed! Now You Are Signing In As ${user.displayName}`);
                    return user;
                })
                .catch(() => {
                    ElMessage.error("Failed To Sign Up User!");
                });

            if (!user) return;

            await this.#updateProfile(user, form);
            await setDoc(this.#getDoc(user.uid), {
                username: form.username,
                email: form.email,
                avatar: form.avatar,
                created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
            } as UserForm);
        } catch (err) {
            console.error(err);
        }
    }

    static async updateAuth(form: AuthForm) {

        const currentUser = auth.currentUser;

        if (!currentUser) {
            useException("Unauthenticated!", 401);
            return;
        }

        try {
            await updateEmail(currentUser, form.email);

            if (form.password) await updatePassword(currentUser, form.password);

            ElMessage.success("Updated Profile Successfully!");
        } catch (err) {
            console.error(err);
            ElMessage.error("Failed To Update Profile!");
        }

        try {
            await this.#updateProfile(currentUser, form);
            await updateDoc(this.#getDoc(currentUser.uid), {
                username: form.username,
                email: form.email,
                avatar: form.avatar,
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
            });
        } catch (err) {
            console.error(err);
        }
    }

    static async #updateProfile(user: User, form: AuthForm) {
        await updateProfile(user, {
            displayName: form.username,
            photoURL: form.avatar
        });
    }

    static #getCollection() {
        return collection(db, this.#collection);
    }

    static #getDoc(id: string) {
        return doc(db, this.#collection, id);
    }
}
