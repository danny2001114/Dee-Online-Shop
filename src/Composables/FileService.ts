import { supabase } from "@/App/supabase";

export default class FileService {
    static async getUrl(path: string) {
        const { data } = await this.#getStorage()
            .getPublicUrl(path);

        return data;
    }

    static async uploadFile(fileName: string, file?: File | null) {
        if (!file) throw Error("Required Upload File To Update File!");

        const { error } = await this.#getStorage()
            .upload(fileName, file, { upsert: true });

        if (error) {
            throw error;
        }

        return this.getUrl(fileName);
    }

    static async deleteFile(fileName: string) {
        const { error } = await this.#getStorage()
            .remove([fileName]);

        if (error && error.status !== 404) {
            throw error;
        }
    }

    static async replaceFile(fileName: string, file?: File | null) {
        if (!file) throw Error("Required Upload File To Update File!");

        await this.deleteFile(fileName).catch(() => { });
        return this.uploadFile(fileName, file);
    }

    static determineState(imageUrl: string, prevImgUrl: string, uploadFile?: File | null) {
        if (uploadFile) {
            return prevImgUrl ? "change" : "add";
        }

        if (prevImgUrl && !imageUrl) {
            return "remove";
        }

        return "unchanged";
    }

    static #getStorage() {
        return supabase.storage.from(import.meta.env.VITE_SUPABASE_BUCKET);
    }
}
