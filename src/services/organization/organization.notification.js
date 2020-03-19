const Friend = require('../../database/postgres/models').friend;

class OrganizationNotification {

    findAllNotifications(organizationid) {
        return Friend.findAll({
            where: {
                invitedid: organizationid,
                match: false
            },
            include: [
                {
                    association: 'interested',
                    attributes: ['id', 'name', 'email']
                }
            ],
            attributes: ['match', 'id']
        })
    };

    acceptSolicitation(solicitationid) {
        return Friend.update({
            match: true
        }, {
            where: {id: solicitationid}
        });
    };

    rejectSolicitation(solicitationid) {
        return Friend.destroy({
            where: {id: solicitationid}
        });
    }

    countAllNotification(organizationid) {
        return Friend.findAndCountAll({
            where: {
                invitedid: organizationid,
                match: false
            },
            raw: false
        });
    };
}

module.exports = new OrganizationNotification();
