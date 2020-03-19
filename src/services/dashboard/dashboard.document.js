const Transaction = require('../../database/postgres/models').transaction;
const Friend = require('../../database/postgres/models').friend;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class DashboardDocument {

    countNumberOfDocumentsNotRegistred(organizationid) {
        return Transaction.findAndCountAll({
            include: [
                {
                    association: 'document',
                    where: {
                        organizationid: organizationid,
                    }
                }
            ],
            where: {
                confirmed: false
            }
        });
    };

    countNumberOfDocumentsRegistred(organizationid) {
        return Transaction.findAndCountAll({
            where: {
                confirmed: true
            },
            include: [
                {
                    association: 'document',
                    where: {
                        organizationid: organizationid
                    }
                }
            ]
        });
    };

    countNumberTotalOfDocuments(organizationid) {
        return Transaction.findAndCountAll({
            include: [
                {
                    association: 'document',
                    where: {
                        organizationid: organizationid
                    }
                }
            ]
        });
    };

    countNumberOfFriends(organizationid) {
        return Friend.findAndCountAll({
            where: {
                interestedid: organizationid
            }
        });
    };

    findDocumentsByPeriod(organizationid, dataInicial, dataFinal) {
        return Transaction.findAndCountAll({
            include: [
                {
                    association: 'document',
                    where: {
                        organizationid: organizationid
                    },
                    attributes: ['id']
                }
            ],
            where: {
                createdAt: {
                    [Op.between]: [dataInicial, dataFinal]
                }
            },
            attributes: ['id', 'createdAt'],
            order: [
                ['createdAt', 'ASC' ]
            ]
        })
    };
}

module.exports = new DashboardDocument();
