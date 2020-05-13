const jwt = require('jsonwebtoken');

function restricted() {
    return async (req, res, next) => {
        try {
            console.log(req.headers);
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    message: 'You shall not pass! Token does not exist.'
                });
            }
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
                if (err) {
                    return res.status(401).json({
                        message: 'You shall not pass! Invalid role?'
                    });
                }
                req.token = decodedPayload;
                next();
            })
        } catch (err) {
            next(err);
        }
    }
};

module.exports = restricted;