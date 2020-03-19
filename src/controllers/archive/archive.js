const Crypto = require('../../helpers/crypto');
const Archive = require('../../services/archive/archive.upload');

const fs = require('fs');

class ArchiveController {
    upload(req, res) {
        fs.readFile(req.file.path, (err, file) => {
            const {filename, mimetype, size} = req.file;

            if (err) {
                return res.status(400).send({message: 'Erro ao ler o arquivo, por favor, tente novamente.'});
            }

            Archive.create({hash: Crypto.hashBuffer(file), filename, mimetype, size, file})
                .then(archive => {
                    fs.unlink(req.file.path, err => {
                        if (err) {
                            console.error('Erro ao deletar a imagem.', err);
                        }
                    });
                    return res.status(200).send(archive);
                })
                .catch(err => {
                    return res.status(400).send({
                        message: 'Erro ao salvar o arquivo, por favor, tente novamente.',
                        details: err
                    });
                });
        });
    };

    findById(req, res) {
        const {id} = req.params;

        Archive.findById(id)
            .then(archive => {
                return res.status(200).send(archive);
            })
            .catch(err => {
                return res.status(400).send({message: 'Arquivo não encontrado.'});
            })
    };

    delete(req, res) {
        const {id} = req.params;

        Archive.findById(id)
            .then(() => {
                Archive.deleteOne({_id: {$eq: id}})
                    .then(() => {
                        return res.status(200).send();
                    })
                    .catch(err => {
                        return res.status(400).send(err);
                    })
            })
            .catch(() => {
                return res.status(400).send({message: 'Arquivo não encontrado.'});
            });
    };
}


module.exports = new ArchiveController();
