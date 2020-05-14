const express = require("express");
const cookieParser = require('cookie-parser');
const server = express();
const port = 5000;

const usersRouter = require('./routers/users-router');
const loginRouter = require('./routers/login-router');
const registerRouter = require('./routers/register-router');

server.use(express.json());
server.use(cookieParser());

server.get('/', (req, res) => {
    res.json({
        message: 'The API is up'
    })
});

server.use('/register', registerRouter);
server.use('/login', loginRouter);
server.use('/users', usersRouter);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});