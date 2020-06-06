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



  }
};