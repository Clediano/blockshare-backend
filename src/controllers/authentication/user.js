const User = require('../../services/security/security.user');

const Permission = require('../../database/postgres/models').permission;

const AuthenticationToken = require('../../services/security/security.token');

class UserController {
    createUser(req, res) {
        const {organizationid} = req.params;
        const {name, email, password} = req.body;

        User.create(name, email, password, organizationid)
            .then(([user, createNewRegister]) => {
                if (createNewRegister) {
                    Permission.findAll()
                        .then(permissions => {
                            user.setPermissions(permissions)
                                .then(() => {
                                    return res.status(200).send(user);
                                })
                                .catch(() => {
                                    User.remove(user.dataValues.id)
                                        .then(() => {
                                            return res.status(400).send({message: 'Ocorreu um erro ao criar o usuário.'})
                                        })
                                        .catch(err => {
                                            return res.status(400).send(err);
                                        });
                                });
                        })
                        .catch(err => {
                            return res.status(400).send(err);
                        });
                } else {
                    return res.status(400).send({message: 'Este e-mail já está sendo usado por outro usuário.'});
                }
            })
            .catch(err => {
                return res.send(err);
            });
    };

    authenticate(req, res) {
        const {email, password} = req.body;

        User.authenticate(email, password)
            .then(user => {
                if (user) {
                    const token = AuthenticationToken.generateToken({
                        user: user.email,
                        organization: user.organizationid
                    });
                    return res.status(200).send({
                        token: token,
                        oidphoto: user.oidphoto,
                        name: user.name,
                        email: user.email,
                        address: user.organization.wallet.address,
                        organization: user.organizationid,
                        authorization: user.permissions.map(permission => {
                            return {name: permission.name, description: permission.description}
                        })
                    });
                } else {
                    return res.status(400).send({message: 'Nenhum usuário encontrado.'});
                }
            })
            .catch(err => {
                return res.status(400).send(err);
            });
    };

    listUsers(req, res) {
        const {organizationid} = req.params;

        User.listUsers(organizationid)
            .then(users => {
                return res.status(200).send(users);
            })
            .catch(err => {
                return res.status(400).send({
                    message: "Não foi possível listar os usuários da organização.",
                    details: err
                });
            })
    };
}

module.exports = new UserController();
