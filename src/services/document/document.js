const DocumentPersistence = require('../../database/postgres/models').document;

class Document {

    create(oidarchive, organizationid) {
        return DocumentPersistence.create({oidarchive, organizationid});
    };

    remove(id) {
        return DocumentPersistence.destroy({where: {id}});
    }
}

module.exports = new Document();
