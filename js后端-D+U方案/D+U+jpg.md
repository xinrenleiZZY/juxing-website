好的，我来给你一个完整的**缩略图 + 点击放大**方案的代码。这是针对你的 GB 级数据 + 海量图片场景最实用的方案。

---

## 一、整体架构

```
表格显示 → 缩略图（200x200，WebP，~20KB）
    ↓ 点击
弹窗显示 → 原图（完整尺寸）
```

---

## 二、后端代码（Node.js + Express）

### `server.js` - 完整后端服务

```javascript
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 数据库连接池
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    database: process.env.DB_NAME || 'product_db',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'your_password',
    max: 20,
});

// 图片目录配置（根据你的 NAS 实际路径修改）
const IMAGE_BASE_PATH = '/mnt/nas_images';  // NAS 上的原图根目录
const THUMB_CACHE_PATH = '/tmp/thumbnails';  // 缩略图缓存目录

// 确保缩略图目录存在
if (!fs.existsSync(THUMB_CACHE_PATH)) {
    fs.mkdirSync(THUMB_CACHE_PATH, { recursive: true });
}

// ==================== API 接口 ====================

// 1. 分页查询产品列表（带筛选）
app.get('/api/products', async (req, res) => {
    try {
        const {
            page = 1,
            pageSize = 100,
            keyword = '',
            category = '',
            minPrice = '',
            maxPrice = ''
        } = req.query;

        const offset = (parseInt(page) - 1) * parseInt(pageSize);
        const params = [];
        let paramIndex = 1;
        const whereConditions = [];

        // 构建筛选条件
        if (keyword) {
            whereConditions.push(`name ILIKE $${paramIndex}`);
            params.push(`%${keyword}%`);
            paramIndex++;
        }

        if (category) {
            whereConditions.push(`category = $${paramIndex}`);
            params.push(category);
            paramIndex++;
        }

        if (minPrice) {
            whereConditions.push(`price >= $${paramIndex}`);
            params.push(parseFloat(minPrice));
            paramIndex++;
        }

        if (maxPrice) {
            whereConditions.push(`price <= $${paramIndex}`);
            params.push(parseFloat(maxPrice));
            paramIndex++;
        }

        const whereClause = whereConditions.length > 0 
            ? `WHERE ${whereConditions.join(' AND ')}` 
            : '';

        // 查询总数
        const countQuery = `SELECT COUNT(*) FROM products ${whereClause}`;
        const countResult = await pool.query(countQuery, params);
        const total = parseInt(countResult.rows[0].count);

        // 查询数据
        const dataQuery = `
            SELECT id, name, category, price, description, image_path 
            FROM products 
            ${whereClause}
            ORDER BY id 
            LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
        `;
        params.push(parseInt(pageSize), offset);
        
        const dataResult = await pool.query(dataQuery, params);

        res.json({
            success: true,
            total,
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            items: dataResult.rows
        });

    } catch (err) {
        console.error('Query error:', err);
        res.status(500).json({ success: false, error: 'Database query failed' });
    }
});

// 2. 获取缩略图（自动生成并缓存）
app.get('/api/thumbnail/:id', async (req, res) => {
    const { id } = req.params;
    const thumbPath = path.join(THUMB_CACHE_PATH, `${id}.webp`);

    // 如果缩略图已存在，直接返回
    if (fs.existsSync(thumbPath)) {
        res.setHeader('Cache-Control', 'public, max-age=2592000'); // 缓存30天
        return res.sendFile(thumbPath);
    }

    try {
        // 从数据库获取原图路径
        const result = await pool.query(
            'SELECT image_path FROM products WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Image not found' });
        }

        const originalPath = path.join(IMAGE_BASE_PATH, result.rows[0].image_path);
        
        if (!fs.existsSync(originalPath)) {
            return res.status(404).json({ error: 'Image file not found' });
        }

        // 生成缩略图（200x200，居中裁剪，WebP格式）
        await sharp(originalPath)
            .resize(200, 200, {
                fit: 'cover',
                position: 'centre'
            })
            .webp({ quality: 85 })
            .toFile(thumbPath);

        res.setHeader('Cache-Control', 'public, max-age=2592000');
        res.sendFile(thumbPath);

    } catch (err) {
        console.error('Thumbnail generation error:', err);
        res.status(500).json({ error: 'Failed to generate thumbnail' });
    }
});

// 3. 获取原图（用于弹窗放大）
app.get('/api/original/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT image_path FROM products WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Image not found' });
        }

        const originalPath = path.join(IMAGE_BASE_PATH, result.rows[0].image_path);
        
        if (!fs.existsSync(originalPath)) {
            return res.status(404).json({ error: 'Image file not found' });
        }

        // 原图可以缓存较短时间
        res.setHeader('Cache-Control', 'public, max-age=86400'); // 缓存1天
        res.sendFile(originalPath);

    } catch (err) {
        console.error('Original image error:', err);
        res.status(500).json({ error: 'Failed to load original image' });
    }
});

// 4. 获取筛选选项（类别列表）
app.get('/api/categories', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category'
        );
        res.json({ success: true, categories: result.rows.map(r => r.category) });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to fetch categories' });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Image base path: ${IMAGE_BASE_PATH}`);
    console.log(`Thumb cache path: ${THUMB_CACHE_PATH}`);
});
```

---

## 三、前端代码（完整 HTML + JavaScript）

### `index.html` - 主页面

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片管理系统 - 缩略图+点击放大</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        /* 筛选栏 */
        .filters {
            padding: 20px;
            background: #fafafa;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            align-items: flex-end;
        }

        .filter-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .filter-group label {
            font-size: 12px;
            font-weight: 600;
            color: #666;
        }

        .filter-group input,
        .filter-group select {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            min-width: 150px;
        }

        .filter-group input:focus,
        .filter-group select:focus {
            outline: none;
            border-color: #007bff;
        }

        .btn-search {
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        }

        .btn-search:hover {
            background: #0056b3;
        }

        .stats {
            margin-left: auto;
            padding: 8px 12px;
            background: #e9ecef;
            border-radius: 6px;
            font-size: 14px;
            color: #495057;
        }

        /* 表格头部 */
        .table-header {
            display: grid;
            grid-template-columns: 120px 1fr 120px 100px 80px;
            background: #f8f9fa;
            font-weight: 600;
            padding: 12px 16px;
            border-bottom: 2px solid #dee2e6;
            position: sticky;
            top: 0;
            z-index: 10;
            font-size: 14px;
        }

        /* 滚动容器 */
        .scroll-container {
            height: calc(100vh - 180px);
            overflow-y: auto;
            position: relative;
        }

        .scroll-content {
            position: relative;
        }

        /* 数据行 */
        .row {
            display: grid;
            grid-template-columns: 120px 1fr 120px 100px 80px;
            padding: 12px 16px;
            border-bottom: 1px solid #f0f0f0;
            align-items: center;
            transition: background 0.2s;
        }

        .row:hover {
            background: #f8f9fa;
        }

        /* 图片单元格 */
        .image-cell {
            text-align: center;
        }

        .thumbnail {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            background: #f0f0f0;
        }

        .thumbnail:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .name-cell {
            word-break: break-word;
            font-size: 14px;
            color: #333;
        }

        .category-cell {
            color: #666;
            font-size: 13px;
        }

        .price-cell {
            text-align: right;
            font-weight: 600;
            color: #28a745;
        }

        .action-cell {
            text-align: center;
        }

        .view-btn {
            background: none;
            border: 1px solid #007bff;
            color: #007bff;
            padding: 4px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
        }

        .view-btn:hover {
            background: #007bff;
            color: white;
        }

        /* 加载状态 */
        .loading {
            text-align: center;
            padding: 40px;
            color: #999;
        }

        /* 模态框（图片放大） */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.95);
            cursor: pointer;
        }

        .modal-content {
            margin: auto;
            display: block;
            max-width: 90%;
            max-height: 90%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 8px;
            box-shadow: 0 4px 40px rgba(0,0,0,0.3);
        }

        .modal-close {
            position: absolute;
            top: 20px;
            right: 40px;
            color: white;
            font-size: 48px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1001;
            transition: color 0.2s;
        }

        .modal-close:hover {
            color: #ccc;
        }

        .modal-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 16px;
        }
    </style>
</head>
<body>

<div class="container">
    <!-- 筛选栏 -->
    <div class="filters">
        <div class="filter-group">
            <label>🔍 关键词</label>
            <input type="text" id="keyword" placeholder="产品名称..." autocomplete="off">
        </div>
        <div class="filter-group">
            <label>📁 分类</label>
            <select id="category">
                <option value="">全部分类</option>
            </select>
        </div>
        <div class="filter-group">
            <label>💰 最低价格</label>
            <input type="number" id="minPrice" placeholder="0" autocomplete="off">
        </div>
        <div class="filter-group">
            <label>💰 最高价格</label>
            <input type="number" id="maxPrice" placeholder="不限" autocomplete="off">
        </div>
        <button class="btn-search" id="searchBtn">🔍 筛选</button>
        <div class="stats" id="stats">共 0 条数据</div>
    </div>

    <!-- 表格头部 -->
    <div class="table-header">
        <div>图片</div>
        <div>产品名称</div>
        <div>分类</div>
        <div>价格</div>
        <div>操作</div>
    </div>

    <!-- 滚动容器 -->
    <div class="scroll-container" id="scrollContainer">
        <div class="scroll-content" id="scrollContent">
            <div class="loading">加载中...</div>
        </div>
    </div>
</div>

<!-- 图片放大模态框 -->
<div id="imageModal" class="modal">
    <span class="modal-close">&times;</span>
    <img class="modal-content" id="modalImage">
    <div class="modal-loading" id="modalLoading">加载原图中...</div>
</div>

<script>
    // 配置
    const API_BASE = '/api';
    const PAGE_SIZE = 100;
    let currentData = [];
    let currentPage = 1;
    let totalItems = 0;
    let isLoading = false;
    let hasMore = true;
    let filters = {
        keyword: '',
        category: '',
        minPrice: '',
        maxPrice: ''
    };

    // DOM 元素
    const scrollContainer = document.getElementById('scrollContainer');
    const scrollContent = document.getElementById('scrollContent');
    const keywordInput = document.getElementById('keyword');
    const categorySelect = document.getElementById('category');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const searchBtn = document.getElementById('searchBtn');
    const statsSpan = document.getElementById('stats');

    // 模态框元素
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalLoading = document.getElementById('modalLoading');
    const modalClose = document.querySelector('.modal-close');

    // ==================== 加载分类选项 ====================
    async function loadCategories() {
        try {
            const response = await fetch(`${API_BASE}/categories`);
            const data = await response.json();
            if (data.success && data.categories) {
                data.categories.forEach(cat => {
                    const option = document.createElement('option');
                    option.value = cat;
                    option.textContent = cat;
                    categorySelect.appendChild(option);
                });
            }
        } catch (err) {
            console.error('加载分类失败:', err);
        }
    }

    // ==================== 加载数据 ====================
    async function loadData(reset = true) {
        if (isLoading) return;
        if (!reset && !hasMore) return;

        isLoading = true;
        
        if (reset) {
            currentPage = 1;
            hasMore = true;
            scrollContent.innerHTML = '<div class="loading">加载中...</div>';
        }

        try {
            const params = new URLSearchParams({
                page: currentPage,
                pageSize: PAGE_SIZE,
                keyword: filters.keyword,
                category: filters.category,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice
            });

            const response = await fetch(`${API_BASE}/products?${params}`);
            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || '加载失败');
            }

            totalItems = result.total;
            statsSpan.textContent = `共 ${totalItems} 条数据`;

            if (reset) {
                currentData = result.items;
                renderRows(currentData);
            } else {
                currentData = [...currentData, ...result.items];
                appendRows(result.items);
            }

            currentPage++;
            hasMore = currentData.length < totalItems;

        } catch (err) {
            console.error('加载数据失败:', err);
            scrollContent.innerHTML = `<div class="loading">加载失败: ${err.message}</div>`;
        } finally {
            isLoading = false;
        }
    }

    // ==================== 渲染行（重置时） ====================
    function renderRows(items) {
        if (!items || items.length === 0) {
            scrollContent.innerHTML = '<div class="loading">暂无数据</div>';
            return;
        }

        const fragment = document.createDocumentFragment();
        items.forEach(item => {
            fragment.appendChild(createRowElement(item));
        });

        scrollContent.innerHTML = '';
        scrollContent.appendChild(fragment);
    }

    // ==================== 追加行（滚动加载更多） ====================
    function appendRows(items) {
        const fragment = document.createDocumentFragment();
        items.forEach(item => {
            fragment.appendChild(createRowElement(item));
        });
        scrollContent.appendChild(fragment);
    }

    // ==================== 创建单行元素 ====================
    function createRowElement(item) {
        const row = document.createElement('div');
        row.className = 'row';
        row.dataset.id = item.id;

        // 图片单元格
        const imgCell = document.createElement('div');
        imgCell.className = 'image-cell';
        const img = document.createElement('img');
        img.className = 'thumbnail';
        img.src = `${API_BASE}/thumbnail/${item.id}`;
        img.alt = item.name;
        img.title = '点击放大查看原图';
        img.onclick = () => showOriginalImage(item.id);
        imgCell.appendChild(img);
        row.appendChild(imgCell);

        // 名称单元格
        const nameCell = document.createElement('div');
        nameCell.className = 'name-cell';
        nameCell.textContent = item.name || '-';
        row.appendChild(nameCell);

        // 分类单元格
        const categoryCell = document.createElement('div');
        categoryCell.className = 'category-cell';
        categoryCell.textContent = item.category || '-';
        row.appendChild(categoryCell);

        // 价格单元格
        const priceCell = document.createElement('div');
        priceCell.className = 'price-cell';
        priceCell.textContent = item.price ? `¥${parseFloat(item.price).toFixed(2)}` : '-';
        row.appendChild(priceCell);

        // 操作单元格
        const actionCell = document.createElement('div');
        actionCell.className = 'action-cell';
        const viewBtn = document.createElement('button');
        viewBtn.className = 'view-btn';
        viewBtn.textContent = '查看大图';
        viewBtn.onclick = () => showOriginalImage(item.id);
        actionCell.appendChild(viewBtn);
        row.appendChild(actionCell);

        return row;
    }

    // ==================== 显示原图（弹窗放大） ====================
    function showOriginalImage(imageId) {
        modal.style.display = 'block';
        modalLoading.style.display = 'block';
        modalImage.style.display = 'none';
        modalImage.src = '';

        // 加载原图
        const img = new Image();
        img.onload = () => {
            modalImage.src = img.src;
            modalImage.style.display = 'block';
            modalLoading.style.display = 'none';
        };
        img.onerror = () => {
            modalLoading.innerHTML = '图片加载失败';
            setTimeout(() => {
                modal.style.display = 'none';
                modalLoading.innerHTML = '加载原图中...';
            }, 1500);
        };
        img.src = `${API_BASE}/original/${imageId}`;
    }

    // ==================== 关闭模态框 ====================
    function closeModal() {
        modal.style.display = 'none';
        modalImage.src = '';
    }

    // ==================== 滚动加载更多 ====================
    function handleScroll() {
        if (isLoading || !hasMore) return;

        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        // 距离底部 200px 时加载下一页
        if (scrollTop + clientHeight >= scrollHeight - 200) {
            loadData(false);
        }
    }

    // ==================== 筛选 ====================
    function applyFilters() {
        filters = {
            keyword: keywordInput.value.trim(),
            category: categorySelect.value,
            minPrice: minPriceInput.value,
            maxPrice: maxPriceInput.value
        };
        
        // 重置滚动位置
        scrollContainer.scrollTop = 0;
        // 重新加载数据
        loadData(true);
    }

    // ==================== 防抖函数 ====================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ==================== 事件绑定 ====================
    searchBtn.addEventListener('click', applyFilters);
    keywordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyFilters();
    });
    scrollContainer.addEventListener('scroll', debounce(handleScroll, 100));
    
    // 模态框关闭
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // ==================== 初始化 ====================
    async function init() {
        await loadCategories();
        await loadData(true);
    }

    init();
</script>
</body>
</html>
```

