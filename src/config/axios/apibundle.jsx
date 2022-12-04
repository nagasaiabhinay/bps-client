import base from '@axios/base';
import global from '@axios/routes/global';
import auth from './routes/auth';

const bundle = {
    init(opts) {
        const client = base.init(opts);
        return {
            global: global.init(client),
            auth: auth.init(client)
        };
    }
};

export default bundle;
