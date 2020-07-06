module.exports = {

  // Cron fetch function

  run: async function (period) {

    let fs = require('fs');

    let targets = await Target.find({ fetchEvery: period });
    let setting = await Setting.find();
    setting = setting[0];

    if (targets.length === 0) {

      return;
    }

    targets.forEach(async (target) => {

      // Send new request

      let response = await sails.helpers.sendRequest(target.link, target.cookie);


      // Check if the response contains a keyword from the DB

      if (target.keywords !== '') {

        let keywords = target.keywords.split(',');

        keywords.forEach(async (keyword) => {

          if (response.indexOf(keyword) > -1) {

            await Target.updateOne({ id: target.id })
              .set({
                status: 'changed'
              });

            process.exit();

          }

        });
      }


      // Get the last response file

      let responseFile = 'responses/' + target.id + '.txt';

      var lastResponseBody = fs.readFileSync(responseFile, 'utf8', (err) => {
        if (err) {
          throw err;
        }
      });

      // find number of differences between response and lastResponseBody file

      let acceptedChange = await sails.helpers.diffCheck(response, lastResponseBody);

      // sails.log(acceptedChange);

      // Check if the new acceptedChange is higher than the user input

      if (acceptedChange > target.acceptedChange) {


        let n = response; // n for new
        let o = lastResponseBody; // o for old


        // Get diff highlight text

        let diff = await sails.helpers.diffHighlight(o, n);

        // Create file for the diffHighlight text

        let diffFile = 'responses/diffs/' + target.id + '.txt';

        // Save diffHighlight into file

        fs.writeFile(diffFile, diff, (err) => {
          if (err) {throw err;}
          console.log('Saved!');
        });


        // Check if user want to be repoted via email

        if (setting.reportToEmail) {

          await sails.helpers.sendEmail(target.link);

        }

        // Update database

        var updatedTarget = await Target.updateOne({ id: target.id })
          .set({
            status: 'changed'
          });

        // Update response file with the new content

        fs.writeFile(responseFile, response, (err) => {
          if (err) {throw err;}
          console.log('Response file is up-to-date.');
        });


        if (updatedTarget) {
          // sails.log('Updated');
        }

      }


    });

  }
};
