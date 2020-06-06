module.exports = {


  friendlyName: 'Send request',


  description: '',


  inputs: {

    link: {
      description: 'The target URL',
      example: 'http://www.google.com',
      type: 'string',
    },
  },


  exits: {

    success: {

    },

  },


  fn: async function (inputs, exits) {

    var request = require('request');
    var crypto = require('crypto');
    var hashBody = "";

    request.get({
      url: inputs.link
    }, function (error, response) {
      if (error) {
        sails.log.error(error);
        return;
      }
      else {
        // sails.log(response.body);
        hashBody += crypto.createHash('md5').update(response.body).digest("hex");
        return exits.success(hashBody);

      }
    });

  }


};

