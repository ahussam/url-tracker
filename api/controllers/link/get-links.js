module.exports = {

  friendlyName: 'Get targets',

  description: 'Get an array of targets from MongoDB.',

  exits: {
    success: {
      description: 'Targets were retrieved successfully.',
    },
    error: {
      description: 'An error occurred while retrieving targets.',
    }
  },

  fn: async function () {
    try {
      var targets = await Target.find();

      if (!targets || targets.length === 0) {
        sails.log.warn('No targets found.');
      }

      return this.res.send(targets);
    } catch (error) {
      sails.log.error('Error retrieving targets:', error);
      return this.res.status(500).send('An error occurred while retrieving targets.');
    }
  }
};
