const Transaction = require('../../database/postgres/models').transaction;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class DocumentTransaction {

    create(transaction) {
        return Transaction.create(transaction);
    };

    findAll(organizationid, offset, limit) {
        return Transaction.findAndCountAll({
            include: [
                {
                    association: 'document',
                    include: [
                        {
                            association: 'organization'
                        }
                    ],
                    where: {
                        organizationid: organizationid
                    }
                }
            ],
            offset,
            limit
        });
    };

    findByTxid(organizationid, text, offset, limit) {
        return Transaction.findAndCountAll({
            where: {
                txid: {
                    [Op.like]: `%${text}%`
                },
            },
            include: [
                {
                    association: 'document',
                    include: [
                        {
                            association: 'organization'
                        }
                    ],
                    where: {
                        organizationid: organizationid
                    }
                }
            ],
            offset,
            limit,
        });
    };

}

module.exports = new DocumentTransaction();
