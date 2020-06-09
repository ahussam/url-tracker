module.exports = {


  friendlyName: 'Send request',


  description: '',


  inputs: {

    link: {
      description: 'The target URL',
      example: 'http://www.google.com',
      type: 'string',
    },

    cookie: {
      description: 'The target URL',
      example: 'user_id=1234',
      type: 'string',
    },
  },


  exits: {

    success: {

    },

  },


  fn: async function (inputs, exits) {

    var request = require('request');

    request.get({
      url: inputs.link,
      header: {
        'cookie': inputs.cookie
      }
    }, (error, response) => {
      if (error) {
        //sails.log.error(error);
        return;
      }
      else {
        // Get response body
        // sails.log(response.body);
        return exits.success(response.body);


      }
    });

  }


};

