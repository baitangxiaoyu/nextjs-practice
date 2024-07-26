import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  //权限不通过时跳转的页面
  pages: {
    signIn: '/login',
  },
  //路由间跳转时检验权限的回调函数
  callbacks: {
    /**
     * 授权函数，用于处理用户的登录状态和路由重定向
     * @param {Object} param 参数对象
     * @param {Object} param.auth 认证信息对象，通常包含用户信息
     * @param {Object} param.request 请求对象，包含当前路由信息
     * 如果用户已登录且不在仪表板页面，则重定向到仪表板；如果用户已登录且在仪表板页面或未登录，则返回true；如果用户未登录且试图访问仪表板页面，则返回false
     */
    authorized({ auth, request: { nextUrl } }) {
      // 判断 auth 中是否存在user，存在则已登陆，否则未登录
      // request 是请求对象，nextUrl 是当前路由
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
       return isLoggedIn
      } else if (isLoggedIn) {
        // 已登录且不在仪表板，重定向到仪表板
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;