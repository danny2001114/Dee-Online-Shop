import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    updateProfile,
    type User
} from "firebase/auth"
import { auth } from "@/App/firebase"
import useUser from "./useUser";
import type { AuthLogin, AuthCreateForm, AuthUpdateForm } from "@/Models/UserModel";
import dayjs from "dayjs";
import { useExcepetion } from "@/Utilities/helpers";

export default {
    async login(credential: AuthLogin) {
        return await signInWithEmailAndPassword(
            auth,
            credential.email,
            credential.password
        );
    },

    async logout() {
        return await signOut(auth);
    },

    async createAuth(form: AuthCreateForm) {
        await createUserWithEmailAndPassword(auth, form.email, form.password)
            .then(async (credential) => {
                const user = credential.user;
                await this.updateProfile(user, form);
                await useUser.create(user.uid, {
                    username: form.username,
                    email: form.email,
                    avatar: form.avatar,
                    created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
                });
            });
    },

    async updateAuth(form: AuthUpdateForm) {

        const currentUser = auth.currentUser;

        if (currentUser) {
            await updateEmail(currentUser, form.email);

            if (form.password) {
                await updatePassword(currentUser, form.password);
            }

            await this.updateProfile(currentUser, form);
            await useUser.update(currentUser.uid, {
                username: form.username,
                email: form.email,
                avatar: form.avatar,
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
            });
        } else {
            useExcepetion("Unauthenticated!", 401);
        }
    },

    async updateProfile(user: User, form: AuthCreateForm | AuthUpdateForm) {
        await updateProfile(user, {
            displayName: form.username,
            photoURL: form.avatar
        });
    },
}
