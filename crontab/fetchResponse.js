module.exports = {

  // Cron fetch function
  run: async function (period) {
    const fs = require('fs');

    let targets;
    let setting;

    try {
      targets = await Target.find({ fetchEvery: period });
      setting = await Setting.find();
      if (setting.length === 0) {
        sails.log.error('Settings not found.');
        return;
      }
      setting = setting[0];
    } catch (error) {
      sails.log.error('Error fetching targets or settings from the database:', error);
      return;
    }

    if (targets.length === 0) {
      sails.log('No targets found for the given period.');
      return;
    }

    targets.forEach(async (target) => {
      try {
        // Send new request
        let response = await sails.helpers.sendRequest(target.link, target.cookie);

        // Check if the response contains a keyword from the DB
        if (target.keywords !== '') {
          let keywords = target.keywords.split(',');

          for (const keyword of keywords) {
            if (response.indexOf(keyword) > -1) {
              try {
                await Target.updateOne({ id: target.id }).set({
                  status: 'changed'
                });
              } catch (error) {
                sails.log.error(`Error updating target status for keyword match (Target ID: ${target.id}):`, error);
              }
            }
          }
        }

        // Get the last response file
        let responseFile = 'responses/' + target.id + '.txt';

        let lastResponseBody;
        try {
          lastResponseBody = fs.readFileSync(responseFile, 'utf8');
        } catch (error) {
          sails.log.error(`Error reading last response file for target ID ${target.id}:`, error);
          return;
        }

        // Find number of differences between response and lastResponseBody file
        let acceptedChange;
        try {
          acceptedChange = await sails.helpers.diffCheck(response, lastResponseBody);
        } catch (error) {
          sails.log.error(`Error performing diff check for target ID ${target.id}:`, error);
          return;
        }

        // Check if the new acceptedChange is higher than the user input
        if (acceptedChange > target.acceptedChange) {

          // Get diff highlight text
          let diff;
          try {
            diff = await sails.helpers.diffHighlight(lastResponseBody, response);
          } catch (error) {
            sails.log.error(`Error generating diff highlight for target ID ${target.id}:`, error);
            return;
          }

          // Create file for the diffHighlight text
          let diffFile = 'responses/diffs/' + target.id + '.txt';

          // Save diffHighlight into file
          try {
            fs.writeFileSync(diffFile, diff);
            console.log('Diff file saved successfully.');
          } catch (error) {
            sails.log.error(`Error saving diff file for target ID ${target.id}:`, error);
            return;
          }

          // Check if user wants to be reported via email
          if (setting.reportToEmail) {
            try {
              await sails.helpers.sendEmail(target.link);
            } catch (error) {
              sails.log.error(`Error sending email notification for target ID ${target.id}:`, error);
            }
          }

          // Check if user wants to be reported via telegram
          if (setting.reportToTelegram) {
            try {
              await sails.helpers.sendTelegram(target.link, acceptedChange);
            } catch (error) {
              sails.log.error(`Error sending Telegram notification for target ID ${target.id}:`, error);
            }
          }

          // Update database
          try {
            var updatedTarget = await Target.updateOne({ id: target.id }).set({
              status: 'changed'
            });

            if (updatedTarget) {
              sails.log(`Target ID ${target.id} status updated to 'changed'.`);
            }
          } catch (error) {
            sails.log.error(`Error updating target in database for target ID ${target.id}:`, error);
            return;
          }

          // Update response file with the new content
          try {
            fs.writeFileSync(responseFile, response);
            console.log('Response file is up-to-date.');
          } catch (error) {
            sails.log.error(`Error updating response file for target ID ${target.id}:`, error);
          }
        }

      } catch (error) {
        sails.log.error(`Error processing target ID ${target.id}:`, error);
      }
    });

  }
};
