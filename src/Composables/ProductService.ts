import { db } from "@/App/firebase";
import { 
    addDoc, 
    collection, 
    deleteDoc, 
    doc, 
    updateDoc 
} from "firebase/firestore";
import { useCollection, useDocument } from "vuefire";
import FileService from "./FileService";
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
            const id = await addDoc(this.#getCollection(), {
                name: form.name,
                price: form.price,
                remark: form.remark,
                created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
            } as ProductForm)
                .then(async (res) => {
                    ElMessage.success("Create Product Successfully!");

                    return res.id;
                })
                .catch(() => {
                    ElMessage.error("Failed To Create Product!");
                });

            if (!form.uploadFile || !id) return;
            const url = await FileService.uploadFile(form.uploadFile, this.#collection + "/" + id);

            await updateDoc(this.#getDoc(id), { imageUrl: url });

        } catch (err) {
            console.error(err);
        }
    }

    static async updateProduct(id: string, form: ProductForm, prevImgUrl?: string) {
        if (!prevImgUrl) return;

        try {
            await updateDoc(this.#getDoc(id), {
                name: form.name,
                price: form.price,
                imageUrl: form.imageUrl,
                remark: form.remark,
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
            })
                .then(async () => {
                    ElMessage.success("Updated Product Successfully!");
                })
                .catch(() => {
                    ElMessage.error("Failed To Update Product!");
                });
    
            if (!form.imageUrl) {
                await FileService.deleteFile(prevImgUrl);
            }
    
            if (form.uploadFile) {
                await FileService.uploadFile(form.uploadFile, this.#collection + "/" + id);
            }
        } catch (err) {
            console.error(err);
        }
    }

    static async deleteProduct(id: string) {
        
        try {
            await deleteDoc(this.#getDoc(id))
                .then(async () => {
                    ElMessage.success("Deleted Product Successfully!");
                })
                .catch(() => {
                    ElMessage.error("Failed to Delete Product!");
                });

                await FileService.deleteFile(this.#collection + "/" + id);
        } catch (err) {
            console.error(err);
        }
    }

    static #getDoc(id: string) {
        return doc(db, this.#collection, id);
    }

    static #getCollection() {
        return collection(db, this.#collection);
    }
}
