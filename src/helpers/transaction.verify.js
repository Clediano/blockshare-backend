const cron = require('node-cron');
const Transaction = require('../database/postgres/models').transaction;
const BlockchainTransaction = require('../services/blockchain/blockchain.transaction');

// -> '0 */1 * * *' : “At minute 0 past every hour.”.
// -> '*/10 * * * *' : “At every 10th minute.”
cron.schedule('*/10 * * * *', async () => {
    try {
        const transactions = await Transaction.findAll({where: {confirmed: false}, order: [['createdAt', 'ASC']]});

        transactions && transactions.map(({dataValues: transaction}) => {
            BlockchainTransaction.getTransaction(transaction.txid)
                .then(resp => {
                    if (resp.payload.confirmations > 6) {
                        Transaction.update({
                            confirmations: resp.payload.confirmations,
                            confirmed: true
                        }, {
                            where: {
                                id: transaction.id
                            }
                        });
                    } else {
                        Transaction.update({
                            confirmations: resp.payload.confirmations
                        }, {
                            where: {
                                id: transaction.id
                            }
                        });
                    }
                })
                .catch(err => {
                    throw new Error(err);
                });

        });
    } catch (err) {
        console.log(err)
    }
});



