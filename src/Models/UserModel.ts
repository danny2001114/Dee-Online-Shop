export interface AuthLogin {
    email: string
    password: string
}

export interface AuthCreateForm {
    username: string
    email: string
    password: string
    avatar: string
}

export interface AuthUpdateForm {
    username: string
    email: string
    password?: string
    avatar: string
}

export interface UserModel {
    id: string
    username: string
    email: string
    avatar: string
}

export interface UserForm {
    username: string
    email: string
    avatar: string
    created_at?: string
    updated_at?: string
}