---

## 四、Docker 部署配置

### `docker-compose.yml`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: postgres
    environment:
      POSTGRES_DB: product_db
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: your_strong_password
    volumes:
      - ./postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: always

  backend:
    build: ./backend
    container_name: backend
    environment:
      DB_HOST: postgres
      DB_USER: admin
      DB_PASSWORD: your_strong_password
      DB_NAME: product_db
    volumes:
      - /volume1/your_nas_images:/mnt/nas_images  # ⚠️ 改成你的 NAS 图片路径
      - /tmp/thumbnails:/tmp/thumbnails
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    restart: always

  frontend:
    image: nginx:alpine
    container_name: frontend
    volumes:
      - ./frontend:/usr/share/nginx/html
    ports:
      - "80:80"
    restart: always
```

### `backend/Dockerfile`

```dockerfile
FROM node:18-alpine

# 安装 sharp 依赖
RUN apk add --no-cache python3 make g++ vips-dev

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### `backend/package.json`

```json
{
  "name": "image-table-backend",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "pg": "^8.11.0",
    "sharp": "^0.32.0"
  }
}
```

---

## 五、使用说明

### 1. 部署步骤
```bash
# 在 Ubuntu 虚拟机中
cd ~/image-table-app

# 创建目录结构
mkdir -p backend frontend postgres_data

# 把后端代码放到 backend/ 目录
# 把前端 index.html 放到 frontend/ 目录

# 启动所有服务
docker-compose up -d
```

### 2. 访问地址
- **前端页面**：`http://虚拟机的IP`
- **后端 API**：`http://虚拟机的IP:3000`

### 3. 功能说明
- ✅ 缩略图自动生成并缓存（首次访问稍慢，后续秒开）
- ✅ 点击缩略图或"查看大图"按钮 → 弹窗显示原图
- ✅ 支持关键词搜索、分类筛选、价格区间筛选
- ✅ 滚动到底部自动加载更多
- ✅ 原图加载时显示 Loading 状态
- ✅ ESC 键或点击背景关闭弹窗

---

## 六、性能说明

| 项目 | 数值 |
|------|------|
| 缩略图大小 | ~15-25KB/张 (WebP) |
| 单页加载 | 100条 × 25KB = 2.5MB |
| 首屏加载时间 | < 2秒 |
| 原图加载 | 按需加载，不占带宽 |
| 支持数据量 | 理论无限（数据库分页） |

这个方案完全满足你的 GB 级数据 + 海量图片场景，既保证了表格流畅滚动，又提供了查看原图的能力。