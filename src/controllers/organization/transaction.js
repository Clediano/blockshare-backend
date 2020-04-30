const Crypto = require('../../helpers/crypto');
const BlockchainTransaction = require('../../services/blockchain/blockchain.transaction');
const DocumentTransaction = require('../../services/document/document.transaction');
const Archive = require('../../services/archive/archive.upload');
const Document = require('../../services/document/document');
const Mailer = require('../../helpers/mailer');
const fs = require('fs');

class TransactionController {

    createTransaction(req, res) {
        fs.readFile(req.file.path, async (err, file) => {

            const {filename, mimetype, size} = req.file;
            const organization = req.organizationid;

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

                    BlockchainTransaction.newTransaction({data: archive.hash}, organization)
                        .then(({payload: transaction}) => {
                            Document.create(archive._id.toHexString(), organization)
                                .then(({dataValues: document}) => {
                                    DocumentTransaction.create({
                                        txid: transaction.txid,
                                        confirmations: 0,
                                        confirmed: false,
                                        hash: archive.hash,
                                        documentid: document.id
                                    }).then(({dataValues: organizationTransaction}) => {
                                        return res.status(200).send(organizationTransaction);
                                    }).catch(err => {
                                        return res.status(400).send({
                                            message: 'Ocorreu um erro ao criar o documento.',
                                            details: err
                                        });
                                    })
                                })
                                .catch(err => {
                                    return res.status(400).send({
                                        message: 'Erro ao registrar o documento.',
                                        details: err
                                    });
                                });
                        })
                        .catch(err => {
                            return res.status(400).send({
                                message: 'Erro ao salvar o arquivo. Por favor verifique o saldo da sua carteira e tente novamente.',
                                details: err
                            });
                        });
                })
                .catch(err => {
                    return res.status(400).send({
                        message: 'Erro ao salvar o arquivo, por favor, tente novamente.',
                        details: err
                    });
                });
        });
    }

    createTransactionAndShareDocument(req, res) {
        const Transaction = new TransactionController();
        Transaction.createTransaction(req, res);

        const { emails } = req.body;

        const arrayEmail = emails.split(",");
        const attachment = {
            filename: req.file.filename,
            path: req.file.path
        };
        
        Mailer.sendEmail(arrayEmail, attachment, 'Olha, você recebeu um novo documento! 😲😲', 'O documento recebido se encontra em anexo. Calma, não fique ancioso, ele não vai fugir!!!');

    }

    getTransaction(req, res) {
        BlockchainTransaction.getTransaction(req.params.txid)
            .then(transaction => {
                return transaction;
            })
            .catch(err => {
                return res.send(err);
            })
    };

    getTransactionFee(req, res) {
        BlockchainTransaction.getTransactionsFee()
            .then(transaction => {
                return res.status(200).send(transaction);
            })
            .catch(err => {
                return res.status(400).send(err);
            })
    };

    getAllTransactions(req, res) {
        const {organizationid, offset, limit} = req.params;
        DocumentTransaction.findAll(organizationid, offset, limit)
            .then(transactions => {
                return res.status(200).send(transactions);
            })
            .catch(err => {
                return res.status(400).send({
                    message: 'Ocorreu um erro ao buscar as transações da organização.',
                    details: err
                });
            })
    };

    findTransactionByTxid(req, res) {
        const {organizationid, text} = req.params;

        DocumentTransaction.findByTxid(organizationid, text)
            .then(resp => {
                return res.status(200).send(resp);
            })
            .catch(err => {
                return res.status(400).send(err);
            })
    };

}

module.exports = new TransactionController();
