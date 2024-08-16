/**
 * Setting.js
 */

module.exports = {

  attributes: {

    app: {
      type: 'string',
      defaultsTo: 'this',
    },
    reportToTelegram: {
      type: 'boolean',
      defaultsTo: false,
    },

    telegramToken: {
      type: 'string',
      defaultsTo: '',
    },

    telegramChatID: {
      type: 'string',
      defaultsTo: '',
    },
  }
};
