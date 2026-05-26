import UserService from "@/Services/UserService"
import type { UserForm } from "@/Models/UserModel";;

export default {
    list()  {
        return UserService.getList();
    },

    get(id: string) {
        return UserService.getDoc(id);
    },

    async create(id: string, form: UserForm) {
        await UserService.createUser(id, form);
    },

    async update(id: string, form: UserForm) {
        await UserService.updateUser(id, form);
    }
}
