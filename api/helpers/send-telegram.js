module.exports = {


  friendlyName: 'Send telegram',


  description: 'Send notification to a telegram bot',


  inputs: {
    target: {
      description: 'Target url',
      example: 'https://www.google.com/test.js',
      type: 'string',
    },
    charChange: {
      description: 'number of different chars',
      example: 43,
      type: 'number',
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const TelegramBot = require('node-telegram-bot-api');
    let setting = await Setting.find();
    setting = setting[0];

    // replace the value below with the Telegram token you receive from @BotFather
    const token = setting.telegramToken;
    const chatID = setting.telegramChatID;

    // Create a bot that uses
    const bot = new TelegramBot(token);

    let message = inputs.target + ' has update with ' + inputs.charChange + ' different chars';
    bot.sendMessage(chatID, message);
  }


};

