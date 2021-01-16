module.exports = {


  friendlyName: 'Update settings',


  description: 'Update application settings.',

  inputs: {

    emailFrom: {
      type: 'string'
    },

    emailFromPassword: {
      type: 'string'
    },

    emailTo: {
      type: 'string'
    },

    reportToEmail: {
      type: 'boolean'
    },

    telegramToken: {
      type: 'string'
    },

    telegramChatID: {
      type: 'string'
    },

    reportToTelegram: {
      type: 'boolean'
    }
  },


  fn: async function (inputs) {


    let emailfrom = inputs.emailFrom;
    let emailfrompassword = inputs.emailFromPassword;
    let emailto = inputs.emailTo;
    let reportToEmail = inputs.reportToEmail;
    let telegramToken = inputs.telegramToken;
    let telegramChatID = inputs.telegramChatID;
    let reportToTelegram = inputs.reportToTelegram;


    var updatedRecords =
      await Setting.update({ app: 'this' }).set(

        {
          emailFrom: emailfrom, emailFromPassword: emailfrompassword,
          emailTo: emailto, reportToEmail: reportToEmail, telegramToken: telegramToken,
          telegramChatID: telegramChatID, reportToTelegram: reportToTelegram
        }).fetch();

    if (updatedRecords) {
      return this.res.send('1');

    } else {

      return this.res.send('0');

    }

  }


};
