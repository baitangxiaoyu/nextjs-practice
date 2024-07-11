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
