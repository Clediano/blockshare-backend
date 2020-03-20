const Organization = require('../../services/security/security.organization');
const Address = require('../../services/blockchain/blockchain.address');
const Wallet = require('../../services/organization/organization.wallet');

const Mailer = require('../../config/mailer');

const {mail_user, base_url_frontend} = require('../../config/secret');

class OrganizationController {
    createOrganization(req, res) {
        const {name, type, cpf, cnpj, email} = req.body;

        Organization.create(name, type, cpf, cnpj, email)
            .then(([organization, createdNewRegister]) => {
                if (createdNewRegister) {
                    Address.createNewAddress()
                        .then(({payload: address}) => {
                            Wallet.create(address, organization.id)
                                .then(({dataValues: wallet}) => {
                                    organization.setWallet(wallet);
                                    let message = {
                                        from: mail_user,
                                        to: email,
                                        subject: "Blockshare - Criação de usuário",
                                        text: `Você criou uma organização no Blockshare. Você pode acessar este <a target="_blank" href="${base_url_frontend}/user/${organization.id}">link</a> para concluir o cadastro. Caso não tenha se cadastrado, basta ignorar este e-mail.`,
                                    };
                                    Mailer.sendMail(message, (err, response) => {
                                        if (err) {
                                            Organization.remove(id)
                                                .then(() => {
                                                    return res.status(400).send({message: "Erro na criação do usuário da organização. Tente novamente mais tarde."});
                                                })
                                                .catch(err => {
                                                    return res.status(400).send(err);
                                                });
                                        }
                                        return res.status(200).send({
                                            message: `Um e-mail foi enviado para ${email}.`
                                        });
                                    });
                                })
                                .catch(() => {
                                    Organization.remove(id)
                                        .then(() => {
                                            return res.status(400).send({message: "Erro na criação do usuário da organização. Tente novamente mais tarde."});
                                        })
                                        .catch(err => {
                                            return res.status(400).send(err);
                                        });
                                });
                        })
                        .catch(() => {
                            Organization.remove(id)
                                .then(() => {
                                    return res.status(400).send({message: "Erro na criação do usuário da organização. Tente novamente mais tarde."});
                                })
                                .catch(err => {
                                    return res.status(400).send(err);
                                });
                        });
                } else {
                    return res.status(400).send({
                        message: `O e-mail "${email}" já está sendo usado por outra organização.`
                    });
                }
            })
            .catch(err => {
                return res.status(400).send(err);
            });
    };

}

module.exports = new OrganizationController();
