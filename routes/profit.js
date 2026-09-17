const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.post('/profit', authMiddleware, (req, res) => {
  const { cost, price } = req.body;

  if (cost === undefined || price === undefined) {
    return res.json({ code: -1, msg: "参数缺失" });
  }

  if (price <= cost) {
    return res.json({ code: -1, msg: "亏本买卖，不接单" });
  }

  const rate = ((price - cost) / cost * 100).toFixed(0);
  res.json({ code: 0, data: { rate: rate + '%' } });
});

module.exports = router;