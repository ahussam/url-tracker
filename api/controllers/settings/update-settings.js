module.exports = {

  friendlyName: 'Update settings',

  description: 'Update application settings.',

  inputs: {
    telegramToken: {
      type: 'string',
      required: true
    },
    telegramChatID: {
      type: 'string',
      required: true
    },
    reportToTelegram: {
      type: 'boolean',
      required: true
    }
  },

  fn: async function (inputs) {
    try {
      let telegramToken = inputs.telegramToken;
      let telegramChatID = inputs.telegramChatID;
      let reportToTelegram = inputs.reportToTelegram;

      // Attempt to update the settings
      var updatedRecords = await Setting.update({ app: 'this' }).set({
        telegramToken: telegramToken,
        telegramChatID: telegramChatID,
        reportToTelegram: reportToTelegram
      }).fetch();

      // Check if any records were updated
      if (updatedRecords.length > 0) {
        return this.res.send('1');  // Successfully updated
      } else {
        return this.res.status(404).send('No records updated');  // No records found to update
      }

    } catch (error) {
      // Log the error and send an error response
      sails.log.error('Error updating settings:', error);
      return this.res.status(500).send('An error occurred while updating settings');
    }
  }
};
