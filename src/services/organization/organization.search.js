const Organization = require('../../database/postgres/models').organization;
const Wallet = require('../../database/postgres/models').wallet;
const Friend = require('../../database/postgres/models').friend;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class OrganizationSearch {

    findOrganizationById(organizationid) {
        return Organization.findOne({
            where: {
                id: organizationid
            }
        });
    };

    findOrganizationByName(organizationid, text, offset, limit) {
        return this.findOrganizationsInvited(organizationid)
            .then(values => {
                const organizationsAlreadyInvitedForMe = values && values.map(organization => organization.invitedid);
                return {
                    organizations: Organization.findAndCountAll({
                        where: {
                            name: {
                                [Op.iLike]: `%${text}%`
                            },
                            id: {
                                [Op.notIn]: [organizationid]
                            }
                        },
                        attributes: ['id', 'name', 'email', 'oidphoto'],
                        offset,
                        limit,
                    }),
                    organizationsAlreadyInvitedForMe
                }
            });
    };

    findOrganizationByAddress(organizationid, text, offset, limit) {
        return this.findOrganizationsInvited(organizationid)
            .then(values => {
                const organizationsAlreadyInvitedForMe = values && values.map(organization => organization.invitedid);
                return Wallet.findAndCountAll({
                    where: {
                        address: {
                            [Op.iLike]: `%${text}%`
                        },
                        organizationid: {
                            [Op.notIn]: [organizationid, ...organizationsAlreadyInvitedForMe]
                        }
                    },
                    attributes: [],
                    include: [
                        {
                            association: 'organization',
                            attributes: ["id", "name", "email", "oidphoto"]
                        }
                    ],
                    offset,
                    limit
                })
            });
    };

    async findOrganizationsInvited(organizationid) {
        const organizations = await Friend.findAll({
            where: {
                interestedid: organizationid
            },
            attributes: ['invitedid'],
            raw: true
        });
        return organizations;
    }

}

module.exports = new OrganizationSearch();
