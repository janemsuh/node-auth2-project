const jwt = require('jsonwebtoken');

function restricted(role = 'normal') {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    message: 'You shall not pass! Invalid credentials.'
                });
            }
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
                if (err || decodedPayload.userRole !== role) {
                    return res.status(401).json({
                        message: 'You shall not pass! Invalid credentials.'
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