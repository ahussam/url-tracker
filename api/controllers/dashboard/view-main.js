module.exports = {

  friendlyName: 'View main page',

  description: 'Display the dashboard "main" page.',

  exits: {
    success: {
      viewTemplatePath: 'pages/dashboard/main',
      description: 'Display the main page for authenticated users.'
    },
    error: {
      description: 'An error occurred while fetching the targets or rendering the page.',
    }
  },

  fn: async function () {
    try {
      var targets = await Target.find();

      // Check if targets were retrieved successfully
      if (!targets) {
        sails.log.warn('No targets found, returning an empty array.');
      }

      return { targets };

    } catch (error) {
      sails.log.error('Error retrieving targets or rendering the main page:', error);
      throw 'error';
    }
  }

};
