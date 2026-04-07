# official-website
数据知识产权公司 GitHub 官网仓库名

# 企业官网

基于 Next.js 15 + React 19 开发的现代化企业官网，具备完善的 SEO 优化和出色的性能表现。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **UI 库**: React 19 (React Compiler)
- **样式**: Tailwind CSS
- **类型检查**: TypeScript
- **表单**: React Hook Form + Zod
- **动画**: Framer Motion
- **图标**: Lucide React

## 功能特性

- ✅ 响应式设计（移动端适配）
- ✅ SEO 优化（Metadata API、Sitemap、Robots.txt）
- ✅ 结构化数据（JSON-LD）
- ✅ 性能优化（图片优化、代码分割）
- ✅ 表单验证（React Hook Form + Zod）
- ✅ 页面动画（Framer Motion）
- ✅ 返回顶部按钮
- ✅ 加载状态
- ✅ 404 页面

## 页面结构

- `/` - 首页
- `/about` - 关于我们
- `/products` - 产品列表
- `/products/[id]` - 产品详情
- `/blog` - 博客列表
- `/blog/[id]` - 博客详情
- `/contact` - 联系我们

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 部署

推荐使用 Vercel 一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 性能优化

- 使用 Next.js Image 组件自动优化图片
- 启用 React Compiler 自动优化性能
- 代码分割和懒加载
- 压缩和缓存配置
- 平滑滚动和动画优化

## SEO 优化

- 完善的 Metadata 配置
- 自动生成 Sitemap
- Robots.txt 配置
- 结构化数据（JSON-LD）
- Open Graph 和 Twitter Cards
- 语义化 HTML

## 自定义配置

1. 修改 `lib/seo.ts` 更新站点信息
2. 修改 `lib/structured-data.ts` 更新结构化数据
3. 修改 `components/layout/header.tsx` 和 `footer.tsx` 更新导航和页脚
4. 在 `app/` 目录下添加新页面

## License

MIT
