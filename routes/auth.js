const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// 注册
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ code: -1, msg: "用户名和密码不能为空" });
  }

  try {
    const [existRows] = await db.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );
    if (existRows.length > 0) {
      return res.json({ code: -1, msg: "用户名已存在" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.json({ code: 0, msg: "注册成功", data: { username } });
  } catch (err) {
    console.error(err);
    res.json({ code: -1, msg: "服务器错误" });
  }
});

// 登录
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    if (rows.length === 0) {
      return res.json({ code: -1, msg: "用户不存在" });
    }

    const user = rows[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.json({ code: -1, msg: "密码错误" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ code: 0, msg: "登录成功", data: { token, username: user.username } });
  } catch (err) {
    console.error(err);
    res.json({ code: -1, msg: "服务器错误" });
  }
});

module.exports = router;