const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { json } = require('express');

exports.register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const exisUser = await User.findOne({ email });

        if (exisUser)
            return res.status(400).json({ msg: 'already available!' })

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ name, email, password: hashPassword });
        res.status(201).json({ msg: 'user created!' });

    } catch (error) {
        res.status(500).json({ msg: 'server error' })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: `cant't find your email` })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "wrong password!" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,         // Required for HTTPS
            sameSite: 'None',     // Required for cross-site cookie sharing
        });
        res.json({ msg: 'Login successful!' });

    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

