'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/services.html#core-services)
 * to customize this service
 */

// Public dependencies.
const _ = require('lodash');

// Strapi utilities.
const utils = require('strapi-hook-bookshelf/lib/utils/');
const { convertRestQueryParams, buildQuery } = require('strapi-utils'); 

module.exports = {

 /**
   * Promise to add a/an order.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Order.associations.map(ast => ast.alias));
    const data = _.omit(values, Order.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Order.forge(data).save();

    // Create relational data and return the entry.
    return Order.updateRelations({ id: entry.id , values: relations });
  },

};
