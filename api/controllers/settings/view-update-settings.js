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

    let emailFrom = data.emailFrom
    let emailFromPassword = data.emailFromPassword
    let emailTo = data.emailTo 
    let reportToEmail = data.reportToEmail
    
    
    
    return {
      emailFrom: emailFrom,
      emailFromPassword: emailFromPassword,
      emailTo: emailTo,
      reportToEmail:reportToEmail
    };
  }

};
