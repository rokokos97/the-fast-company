const express = require('express');
const Quality = require('../models/Quality');
// eslint-disable-next-line new-cap
const router = express.Router({mergeParams: true});

router.get('/', async (req, res) => {
  try {
    const list = await Quality.find();
    res.status(200).json({list});
  } catch (e) {
    res.status(500).json({
      message: 'Server error. Please try later...',
    });
  }
});
module.exports = router;
