## Next.js App Router Course - Starter

### 1.项目目录结构

- app
  - /app/lib 获取数据函数
  - /app/ui UI 组件
- public 静态资源
- scripts 脚本文件
- next.config.js 配置文件

### 2.css 样式

- 使用全局样式文件
- tailwind、CSS modules
- clsx（用于动态拼接 css 类名的 JS 库） 条件判断 添加类样式

### 3.字体、图片优化

- 为什么需要优化字体？
  - 美化页面
  - CLS（Cumulative Layout Shift）性能
  - next/font 模块（Next.js 自动优化字体）
    > 字体文件会和其他资源一起打包部署，不会发送网络请求
- 为什么需要优化图片？
  - 大图传给小屏幕，带宽浪费
  - 图片从无到有加载过程
  - 多张图片同时请求，造成拥堵
    > Image 组件自带懒加载、加载尺寸合适图、防止布局偏移
    > public 目录会自动映射到网站服务器 / 根目录

### 4.路由和布局

- 目录 app 下每个文件夹下的 page.tsx 都是一个页面
- page.tsx 是一个特殊的 Next.js 文件，用于导出 React 组件，并且需要它才能访问路由
- 文件夹用于创建嵌套路由，每个文件夹表示映射到 URL 段的路由段
- 目录下 layout.tsx 默认当作布局模板文件
- 浏览器无法访问 /app/lib、/app/ui 目录下的文件

### 5.页面间导航

- Link 组件代替<a>
  - 页面顶部 `use client` 告诉 next 这个页面是客户端
  - 不会整页刷新
  - 代码自动分割
  - 代码预取
    > layout <- SideNav <- NavLink <- a 链接
  - useRouter 获取路由钩子 back、push、replace
  - usePathname()获取当前路由地址
  - useSearchParams() 获取当前路由参数 `/dashboard?search=my-project` => `useSearchParams().get('search')`
    `has()、getAll()、keys()、values()、entries()、forEach()、toString()`
  - useParams() 获取路由动态参数
    `/shop/[tag]/[item]`=> `useparams=> { tag: 'xxx', item: 'xxx' }`

### 6.配置数据库

### 7.获取数据 Fetcing Data
