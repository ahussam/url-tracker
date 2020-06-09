module.exports = {


  friendlyName: 'Diff check',


  description: '',


  inputs: {

    res1: {
      description: 'First page',
      example: 'HTML page',
      type: 'string',
    },
    res2: {
      description: 'Second page',
      example: 'HTML page',
      type: 'string',
    },
  },

  exits: {

    success: {
      
    },

  },


  fn: async function (inputs,exits) {

    let leven = require('leven');
    
    let acceptedChange = leven(inputs.res1, inputs.res2);
    
    return exits.success(acceptedChange);
   

  }


};

