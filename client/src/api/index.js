import { appier } from 'utils';

const api = {
    create: (type, data) => appier.post(`${type}/new`, data),
    getAll: type => appier.get(type),
};

export default api;