import { defineStore } from "pinia";

export const darkmodeState = defineStore("darkmode", {
    state() {
        return {
            isDarkMode: false
        }
    },

    actions: {
        toggle() {
            this.isDarkMode = !this.isDarkMode;
        }
    }
});
