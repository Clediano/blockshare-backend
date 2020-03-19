const Archive = require('../../database/mongo/models/archive');

class ArchiveUpload {

    create({hash, filename, mimetype, size, file}) {
        return Archive.create({hash, filename, mimetype, size, file});
    };

    findById(id) {
        return Archive.findById(id);
    };

    remove(id) {
        return Archive.deleteOne({ _id: { $eq: id } });
    }

}

module.exports = new ArchiveUpload();
