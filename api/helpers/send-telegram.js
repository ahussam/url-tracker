module.exports = {

  friendlyName: 'Send telegram',

  description: 'Send notification to a telegram bot',

  inputs: {
    target: {
      description: 'Target url',
      example: 'https://www.google.com/test.js',
      type: 'string',
      required: true,  // Ensure that target is required
    },
    charChange: {
      description: 'Number of different chars',
      example: 43,
      type: 'number',
      required: true,  // Ensure that charChange is required
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },

    invalidInput: {
      description: 'Invalid input provided.',
      responseType: 'badRequest',
    },

    settingNotFound: {
      description: 'Telegram settings not found in the database.',
      responseType: 'notFound',
    },

    telegramError: {
      description: 'Failed to send message via Telegram.',
      responseType: 'serverError',
    },
  },

  fn: async function (inputs, exits) {
    const TelegramBot = require('node-telegram-bot-api');
    let setting;

    try {
      setting = await Setting.find();
      if (!setting || setting.length === 0) {
        return exits.settingNotFound({ message: 'Telegram settings not found.' });
      }
      setting = setting[0];
    } catch (error) {
      sails.log.error('Error retrieving settings from the database:', error);
      return exits.settingNotFound({ message: 'Error retrieving Telegram settings.' });
    }

    const token = setting.telegramToken;
    const chatID = setting.telegramChatID;

    if (!token || !chatID) {
      sails.log.error('Telegram token or chat ID is missing in settings.');
      return exits.settingNotFound({ message: 'Telegram token or chat ID is missing.' });
    }

    const bot = new TelegramBot(token);

    let message = `${inputs.target} has an update with ${inputs.charChange} different chars`;

    try {
      await bot.sendMessage(chatID, message);
    } catch (error) {
      sails.log.error('Error sending message via Telegram:', error);
      return exits.telegramError({ message: 'Failed to send message via Telegram.' });
    }

    return exits.success();
  }

};
