const express = require('express');
const Professions = require('../models/Profession');
const router = express.Router({mergeParams: true});

router.get('/', async (req, res) => {
  try {
    console.log(req);
    const list = await Professions.find();
    console.log(list);
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: 'Server error. Please try later...',
    });
  }
});

module.exports = router;
