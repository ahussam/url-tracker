module.exports = {


  friendlyName: 'View main page',


  description: 'Display the dashboard "main" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/main',
      description: 'Display the main page for authenticated users.'
    },

  },


  fn: async function () {
    
    var targets = await Target.find();

    return {targets};

  }


};