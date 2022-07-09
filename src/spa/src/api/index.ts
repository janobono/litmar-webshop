type Params = Record<string, any>;

export interface PaginatedResponse<T> {
    content: T[];
}

export const queries = {
    authorities: (params: Params = {}) => ['/authorities', params],
    captcha: (params: Params = {}) => ['/captcha', params],
};
