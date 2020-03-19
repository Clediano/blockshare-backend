const User = require('../../services/security/security.user');
const Archive = require('../../services/archive/archive.upload');
const Crypto = require('../../helpers/crypto');

const fs = require('fs');

class OrganizationAvatarController {

    updateAvatar(req, res) {
        fs.readFile(req.file.path, async (err, file) => {

            const {filename, mimetype, size} = req.file;
            const email = req.userEmail;

            if (err) {
                return res.status(400).send({message: 'Erro ao ler o arquivo, por favor, tente novamente.'});
            }

            Archive.create({hash: Crypto.hashBuffer(file), filename, mimetype, size, file})
                .then(archive => {
                    fs.unlink(req.file.path, err => {
                        if (err) {
                            Archive.remove(archive._id.toHexString());
                            return res.status(400).send({
                                message: 'Ocorreu um erro ao criar uma nova transação.',
                                details: err
                            });
                        }
                    });

                    User.updateAvatar(archive._id.toHexString(), email)
                        .then(resp => {
                            return res.status(200).send(archive);
                        })
                        .catch(err => {
                            Archive.remove(archive._id.toHexString());
                            return res.status(400).send({message: 'Ocorreu um erro ao salvar o avatar.', details: err});
                        })
                })
                .catch(err => {
                    return res.status(400).send({
                        message: 'Erro ao salvar o arquivo, por favor, tente novamente.',
                        details: err
                    });
                });
        });
    }

    removeAvatar(req, res) {
        const {avatarid} = req.params;

        Archive.remove(avatarid)
            .then(resp => {
                return res.status(200).send(resp);
            })
            .catch(err => {
                return res.status(400).send({message: 'Não foi possível remover o avatar do usuário.', details: err});
            })
    }

}

module.exports = new OrganizationAvatarController();
