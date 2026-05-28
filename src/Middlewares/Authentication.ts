import { getCurrentUser } from 'vuefire'
import { useException } from '@/Utilities/helpers';

export default async () => 
{
        await getCurrentUser()
        .then((user) => {
            if (!user) useException("Unauthenticated!", 401);
        })
        .catch(err => {
            useException(err, 401);
        });
}
