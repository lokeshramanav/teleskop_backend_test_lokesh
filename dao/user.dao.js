const { masterDbConn } = require('../connector');
const bcrypt = require('bcrypt');

const createUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await masterDbConn.query('INSERT INTO teleskop_users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    return result.insertId;
};

const findUserByEmail = async (email) => {
    const [rows] = await masterDbConn.query('SELECT * FROM teleskop_users WHERE email = ?', [email]);
    return rows[0];
};

const updateLoginToken = async (userId, token) => {
    await masterDbConn.query('UPDATE teleskop_users SET login_token = ? WHERE id = ?', [token, userId]);
};

const logoutUser = async (userId) => {
    await masterDbConn.query('UPDATE teleskop_users SET login_token = NULL WHERE id = ?', [userId]);
};



module.exports = {
    createUser,
    findUserByEmail,
    updateLoginToken,
    logoutUser
}