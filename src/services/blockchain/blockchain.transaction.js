const Wallet = require('../../database/postgres/models').wallet;
const blockchain = require('../../config/blockchain');

const TRANSACTION_FEE = {
    MIN: 'min',
    MAX: 'max',
    NORMAL: 'average'
};

class BlockchianTransaction {

    /**
     *
     * @param {String} txid Id of the transaction in blockchain
     */
    getTransaction(txid) {
        return blockchain.transaction.getTransaction(txid);
    };


    /**
     *
     * @param {Object} body Object with data string and priority (MIN, MAX or NORMAL - default)
     */
    async newTransaction(body, organizationid) {
        const {data, priority = "NORMAL"} = body;

        const wallet = await Wallet.findOne({where: {organizationid: organizationid}});

        if (!wallet) return null;

        const {payload} = await this.getTransactionsFee();

        if (!payload) return null;

        return await blockchain.transaction.newTransaction(
            [{
                "address": wallet.dataValues.address,
                "value": 0.00009
            }],
            [{
                "address": wallet.dataValues.address,
                "value": 0.00009
            }],
            {
                "address": wallet.dataValues.address,
                "value": payload[TRANSACTION_FEE[priority]]
            },
            [wallet.dataValues.wif],
            {
                data: data
            }
        );

    };

    getTransactionsFee() {
        return blockchain.transaction.getTransactionsFee();
    };

}

module.exports = new BlockchianTransaction();
