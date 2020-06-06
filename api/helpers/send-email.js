module.exports = {
  // Usage: await sails.helpers.sendEmail(…, …);

  friendlyName: 'Send email',


  description: '',


  inputs: {
    link: {
      description: 'The target URL',
      example: 'http://www.google.com',
      type: 'string',
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {


    var nodemailer = require("nodemailer");
    
    var Setting = await Setting.findOne();
    Setting = Setting[0];

    // The SMTP server settings 
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: Setting.emailFrom,
        pass: Setting.emailFromPassword
      }
    })


    // Email options
    let mailOptions = {
      from: Setting.emailFrom,
      to: Setting.emailTo,
      subject: "A new web page has changed!",
      text: inputs.link + "has changed!",
      html: inputs.link + "<b>has changed!</b>"
    }

    // Send! 

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("error occurred", err)
      } else {
        console.log("email sent", info)
      }
    })


  }


};

