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

    // Check if there is setting in DB else insert the default data
    let settings = await Setting.find();

    if(settings.length === 0){
      var createdSetting = await Setting.create(
        {
          app: 'this',
          emailFrom: 'invalid!@gmail.com',
          emailFromPassword: '123456',
          emailTo: 'invalid2!@gmail.com',
          reportToEmail: false
        }).fetch();



      if(createdSetting){
      // console.log("Default setting has been created!");
      }

    }

    let data = await Setting.findOne({app:'this'});

    let emailFrom = data.emailFrom;
    let emailFromPassword = data.emailFromPassword;
    let emailTo = data.emailTo;
    let reportToEmail = data.reportToEmail;


    return {
      emailFrom: emailFrom,
      emailFromPassword: emailFromPassword,
      emailTo: emailTo,
      reportToEmail:reportToEmail
    };
  }

};
