import { AxiosError } from 'axios';

export enum AppErrorCode {
    UNKNOWN = 'UNKNOWN',
    INVALID_CAPTCHA = 'INVALID_CAPTCHA',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    USER_IS_DISABLED = 'USER_IS_DISABLED',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_USERNAME_IS_USED = 'USER_USERNAME_IS_USED',
    USER_EMAIL_IS_USED = 'USER_EMAIL_IS_USED',
    GDPR = 'GDPR'
}

export interface AppError {
    status: number,
    statusText: string
    code: AppErrorCode,
    message: string
}

export const cls = (input: string) =>
    input
        .replace(/\s+/gm, ' ')
        .split(' ')
        .filter((cond) => typeof cond === 'string')
        .join(' ')
        .trim();

const errorToAppError = async (error: any): Promise<AppError> => {
    const result = {
        status: 500,
        statusText: 'Interná chyba servera',
        code: AppErrorCode.UNKNOWN,
        message: error.message
    };
    if (error.isAxiosError) {
        const axiosError: AxiosError = error;
        if (axiosError.response) {
            result.status = axiosError.response.status;
            result.statusText = axiosError.response.statusText;
            const data = axiosError.response.data as any;
            try {
                if (data && 'code' in data && 'message' in data) {
                    const {code, message} = data;
                    if (message) {
                        result.message = message;
                    }
                    const appCode = AppErrorCode[code as keyof typeof AppErrorCode]
                    if (appCode) {
                        result.code = appCode;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return result;
}

export default errorToAppError;
