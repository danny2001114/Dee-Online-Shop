import FileService from "./FileService";
import { db } from "@/App/firebase";
import { 
    addDoc, 
    collection, 
    deleteDoc, 
    doc, 
    updateDoc 
} from "firebase/firestore";
import { useCollection, useDocument } from "vuefire";
import { dayjs, ElMessage } from "element-plus";
import type { ProductForm, ProductModel } from "@/Models/ProductModel";

export default class ProductService {
    static #collection = 'products';

    static getList() {
        return useCollection<ProductModel>(this.#getCollection());
    }

    static getDetail(id: string) {
        return useDocument<ProductModel>(this.#getDoc(id));
    }

    static async createProduct(form: ProductForm) {
        try {
            const id = (await addDoc(this.#getCollection(), {
                name: form.name,
                price: Number(form.price),
                remark: form.remark,
                created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
            } as ProductForm)).id;

            if (!form.uploadFile || !id) return;
            const url = await FileService.uploadFile(this.#collection + "/" + id, form.uploadFile);

            await updateDoc(this.#getDoc(id), { imageUrl: url });
            ElMessage.success("Create Product Successfully!");
        } catch (err) {
            console.error(err);
            ElMessage.error("Failed To Create Product!");
        }
    }

    static async updateProduct(id: string, form: ProductForm, prevImgUrl: string) {
        const storagePath = this.#collection + "/" + id;
        const uploadState = FileService.determineState(form.imageUrl, prevImgUrl, form.uploadFile);

        try {
            if (uploadState === "remove") {
                await FileService.deleteFile(storagePath).catch(() => {});
                form.imageUrl = "";
            }

            if (form.uploadFile) {
                form.imageUrl = await FileService.uploadFile(storagePath, form.uploadFile);
            }

            await updateDoc(this.#getDoc(id), {
                name: form.name,
                price: Number(form.price),
                imageUrl: form.imageUrl,
                remark: form.remark,
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
            });

            ElMessage.success("Updated Product Successfully!");
        } catch (err) {
            console.error(err);
            ElMessage.error("Failed To Update Product!");
        }
    }

    static async deleteProduct(id: string) {
        
        try {
            await deleteDoc(this.#getDoc(id))
            await FileService.deleteFile(this.#collection + "/" + id);

            ElMessage.success("Deleted Product Successfully!");
        } catch (err) {
            console.error(err);
            ElMessage.error("Failed to Delete Product!");
        }
    }

    static #getDoc(id: string) {
        return doc(db, this.#collection, id);
    }

    static #getCollection() {
        return collection(db, this.#collection);
    }
}
