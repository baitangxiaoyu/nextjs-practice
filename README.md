## Next.js App Router Course - Starter

### 1.项目目录结构

- **app**
  - **/app/lib** 获取数据函数(操作数据库)
  - **/app/ui** 页面 UI 组件
- **public** 静态资源（字体、图片、视频等）
- **scripts** 脚本文件
- **Next.config.js** 配置文件

### 2.css 样式

- 使用全局样式文件
- **tailwind、CSS modules**
- **clsx**（用于动态拼接 css 类名的 JS 库） 条件判断 添加类样式

### 3.字体、图片优化

- 为什么需要优化字体？
  - 美化页面
  - **CLS**（Cumulative Layout Shift）性能
  - **Next/font** 模块（Next.js 自动优化字体）
    > 字体文件会和其他资源一起打包部署，不会发送网络请求
- 为什么需要优化图片？
  - 大图传给小屏幕，带宽浪费
  - 图片从无到有加载过程
  - 多张图片同时请求，造成拥堵
    > Image 组件自带懒加载、加载尺寸合适图、防止布局偏移
    > public 目录会自动映射到网站服务器 / 根目录

### 4.路由和布局

- 目录 app 下每个文件夹下的 **page.tsx** 都是一个页面
- **page.tsx** 是一个特殊的 Next.js 文件，用于导出 React 组件，并且需要它才能访问路由
- 文件夹用于创建嵌套路由，每个文件夹表示映射到 URL 段的路由段
- 目录下 **layout.tsx** 默认当作布局模板文件
- 浏览器无法访问 **/app/lib、/app/ui** 目录下的文件

### 5.页面间导航

- **Link** 组件代替 **a** 标签
- 页面顶部 **'use client'** 告诉 Next 这个页面是客户端
- 不会整页刷新
- 代码自动分割
- 代码预取
  `layout <- SideNav <- NavLink <- a 链接`
- useRouter 获取路由钩子 back、push、replace
- usePathname()获取当前路由地址
- useSearchParams() 获取当前路由参数
  `/dashboard?search=my-project => useSearchParams().get('search')`
  `has()、getAll()、keys()、values()、entries()、forEach()、toString()`
- useParams() 获取路由动态参数
  `/shop/[tag]/[item] => useparams=> { tag: 'xxx', item: 'xxx' }`

### 6.配置数据库

- **vercel** 创建数据库
- **vercel** 通过 **github** 账号登陆，拉取对应代码仓库运行部署
- **vercel** 上 **postgres** 数据库创建、填充、查询
- 使用 **@vercel/postgres** 设置 **PostgreSQL** 数据库

### 7.获取数据 Fetcing Data

- **Next.js 即是客户端又是服务端，页面调用函数直接请求数据库**
  > 路由路径 => 页面组件 => 页面内调用函数请求数据库 => 数据库返回数据 => 合成具体页面
- **API、SQL、ORM**
- **Next.js 组件**
  - 默认就是 RSC（服务器组件）
  - RSC 中 数据 + 模版 => 具体页面
  - 获取数据不需要 API 映射
  - RSC 只能在服务器执行，也不会暴露敏感信息

### 8.静态渲染、动态渲染

- **静态渲染**（NextJS 默认静态渲染）
  - 服务端在构建部署、数据重新生效时获取数据和渲染页面 -更快的网站- 预渲染的内容可以缓存并在全球范围内分发。这确保世界各地的用户可以更快、更可靠地访问您的网站内容。 - 减少服务器负载- 由于内容已被缓存，您的服务器不必为每个用户请求动态生成内容。
  - SEO - 预渲染的内容更容易被搜索引擎抓取工具索引，因为页面加载时内容已经可用。这可以提高搜索引擎排名。
- **动态渲染**（unstable_noStore 方法开启动态渲染）
  - 服务端在每个用户请求时获取数据和渲染页面
  - 实时数据- 动态渲染可让您的应用程序显示实时或频繁更新的数据。这对于数据经常变化的应用程序来说是理想的选择。
  - 用户特定内容- 更容易提供个性化内容，例如仪表板或用户配置文件，并根据用户交互更新数据。
  - 请求时间信息- 动态渲染允许您访问只能在请求时知道的信息，例如 cookie 或 URL 搜索参数。
- **耗时的数据获取阻塞页面渲染**

### 9.Streaming 流式渲染 | 异步渲染

- **流式渲染**
  - 流式传输是一种数据传输技术，允许您将路由分解为更小的“块”，并在它们准备就绪时逐步将它们从服务器流式传输到客户端
  - 两种方法可以在 **Next.js** 中实现流式传输
    - 在页面级别，使用文件 **loading.tsx**
    - 对于特定组件，使用 **Suspense** 组件
  - 每个目录下 **loading.tsx** 会对当前目录下所有页面生效，页面加载慢使用时 NextJs 自动用 **loading.tsx** 填充
  - 创建新文件夹时()，名称不会包含在 URL 路径中,此/dashboard/(xxx)/page.tsx 变成/dashboard
  - 目录下新建 **(xxx)** 文件夹，将 **page.tsx** 和 **loading.tsx** 文件移动到 **(xxx)** 文件夹下，路由访问不受影响 **loading** 只对当前 **xxx** 文件夹下的页面生效
- **异步渲染**
  - 子组件内部请求数据，使用 **Suspense** 包裹子组件

### 10.Partial Prerendering(部分预渲染 PPR)

- 将数据获取移至需要它的组件，从而隔离路线的哪些部分应该是动态的
- PPR 有潜力成为 Web 应用程序的默认渲染模型，将静态站点和动态渲染的优点结合在一起。但是，它仍处于实验阶段。我们希望将来能够稳定它，并使其成为使用 Next.js 构建的默认方式
- 实现部分预渲染

```
const nextConfig =
    {
      experimental: {
        ppr: 'incremental',
      },
};

将experimental_ppr段配置选项添加到静态页面中
export const experimental_ppr = true;
```

> 部分预渲染是 Next.js 14 中引入的一项实验性功能
