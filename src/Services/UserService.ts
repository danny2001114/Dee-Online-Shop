import { collection, doc, setDoc, updateDoc } from "firebase/firestore"
import { useCollection, useDocument } from "vuefire";
import { db } from "@/App/firebase"
import type { UserForm, UserModel } from "@/Models/UserModel";

export default {
    collection: 'users',

    getCollection() {
        return collection(db, this.collection);
    },

    getDoc(id: string) {
        return doc(db, this.collection, id);
    },

    getList() {
        return useCollection<UserModel>(this.getCollection());
    },

    getDetail(id: string) {
        return useDocument<UserModel>(this.getDoc(id));
    },

    async createUser(id: string,form: UserForm) {
        await setDoc(this.getDoc(id), form);
    },

    async updateUser(id: string, form: UserForm) {
        await updateDoc(this.getDoc(id), form as {});
    }
}
