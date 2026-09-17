# 用户认证与利润计算 API

基于 Node.js + Express + MySQL 的后端接口项目，包含用户注册登录、JWT 鉴权、数据持久化。

## 技术栈
- Node.js + Express
- MySQL (mysql2)
- JWT (jsonwebtoken)
- 密码加密 (bcryptjs)
- 环境变量管理 (dotenv)

## 快速开始
1. 安装依赖：`npm install`
2. 复制 `.env.example` 为 `.env`，填入你的 MySQL 密码
3. 启动服务：`node server.js`
4. 服务运行在 `http://localhost:3000`

## 接口列表
| 方法 | 路径 | 说明 | 是否需要 Token |
|------|------|------|----------------|
| POST | /register | 用户注册 | 否 |
| POST | /login | 用户登录，返回 JWT Token | 否 |
| POST | /profit | 计算利润率 | 是（Bearer Token）|

## 数据库初始化
```sql
CREATE DATABASE IF NOT EXISTS my_first_api DEFAULT CHARACTER SET utf8mb4;
USE my_first_api;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);