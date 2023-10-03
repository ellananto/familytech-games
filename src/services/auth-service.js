import axios from 'axios';
import { getCookie } from '@/lib/utils';
import { isDev } from '@/lib/utils';

export default class AuthService {
  static doLogin = async () => {
    let authUrl = 'https://auth.byufamilytech.org';
    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        // 'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
        // 'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        // 'Cache-Control': 'no-cache',
        // 'Content-Type': 'application/x-www-form-urlencoded'

      }
    }
    let redirectUri = isDev
      ? 'http://localhost:3000/login'
      : `${process.env.DOMAIN}/login`;
    axios
      .get(`${authUrl}/?redirect=${redirectUri}/&site=ag`, options)
      .then((res) => {
        window.location = res.request.responseURL;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static doLogout = async () => {
    const authUrl = 'https://auth.byufamilytech.org';
    const isDev = process.env.NODE_ENV === 'development';
    let redirectUri = isDev ? 'http://localhost:3000/' : process.env.DOMAIN;
    let ssoToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)FS_SSO_JWT_TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    window.location = `${authUrl}/logout?redirect=${redirectUri}&fstoken=${ssoToken}`;
    if (isDev) {
      document.cookie =
        'FS_SSO_JWT_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    }
    localStorage.clear();
  };

  static hasCookie = () => {
    let cookieValue = getCookie('FS_SSO_JWT_TOKEN');
    return document.cookie.includes('FS_SSO_JWT_TOKEN') && cookieValue;
  };

  static getFSCookieValue = () => {
    return getCookie('FS_SSO_JWT_TOKEN');
  };
}
