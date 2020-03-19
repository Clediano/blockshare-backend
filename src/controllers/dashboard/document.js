const Dashboard = require('../../services/dashboard/dashboard.document');

class DashboardController {
    countNumberOfDocumentsNotRegistred(req, res) {
        const {organizationid} = req.params;

        Dashboard.countNumberOfDocumentsNotRegistred(organizationid)
            .then(resp => {
                const now = new Date();
                const aMonthAgo = now.getTime() - 2628000000;

                const sinceLastMonth = resp.rows.filter(doc => {
                    const timestamp = new Date(doc.createdAt).getTime();
                    return timestamp < now && timestamp > aMonthAgo;
                });
                return res.status(200).send({
                    sinceLastMonth: sinceLastMonth.length,
                    documentsCount: resp.count
                })
            })
            .catch(err => {
                return res.status(400).send({
                    message: "Não foi possível buscar os documentos não registrados.",
                    details: err
                });
            })
    }

    countNumberOfDocumentsRegistred(req, res) {
        const {organizationid} = req.params;

        Dashboard.countNumberOfDocumentsRegistred(organizationid)
            .then(resp => {
                const now = new Date();
                const aMonthAgo = now.getTime() - 2628000000;

                const sinceLastMonth = resp.rows.filter(doc => {
                    const timestamp = new Date(doc.createdAt).getTime();
                    return timestamp < now && timestamp > aMonthAgo;
                });
                return res.status(200).send({
                    sinceLastMonth: sinceLastMonth.length,
                    documentsCount: resp.count
                })
            })
            .catch(err => {
                return res.status(400).send({
                    message: "Não foi possível buscar os documentos registrados.",
                    details: err
                });
            })
    }

    countNumberOfFriends(req, res) {
        const {organizationid} = req.params;

        let friendsMatched = 0;
        let friendsWaiting = 0;

        Dashboard.countNumberOfFriends(organizationid)
            .then(resp => {
                resp.rows.forEach(friend => {
                    if (friend.match) {
                        friendsMatched += 1;
                    } else {
                        friendsWaiting += 1;
                    }
                });
                return res.status(200).send({
                    friendsMatched,
                    friendsWaiting,
                    total: resp.count
                })
            })
            .catch(err => {
                return res.status(404).send({error: 'Ocorreu um erro ao contar o número de amigos.', details: err});
            })

    }

    countNumberTotalOfDocuments(req, res) {
        const {organizationid} = req.params;

        Dashboard.countNumberTotalOfDocuments(organizationid)
            .then(resp => {
                return res.send({
                    total: resp.count
                })
            })
            .catch(err => {
                return res.status(400).send({error: 'Ocorreu um erro ao contar o número de documentos.', details: err});
            })
    }

    documentsByPeriod(req, res) {
        const {organizationid} = req.params;
        const {dataInicial, dataFinal} = req.query;

        Dashboard.findDocumentsByPeriod(organizationid, dataInicial, dataFinal)
            .then(resp => {
                res.status(200).send({resp});
            })
            .catch(err => {
                return res.status(400).send({error: 'Ocorreu um erro ao buscar os documentos.', details: err});
            })
    }

}

module.exports = new DashboardController();
