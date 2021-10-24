const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');
const Chat = require('../../models/Chat');

// @route    POST api/auth
// @desc     Authenticate client & get token
// @access   Public
router.post('/', [
    check('login', 'Login is required').exists(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }

    const {password, login} = req.body;

    try {
        let user = await User.findOne({ login });

        if (!user) {
           return res
           .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        
        const payload = {
            user: {
                id: user._id
            }
        }

        let chats = await Chat.find({ users: { $all: [user._id]}});
        //console.log(chats);

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, chats });
            });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
});

router.post("/login", auth, async (req, res) => {
    let userLogin = await User.findById(req.user.id).select('login');
    res.json(userLogin);
});

module.exports = router;