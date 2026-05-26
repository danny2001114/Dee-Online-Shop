import { getCurrentUser, useCurrentUser, useIsCurrentUserLoaded } from 'vuefire'
import { useExcepetion } from '@/Utilities/helpers';

export default async () => {
        await getCurrentUser()
        .then((user) => {
            if (!user) useExcepetion("Unauthenticated!", 401);
        })
        .catch(err => {
            useExcepetion(err, 401);
        });
}
