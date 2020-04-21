
// -> '0 */1 * * *' : “At minute 0 past every hour.”.
// -> '*/10 * * * *' : “At every 10th minute.”
cron.schedule('0 */1 * * *', async () => {
    try {
        const organizations = await Organization.findAll({include: [{association: 'users'}]});

        organizations && organizations.map(({dataValues: organization}) => {
            if (organization.users && organization.users.length === 0) {
                let dataCriacao = new Date(organization.createdAt).getTime();
                let dataAtual = new Date().getTime();

                if((dataAtual - dataCriacao) < 86400000) { //faz mais de 1 dia que criou a conta
                    Organization.destroy({
                        where: {id: organization.id}
                    });
                }
            }
        });
    } catch (err) {
        console.log(err)
    }
});



