const jsonwebtoken = require('jsonwebtoken');
const userDao = require('../../dao/user.dao');
const Response = require('../../utils/responseBuilder');
const { jwt } = require('../../config/config');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json(new Response(false, 'Access denied. No token provided.'));
    }

    try {
        const decoded = jsonwebtoken.verify(token, jwt.secret);
        const user = await userDao.findUserByEmail(decoded.email);

        if (!user || user.login_token !== token) {
            return res.status(401).json(new Response(false, 'Invalid token.'));
        }

        req.user = user;
        next();
    } catch (ex) {
        res.status(400).json(new Response(false, 'Invalid token.'));
    }
};
