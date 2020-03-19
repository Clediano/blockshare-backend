const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const password = 'HuxKr9zi@tov!xDAy%qifLCMU@eZvd';
const key = crypto.scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0);

class Crypto {
    encript(string) {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const crypted = cipher.update(string, 'utf8', 'hex')

        return crypted;
    };

    decript(string) {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        const decrypted = decipher.update(string, 'hex', 'utf8');

        return decrypted;
    };

    hash(string) {
        const hash = crypto.createHash('sha256');
        const hashed = hash.update(string, 'utf8');

        return hashed.digest('hex');
    };

    hashBuffer(arrayBuffer) {
        const hash = crypto.createHash('sha256');
        const hashed = hash.update(arrayBuffer);

        return hashed.digest('hex');
    }
}

module.exports = new Crypto();