const Search = require('../../services/organization/organization.search');

class OrganizationNotificationController {

    findById(req, res) {
        const { organizationid } = req.params;

        Search.findOrganizationById(organizationid)
            .then(resp => {
                return res.status(200).send(resp);
            })
            .catch(err => {
                return res.status(400).send(err);
            })
    }

    findByName(req, res) {
        const { organizationid, text, offset, limit } = req.params;

        Search.findOrganizationByName(organizationid, text, offset, limit)
            .then(resp => {
                const already = resp.organizationsAlreadyInvitedForMe;
                resp.organizations
                    .then(result => {
                        const filtredOrgs = result.rows.map((organization) => {
                            return {
                                ...organization.dataValues,
                                match: already.includes(organization.id)
                            }
                        })
                        return res.status(200).send({ rows: filtredOrgs, count: result.count });
                    })
                    .catch(err => {
                        return res.status(400).send(err);
                    })
            })
            .catch(err => {
                return res.status(400).send(err);
            })

    };

    findByAddress(req, res) {
        const { organizationid, text, offset, limit } = req.params;

        Search.findOrganizationByAddress(organizationid, text, offset, limit)
            .then(resp => {
                return res.status(200).send(resp);
            })
            .catch(err => {
                return res.status(400).send(err);
            })
    };

}

module.exports = new OrganizationNotificationController();
