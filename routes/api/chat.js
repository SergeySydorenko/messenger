const express = require('express');
const router = express.Router();
const Message = require('../../models/Message');
const User = require('../../models/User');
const Chat = require('../../models/Chat');
const auth = require('../../middleware/auth');

router.get("/", auth, async (req, res) => {
    let chatId = req.query.chat;
    let messages = await Message.findById(chatId).populate('author', '-password -email');
    res.json(messages);
});

router.post("/newChat", auth, async (req, res) => {
    const {title, login} = req.body;

    if (title === 'Global') {
        res.json({ errors: [{ msg: 'You can`t name chat Global' }] });
    }

    let anotherUser = await User.findOne({ login: login}).select('_id');
    if (!anotherUser) {
        res.json({ errors: [{ msg: 'User don`t exists' }] });
    }

    let chat = new Chat({
        title: title,
        users: [req.user.id, anotherUser._id]
    })

    chat = await chat.save();
    res.json(chat);
})

router.post("/addUser", auth, async (req, res) => {
    const {chatId, login} = req.body;

    let anotherUser = await User.findOne({ login: login}).select('_id');
    if (!anotherUser) {
        res.json({ errors: [{ msg: 'User don`t exists' }] });
    }

    let chat = await Chat.findOne({ _id: chatId, users: {$all: [anotherUser._id]}});
    if (chat) {
        res.json({ errors: [{ msg: 'User already added' }] });
    }

    chat = await Chat.findById(chatId);
    chat.users.push(anotherUser);
    chat = await chat.save();

    res.json(chat);
})

router.get("/findUser", auth, async (req, res) => {
    let login = req.query.login;

    let users = await User.find({ login: {$regex: `${login}`, $options: 'i'} }).select('_id login');
    res.json(users);
})

router.get("/globalChat", async (req, res) => {

    let userList = await User.find({}).select('_id');
    let idList = [];
    userList.forEach(user => idList.push(user._id));
    console.log(idList);

    let globalChat = new Chat({
        title: "Global",
        users: idList
    });
    globalChat = await globalChat.save();
    res.json(globalChat);
});

module.exports = router;