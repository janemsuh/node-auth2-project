const bcrypt = require('bcryptjs');
const db = require('../database/config');

async function add(user) {
    user.password = await bcrypt.hash(user.password, 14)
    const [id] = await db('users').insert(user);
    return findById(id);
};

function find() {
    return db('users').select('id', 'username', 'department');
};

function findBy(field, filter) {
    return db('users').where(field, filter).select('id', 'username', 'password', 'department');
};

function findById(id) {
    return db('users').where('id', id).select('id', 'username', 'department').first();
};

module.exports = {
    add,
    find,
    findBy,
    findById
};