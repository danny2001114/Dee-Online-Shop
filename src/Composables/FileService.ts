import { storage } from "@/App/firebase";
import {
    uploadBytes,
    ref as storageRef,
    deleteObject,
    getDownloadURL,
    type StorageReference
} from "firebase/storage";
import { useStorageFileUrl } from "vuefire";

export default class FileService {
    static getUrl(path: string) {
        return useStorageFileUrl(this.#getStorageRef(path));
    }

    static async uploadFile(file: File, fileName: string) {
        const fileRef = this.#getStorageRef(fileName);
        await uploadBytes(fileRef, file);

        return await getDownloadURL(fileRef);
    }

    static async deleteFile(fileName: string) {
        const fileRef = this.#getStorageRef(fileName);
        return await deleteObject(fileRef);
    }

    static #getStorageRef(path: string): StorageReference {
        return storageRef(storage, path);
    }
}
