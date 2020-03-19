const Wallet = require('../../database/postgres/models').wallet;

const Crypto = require('../../helpers/crypto');

class OrganizationWallet {

    create(wallet, organizationid) {
        const baseWallet = {
            ...wallet,
            privatekey: Crypto.encript(wallet.privateKey),
            publickey: wallet.publicKey
        };
        return Wallet.create({...baseWallet, organizationid});
    };

    findByOrganizationId(organizationid) {
        return Wallet.findOne({
            where: {organizationid},
            attributes: ["address"]
        });
    }

}

module.exports = new OrganizationWallet();
