const express = require('express');
const router = express.Router();
const Message = require('../../models/Message');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

router.get("/", auth, async (req, res) => {
    let messages = await Message.find({});
    res.json(messages);
});

module.exports = router;