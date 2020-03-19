const Wallet = require('../../services/organization/organization.wallet');
const Address = require('../../services/blockchain/blockchain.address');

class OrganizationWalletController {

    findByOrganizationId(req, res) {
        const {organizationid} = req.params;

        return Wallet.findByOrganizationId(organizationid)
            .then(wallet => {
                return res.status(200).send(wallet);
            })
            .catch(err => {
                return res.status(400).send({
                    message: "Não foi possível encontrar a carteira da organização.",
                    details: err
                });
            })
    };

    getAddressDetails(req, res) {
        const {address} = req.params;

        return Address.getAddressDetails(address)
            .then(address => {
                return res.status(200).send(address);
            })
            .catch(err => {
                return res.status(400).send({
                    message: "Não foi possível encontrar a carteira da organização.",
                    details: err
                });
            })
    }

}

module.exports = new OrganizationWalletController();
