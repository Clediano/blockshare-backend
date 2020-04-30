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

    findAllSharedEmailOrganizations(organizationid) {
        return Friend.findAll({
            where: {
                interestedid: organizationid
            },
            attributes: {
                exclude: ['match','invitedid', 'interestedid', 'updatedAt', 'createdAt'],
            },
            include: [
                {
                    association: 'invited',
                    attributes: ['name', 'email', 'id'],

                }
            ]
        }).map(friend => friend.invited);
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
                            [Op.iLike]: `%${name}%`
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
                            [Op.iLike]: `%${name}%`
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
