module.exports = {


  friendlyName: 'View edit profile',


  description: 'Display "Edit profile" page.',


  exits: {

    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/edit-settings',

    }

  },


  fn: async function () {

    let data = await Setting.findOne({app:'this'});

    let reportToTelegram = data.reportToTelegram;
    let telegramToken = data.telegramToken;
    let telegramChatID = data.telegramChatID;


    return {
      reportToTelegram: reportToTelegram,
      telegramToken: telegramToken,
      telegramChatID:telegramChatID
    };
  }

};
