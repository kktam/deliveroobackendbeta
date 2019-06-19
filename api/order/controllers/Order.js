'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")("sk_test_m1jtku3UIo5rKCMch9M1gUt500NoYdVPsH");

module.exports = {

    /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async ctx => {
    const { address, amount, dishes, token, city } = ctx.request.body;

    //console.log("ctx.state: %j", ctx.state);  

    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: amount * 100,
      currency: "usd",
      description: `Order ${new Date()} by ${ctx.state.user.id}`,
      source: token
    });

    //console.log("stripe has been charged"); 

    // Register the order in the database
    const order = await strapi.services.order.add({
      user: ctx.state.user.id,
      address,
      amount,
      dishes,
      city
    });

    //console.log("called strapi add order record");    

    return order;
  },

};
