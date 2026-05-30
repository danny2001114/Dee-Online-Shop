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

    static async uploadFile(fileName: string, file?: File | null) {
        if (!file) throw Error("Required Upload File To Update File!");

        const fileRef = this.#getStorageRef(fileName);
        await uploadBytes(fileRef, file);

        return await getDownloadURL(fileRef);
    }

    static async deleteFile(fileName: string) {
        const fileRef = this.#getStorageRef(fileName);

        if (!this.getUrl(fileName)) {
            console.warn("There Is No File Uploaded For That URL!");
            return;
        }

        await deleteObject(fileRef);
    }

    static async replaceFile(fileName: string, file?: File | null) {
        if (!file) throw Error("Required Upload File To Update File!");

        await this.deleteFile(fileName);
        await this.uploadFile(fileName, file);
    }

    static determineState(imageUrl: string, prevImgUrl: string, uploadFile?: File | null ) {
        if (uploadFile) {
            return prevImgUrl ? "change" : "add";
        }

        if (prevImgUrl && !imageUrl) {
            return "remove";
        }

        return "unchanged";
    }

    static #getStorageRef(path: string): StorageReference {
        return storageRef(storage, path);
    }
}
