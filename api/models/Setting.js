/**
 * Setting.js
 */

module.exports = {

  attributes: {


    app: {
      type: 'string',
      defaultsTo: 'this',
    },


    emailFrom: {
      type: 'string',
      example: 'mytest@gmail.com',
      required: true
    },

    emailFromPassword: {
      type: 'string',
      required: true,
      example: 'kjfijhsdiuhf@!#!@#!XZXFGFJCXCZ'
    },

    emailTo: {
      type: 'string',
      required: true
    },

    reportToEmail: {
      type: 'boolean',
      defaultsTo: false,
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
