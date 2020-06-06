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
  },


  fn: async function (inputs) {
    

    let emailfrom = inputs.emailFrom;
    let emailfrompassword = inputs.emailFromPassword;
    let emailto = inputs.emailTo;
    let reporttoemail = inputs.reportToEmail;

    var updatedRecords =
      await Setting.update({ app: 'this' }).set(

        {
          emailFrom: emailfrom, emailFromPassword: emailfrompassword,
          emailTo: emailto, reportToEmail: reporttoemail
        }).fetch();

    if (updatedRecords) {
      return this.res.send("1");

    } else {

      return this.res.send("0");

    }

  }


};
