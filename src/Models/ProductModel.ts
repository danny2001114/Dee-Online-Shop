export interface ProductModel {
    id: string
    name: string
    price: number
    imageUrl: string
    remark: string
}

export interface ProductForm {
    name: string
    price: number
    imageUrl: string
    prevImgUrl?: string
    uploadFile?: File | null
    remark: string
    created_at?: string
    updated_at?: string
}
