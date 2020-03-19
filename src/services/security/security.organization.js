const Organization = require('../../database/postgres/models').organization;

class SecurityOrganization {

    /**
     * @param name, type, cpf, cnpj, email
     * @returns {Promise<[Model, boolean]>}
     */
    create(name, type, cpf, cnpj, email) {
        return Organization.findOrCreate({
            where: {email},
            defaults: {name, type, cpf, cnpj, email}
        });
    }

    remove(id) {
        return Organization.destroy({where: {id}});
    }

}

module.exports = new SecurityOrganization();
