const User = require('../../database/postgres/models').user;
const Organization = require('../../database/postgres/models').organization;

const Crypto = require('../../helpers/crypto');

class SecurityUsers {

    async create(name, email = "", password, organizationid) {

        if (!email) {
            const {email} = await Organization.findOne({where: {id: organizationid}});

            return User.findOrCreate({
                where: {email},
                defaults: {name, email, password, organizationid, leader: true}
            });
        } else {
            return User.findOrCreate({
                where: {email},
                defaults: {name, email, password, organizationid, leader: false}
            });
        }
    }

    updateAvatar(oidphoto, email) {
        return User.update({oidphoto: oidphoto}, {where: {email: email}});
    }

    remove(id) {
        return User.destroy({where: {id}});
    }

    authenticate(email, password) {
        return User.findOne({
            where: {
                email: email,
                password: Crypto.hash(password)
            },
            include: [
                {
                    association: 'permissions',
                    attributes: ["name", "description"],
                },
                {
                    association: 'organization',
                    attributes: ["name", "type", "email"],
                    include: [
                        {
                            association: 'wallet',
                            attributes: ["address"]
                        },
                    ]
                }
            ],

        });
    };

    listUsers(organizationid) {
        return User.findAll({where: {organizationid: organizationid}})
    };

}

module.exports = new SecurityUsers();
