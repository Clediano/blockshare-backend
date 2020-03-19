const Friend = require('../../database/postgres/models').friend;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class OrganizationFriend {

    sendSolicitation(invitedid, interestedid) {
        return Friend.findOrCreate({
            where: {invitedid, interestedid},
            defaults: {
                invitedid,
                interestedid,
                match: false
            }
        });
    };

    findAllSharedOrganizations(organizationid, offset, limit) {
        return Friend.findAll({
            where: {
                interestedid: organizationid
            },
            attributes: {
                exclude: ['invitedid', 'interestedid', 'updatedAt', 'createdAt'],
            },
            include: [
                {
                    association: 'invited',
                    attributes: ['name', 'email', 'id', 'oidphoto'],
                    include: [
                        {
                            association: 'wallet',
                            attributes: ['address']
                        }
                    ]
                }
            ],
            offset,
            limit
        });
    };

    findSharedOrganizationByName(organizationid, name, offset, limit) {
        return Friend.findAll({
            where: {
                interestedid: organizationid,
            },
            attributes: {
                exclude: ['invitedid', 'interestedid', 'updatedAt', 'createdAt'],
            },
            include: [
                {
                    association: 'invited',
                    attributes: ['name', 'email', 'id', 'oidphoto'],
                    where: {
                        name: {
                            [Op.like]: `%${name}%`
                        },
                    },
                    include: [
                        {
                            association: 'wallet',
                            attributes: ['address'],
                        }
                    ],
                }
            ],
            offset,
            limit
        })
    };

    findSharedOrganizationByEmail(organizationid, name, offset, limit) {
        return Friend.findAll({
            where: {
                interestedid: organizationid,
            },
            attributes: {
                exclude: ['invitedid', 'interestedid', 'updatedAt', 'createdAt'],
            },
            include: [
                {
                    association: 'invited',
                    attributes: ['name', 'email', 'id', 'oidphoto'],
                    where: {
                        email: {
                            [Op.like]: `%${name}%`
                        },
                    },
                    include: [
                        {
                            association: 'wallet',
                            attributes: ['address'],
                        }
                    ],
                }
            ],
            offset,
            limit
        })
    };
}

module.exports = new OrganizationFriend();
