const jwt = require('jsonwebtoken');
const { auth_key } = require('../../config/secret');

class SecurityToken {

    generateToken(data) {
        return jwt.sign(data, auth_key, { expiresIn: '1d' });
    }

    decodeToken(token, callback) {
        return jwt.verify(token, auth_key, callback);
    }

    authorize(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).send({ error: 'Token de authenticação não encontrado.' });
        }

        const parts = authHeader.split(' ');

        if (!parts.length === 2) {
            res.status(401).send({ error: 'Token de authenticação inválido.' });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            res.status(401).send({ error: 'Token de authenticação inválido.' });
        }

        jwt.verify(token, auth_key, (err, decoded) => {
            if (err) {
                res.status(401).send({ error: 'Token de authenticação inválido.' });
            }
            req.userEmail = decoded.user;
            req.organizationid = decoded.organization;

            next();
        })
    };

}

module.exports = new SecurityToken();
