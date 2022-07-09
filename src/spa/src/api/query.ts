import { QueryFunction } from 'react-query';
import { client } from './client';

export const defaultQueryFn: QueryFunction = async (context) => {
    if (context.queryKey.length === 1 && typeof context.queryKey[0] === 'string') {
        return client.get(context.queryKey[0]).then(res => res.data);
    } else if (
        context.queryKey.length === 2
        && typeof context.queryKey[0] === 'string'
        && typeof context.queryKey[1] === 'string'
    ) {
        const [path, queryParams] = context.queryKey;
        return client.get(path, {params: queryParams}).then(res => res.data);
    }
    throw Error(`Invalid query key: ${context.queryKey}`);
};
