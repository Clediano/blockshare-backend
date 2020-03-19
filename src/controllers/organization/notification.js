const Notification = require('../../services/organization/organization.notification');

class OrganizationNotificationController {

    searchAll(req, res) {
        const {organizationid} = req.params;

        Notification.findAllNotifications(organizationid)
            .then(interesteds => {
                return res.status(200).send(interesteds);
            })
            .catch(err => {
                return res.status(400).send({message: "Não foi possível buscar as organizações.", details: err});
            })
    };

    acceptSolicitaion(req, res) {
        const {notificationid} = req.params;

        Notification.acceptSolicitation(notificationid)
            .then(resp => {
                return res.status(200).send(resp);
            })
            .catch(err => {
                return res.status(400).send({message: "Ocorreu um erro ao aceitar a solicitação.", details: err});
            })
    };

    rejectSolicitaion(req, res) {
        const {notificationid} = req.params;

        Notification.rejectSolicitation(notificationid)
            .then(resp => {
                return res.status(200).send(resp);
            })
            .catch(err => {
                return res.status(400).send({message: "Ocorreu um erro ao rejeitar a solicitação.", details: err});
            })
    };

    countNotifications(req, res) {
        const {organizationid} = req.params;

        Notification.countAllNotification(organizationid)
            .then(resp => {
                return res.status(200).send({ count: resp.count });
            })
            .catch(err => {
                return res.status(400).send({message: "Ocorreu um erro ao buscar as notificações.", details: err});
            })
    }

}

module.exports = new OrganizationNotificationController();
