const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const Chat = require('../../models/Chat');

// @route    POST api/reg
// @desc     Registr user & get token
// @access   Public
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('login', 'Login is required').exists(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }

    const {email, password, login} = req.body;

    try {

        let user = await User.findOne({ email: email });

        if (user) {
           return res.json({ errors: [{ msg: 'Email is already used' }] });
        }

        user = await User.findOne({ login: login });
        if (user) {
            return res.json({ errors: [{ msg: 'Login is already used' }] });
        }



        let newUser = new User({
            email,
            login,
            password
        })

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        newUser = await newUser.save();

        let globalChat = await Chat.findOne({title: 'Global'});
        if (globalChat) {
            globalChat.users.push(newUser._id);
            await globalChat.save();
        }
        
        res.json({msg: "New user created"});

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;