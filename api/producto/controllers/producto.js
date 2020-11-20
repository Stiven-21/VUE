'use strict';
const { parseMultipartData, sanitizeEntity} = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    me: async (ctx) => {
        const user = ctx.state.user
        
        let producto = await strapi.services.producto.find({
            user: user.id
        })

        ctx.send(producto)
    },
    async create(ctx) {
        let entity;
        const user = ctx.state.user

        if(ctx.is('multipart')){
            const { data, files } = parseMultipartData(ctx)

            data.user = user.id

            entity = await strapi.services.producto.create(data, {
                files,
            });
        }else{
            const data =ctx.request.body

            data.user = user.id
            entity = await strapi.services.producto.create(data);
        }
        return sanitizeEntity(entity, { model: strapi.models.producto });
    },
};

