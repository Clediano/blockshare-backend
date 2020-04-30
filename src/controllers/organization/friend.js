const Friend = require('../../services/organization/organization.friend');

class OrganizationNotificationController {

    sendInvite(req, res) {
        const { invitedid, interestedid } = req.body;

        Friend.sendSolicitation(invitedid, interestedid)
            .then(resp => {
                return res.status(200).send(resp);
            })
            .catch(err => {
                return res.status(400).send({
                    message: "Não foi possível enviar uma solicitação para a organização.",
                    details: err
                });
            })
    };

    findAllSharedOrganizations(req, res) {
        const { organizationid, offset, limit } = req.params;

        Friend.findAllSharedOrganizations(organizationid, offset, limit)
            .then(friends => {
                return res.status(200).send(friends);
            })
            .catch(err => {
                return res.status(400).send({
                    message: 'Ocorreu um erro ao localizar seus contatos pareados.',
                    details: err
                });
            })
    };

    findAllSharedEmailOrganizations(req, res) {
        const { organizationid, offset, limit } = req.params;

        Friend.findAllSharedEmailOrganizations(organizationid, offset, limit)
            .then(friends => {
                return res.status(200).send(friends);
            })
            .catch(err => {
                return res.status(400).send({
                    message: 'Ocorreu um erro ao localizar seus contatos pareados.',
                    details: err
                });
            })
    };

    findSharedOrganizationByName(req, res) {
        const { organizationid, text, offset, limit } = req.params;

        Friend.findSharedOrganizationByName(organizationid, text, offset, limit)
            .then(friends => {
                return res.status(200).send(friends);
            })
            .catch(err => {
                return res.status(400).send({
                    message: 'Ocorreu um erro ao localizar seus contatos pareados.',
                    details: err
                });
            })
    };

    findSharedOrganizationByEmail(req, res) {
        const { organizationid, text, offset, limit } = req.params;

        Friend.findSharedOrganizationByEmail(organizationid, text, offset, limit)
            .then(friends => {
                return res.status(200).send(friends);
            })
            .catch(err => {
                return res.status(400).send({
                    message: 'Ocorreu um erro ao localizar seus contatos pareados.',
                    details: err
                });
            })
    };
}

module.exports = new OrganizationNotificationController();
