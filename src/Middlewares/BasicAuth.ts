import { getCurrentUser } from 'vuefire'
import type { RouteLocationNormalizedGeneric } from 'vue-router';

export const useBasicAuth = async (to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric) => {
    const user = await getCurrentUser();

    if (to.meta.noAuth && user) {
        const prevRoute: string = from.name as string ?? "dashboard";

        return { name: prevRoute }
    }

    if (!to.meta.noAuth && !user) {
        return { name: "login" }
    }
}
