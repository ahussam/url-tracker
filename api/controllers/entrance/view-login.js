module.exports = {


  friendlyName: 'View login',


  description: 'Display "Login" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/login',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      responseType: 'redirect'
    }

  },


  fn: async function () {

    let users = await User.find();

    // Check if there is user in DB if not insert the default data

    if (users.length === 0) {

      var createFirstUser = await User.create({
        emailAddress: "admin@example.com",
        emailStatus: "confirmed",
        password: "$2a$10$dnfLLl.5HC16klqNPQ/44.I5BgO/p2JasxuuPTQITapp1cklzveLy",
        fullName: "First User",
      }).fetch();

      if (createFirstUser) {
        //  console.log("First user has been created!");
      }

    }

    sails.log(users.length);


    if (this.req.me) {
      throw { redirect: '/' };
    }

    return {};

  }


};
