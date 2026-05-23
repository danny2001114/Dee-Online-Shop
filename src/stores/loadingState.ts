import { defineStore } from "pinia";
type loading = {
    isLoading: boolean
}

export const useLoading = defineStore("loading", {
    state(): loading {
        return {
            isLoading: false
        }
    },

    actions: {
        start(): void {
            this.isLoading = true
        },
        stop(): void {
            this.isLoading = false
        }
    }
})
