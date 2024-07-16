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
    > **Image** 组件自带懒加载、加载尺寸合适图、防止布局偏移
    > **public** 目录会自动映射到网站服务器 **/** 根目录

### 4.路由和布局

- 目录 app 下每个文件夹下的 **page.tsx** 都是一个页面
- **page.tsx** 是一个特殊的 Next.js 文件，用于导出 React 组件，并且需要它才能访问路由
- 文件夹用于创建嵌套路由，每个文件夹表示映射到 URL 段的路由段
- 目录下 **layout.tsx** 默认当作布局模板文件
- 浏览器无法访问 **/app/lib、/app/ui** 目录下的文件

### 5.页面间导航

- **Link** 组件代替 **a** 标签
- 页面顶部 **`use client`** 告诉 Next 这个页面是客户端
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
  - 服务端在构建部署、数据重新生效时获取数据和渲染页面
  - 更快的访问网页体验（静态+缓存）
  - 减轻服务器的负担（多次访问只用生成一次页面）
  - 利于 SEO（搜索引擎优化）
- **动态渲染**（unstable_noStore 方法开启动态渲染）
  - 服务端在每个用户请求时获取数据和渲染页面
  - 显示最新数据
  - 特定用户显示特定数据
- **耗时的数据获取阻塞页面渲染**

### 9.Streaming 流式渲染 | 异步渲染

- **流式渲染**
- **异步渲染**
