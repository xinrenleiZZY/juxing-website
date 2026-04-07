# 部署指南

## Vercel 部署（推荐）

### 一键部署

1. 点击下方按钮一键部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/your-repo)

### 手动部署

1. 在 [Vercel](https://vercel.com) 注册账号
2. 点击 "New Project"
3. 导入你的 Git 仓库
4. Vercel 会自动检测 Next.js 项目
5. 点击 "Deploy" 开始部署

### 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=企业官网
NEXT_PUBLIC_CONTACT_EMAIL=contact@example.com
NEXT_PUBLIC_CONTACT_PHONE=400-123-4567
```

### 自定义域名

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的域名
3. 按照提示配置 DNS 记录

## 其他部署方式

### Docker 部署

```bash
# 构建镜像
docker build -t my-website .

# 运行容器
docker run -p 3000:3000 my-website
```

### 传统服务器部署

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

使用 PM2 管理进程：

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "my-website" -- start

# 设置开机自启
pm2 startup
pm2 save
```

## 性能检查清单

部署后请检查以下项目：

- [ ] 所有页面正常访问
- [ ] 图片正常加载
- [ ] 表单提交正常
- [ ] 移动端显示正常
- [ ] SEO 标签正确
- [ ] Sitemap 可访问 (/sitemap.xml)
- [ ] Robots.txt 可访问 (/robots.txt)
- [ ] Lighthouse 评分 > 90

## 监控和分析

### Google Analytics（可选）

1. 创建 GA4 属性
2. 获取测量 ID
3. 添加到环境变量 `NEXT_PUBLIC_GA_ID`
4. 在 `app/layout.tsx` 中添加 GA 脚本

### Vercel Analytics

Vercel 项目自动包含基础分析功能，可在项目面板查看。

## 故障排查

### 构建失败

- 检查 Node.js 版本（推荐 18.x 或更高）
- 清除缓存：`rm -rf .next node_modules && npm install`
- 检查环境变量是否正确配置

### 页面 404

- 确认路由文件结构正确
- 检查 `next.config.ts` 配置
- 查看构建日志

### 性能问题

- 启用 Vercel Edge Network
- 优化图片大小和格式
- 检查是否有大型依赖包
- 使用 Next.js Image 组件

## 更新部署

### Vercel 自动部署

推送到 Git 仓库后，Vercel 会自动触发部署。

### 手动更新

```bash
# 拉取最新代码
git pull

# 安装依赖
npm install

# 重新构建
npm run build

# 重启服务
pm2 restart my-website
```
