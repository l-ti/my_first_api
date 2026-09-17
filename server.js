const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`✅ 服务已启动: http://localhost:${port}`);
});