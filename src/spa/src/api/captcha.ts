import { useQuery } from 'react-query';
import { client } from './client';

interface Captcha {
    captchaToken: string,
    captchaImage: string
}

const paths = {
    captcha: '/captcha',
};

async function getCaptcha() {
    const res = await client.get<Captcha>(paths.captcha);
    return res.data;
}

export function useCaptchaQuery() {
    return useQuery(paths.captcha, getCaptcha, {retry: false});
}
