exports.seed = function(knex) {
    return knex('users').insert([
        {
            username: 'AnonymousDog',
            password: 'mynameissteve',
            department: 'IT'
        },
        {
            username: 'AnonymousCat',
            password: 'mynameispeggy',
            department: 'Human Resources'
        },
        {
            username: 'AnonymousElephant',
            password: 'mynameisambo',
            department: 'Development'
        },
    ]);
};