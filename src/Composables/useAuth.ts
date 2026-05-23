import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "@/App/firebase"
import { ElMessage } from "element-plus";
import type { Router } from "vue-router";
import type {  LoginForm } from "@/Models/AuthModel";

export default {
    async login(credential: LoginForm, router: Router) {
        await signInWithEmailAndPassword(
            auth, 
            credential.email, 
            credential.password
        )
        .then(() => {
            router.push({name: "dashboard"});
        })
        .catch(() => {
            ElMessage.error("User Not Found!");
        });
    },

    async logout(router: Router) {
        await signOut(auth)
        .then(() => {
            router.push({name: "login"});
        })
        .catch(() => {
            ElMessage.error("Failed To Logout!");
        });
    }
}
