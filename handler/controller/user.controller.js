const userDao = require('../../dao/user.dao');
const Response = require('../../utils/responseBuilder');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwt } = require('../../config/config');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userId = await userDao.createUser(email, password);
        return res.status(201).json(new Response(true, 'User registered successfully', { userId }));
    } catch (error) {
        return res.status(500).json(new Response(false, 'User registration failed', { error: error.message }));
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.findUserByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jsonwebtoken.sign({ id: user.id, email: user.email }, jwt.secret, { expiresIn: jwt.expiresIn });
            await userDao.updateLoginToken(user.id, token);
            return res.status(200).json(new Response(true, 'Login successful', { token }));
        } else {
            return res.status(401).json(new Response(false, 'Invalid credentials'));
        }
    } catch (error) {
        return res.status(500).json(new Response(false, 'Login failed', { error: error.message }));
    }
};

const logout = async (req, res) => {
    try {
        const userId = req.user.id; 
        await userDao.logoutUser(userId);
        return res.status(200).json(new Response(true, 'Logout successful'));
    } catch (error) {
        return res.status(500).json(new Response(false, 'Logout failed', { error: error.message }));
    }
};

module.exports = {
    register,
    login,
    logout
};