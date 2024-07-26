import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
// auth 会调用 authConfig 中的 authorized
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher 数组中匹配成功的路径就会使用 auth 检验授权
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};