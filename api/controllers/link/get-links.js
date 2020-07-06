module.exports = {


  friendlyName: 'Get targets',


  description: 'Get an array of tagers from mongodb.',


  exits: {

    success: {

    },

  },


  fn: async function () {

    var targets = await Target.find();

    return this.res.send(targets);

  }


};
