'use strict';
const { parseMultipartData, sanitizeEntity} = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    me: async (ctx) => {
        const user = ctx.state.user
        
        let foto = await strapi.services.foto.find({
            user: user.id
        })

        ctx.send(foto)
    },
    async create(ctx) {
        let entity;
        const user = ctx.state.user

        if(ctx.is('multipart')){
            const { data, files } = parseMultipartData(ctx)

            data.user = user.id

            entity = await strapi.services.foto.create(data, {
                files,
            });
        }else{
            const data =ctx.request.body

            data.user = user.id
            entity = await strapi.services.foto.create(data);
        }
        return sanitizeEntity(entity, { model: strapi.models.foto });
    },
};
