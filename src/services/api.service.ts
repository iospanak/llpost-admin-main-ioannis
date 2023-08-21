import axios from 'axios';
import getConfig from 'next/config';
import {of} from 'rxjs';

import {authenticationService} from './authentication.service';

const goToLogin = async () => {
    authenticationService.removeToken();
    window.location.href = `${getConfig().publicRuntimeConfig.basePath}/login`;
    await new Promise((resolve) => setTimeout(resolve, 1000));
};
// @ts-ignore
export const filterGetParams = (p: any, prefix = '') => Object.entries(p).filter((kv) => kv[1] && !kv[0].startsWith(prefix)).map((kv) => kv.map(encodeURIComponent).join('=')).join('&');
// @ts-ignore

export const encodeGetParams = (p: any, prefix = '') => prefix + Object.entries(p).filter((kv) => kv[1]).map((kv) => kv.map(encodeURIComponent).join('=')).join('&' + prefix);
export const decodeGetParams = (p: Object, prefix = '') => {
    const filtered = {};
    // @ts-ignore
    Object.keys(p).filter(key => key.startsWith(prefix)).reduce((_, key) => filtered[key.substring(prefix.length)] = p[key], {});
    return filtered;
};

// @ts-ignore
// @ts-ignore
export const apiService = {
    url: getConfig().publicRuntimeConfig.api,
    // eslint-disable-next-line consistent-return
    page: async (url: string, params: any) => {
        if (!authenticationService.token.value) {
            await goToLogin();
        } else {
            try {
                const response = await axios.get(
                    `${getConfig().publicRuntimeConfig.api + url}?${encodeGetParams(params)}`,
                    {headers: {Authorization: `Bearer ${authenticationService.token.value}`}}
                );
                return response.data;
            } catch (error) {
                if (error.response.status == 401) {
                    await goToLogin();
                } else {
                    console.error(error);
                }
            }
        }
    },
    get: async (url: string) => {
        if (!authenticationService.token.value) {
            await goToLogin();
        } else {
            try {
                const response = await axios.get(
                    getConfig().publicRuntimeConfig.api + url,
                    {headers: {Authorization: `Bearer ${authenticationService.token.value}`}}
                );

                return response.data;
            } catch (error) {
                if (error.response.status == 401) {
                    await goToLogin();
                } else {
                    console.error(error);
                }
            }
        }
    },
    download: async (url: string): Promise<any> => {
        if (!authenticationService.token.value) {
            await goToLogin();
        } else {
            try {
                const response = await axios.get(
                    getConfig().publicRuntimeConfig.api + url,
                    {
                        headers: {Authorization: `Bearer ${authenticationService.token.value}`}, responseType: 'blob'
                    }
                );

                const cd = response.headers['content-disposition'];
                const filename = cd.split(';')[1].split('=')[1].replace('"', '').replace('"', '');

                const downUrl = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = downUrl;
                link.setAttribute('download', filename); //or any other extension
                document.body.appendChild(link);
                link.click();

                return response;
            } catch (error) {
                if (error.response.status == 401) {
                    await goToLogin();
                } else {
                    console.error(error);
                }
                return of(null).toPromise();
            }
        }
    },
    post: async (url: string, data: any, headers = {}) => {
        if (!authenticationService.token.value) {
            await goToLogin();
        } else {
            try {
                const response = await axios.post(
                    getConfig().publicRuntimeConfig.api + url,
                    data,
                    {headers: {...{Authorization: `Bearer ${authenticationService.token.value}`}, ...headers}}
                );
                return response.data;
            } catch (error) {
                if (error.response.status == 401) {
                    await goToLogin();
                } else {
                    console.error(error);
                }
            }
        }
    },
    delete: async (url: string, headers = {}) => {
        if (!authenticationService.token.value) {
            await goToLogin();
        } else {
            try {
                const response = await axios.delete(
                    getConfig().publicRuntimeConfig.api + url,
                    {headers: {...{Authorization: `Bearer ${authenticationService.token.value}`}, ...headers}}
                );
                return response.data;
            } catch (error) {
                if (error.response.status == 401) {
                    await goToLogin();
                } else {
                    console.error(error);
                }
            }
        }
    }
};
