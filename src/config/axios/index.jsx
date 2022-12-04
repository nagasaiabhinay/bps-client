import apiBundle from '@axios/apibundle';
import { useGlobalStore } from '@store/index';

const Axios = {
    init() {
        const token = useGlobalStore.getState().token;
        return apiBundle.init({
            baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
            accessToken: `Bearer ${token}`,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            timeout: 7000,
        });
    },
};

export default Axios;
