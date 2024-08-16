module.exports = {
  friendlyName: 'Add Link',

  description: 'Add new link to the system.',

  fn: async function () {
    const validURL = (str) => {
      var pattern = new RegExp(
        '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
        'i'
      );
      return !!pattern.test(str);
    };

    try {
      let bulk = this.req.body.bulkAdd;
      let targets = [];
      if (bulk) {
        targets = this.req.body.links.split('\n');
      } else {
        let link = this.req.body.link;
        targets.push(link);
      }

      for (let link of targets) {
        let desc = this.req.body.description;
        let fetchEvery = this.req.body.fetchEvery;
        let keywords = this.req.body.keywords || '';
        let acceptedChange = this.req.body.acceptedChange || '';
        let cookie = this.req.body.cookie || '';

        if (!desc || !link || !fetchEvery) {
          return this.res.status(400).send('Required fields missing.');
        }

        if (!validURL(link.trim())) {
          return this.res.status(400).send('Invalid URL.');
        }

        // Schedule the job using Agenda to run in 1 second
        try {
          await sails.config.agenda.schedule('in 1 second', 'process link', {
            link, desc, fetchEvery, keywords, acceptedChange, cookie
          });
          sails.log(`Scheduled job to process link: ${link} in 1 second`);
        } catch (error) {
          sails.log.error('Error scheduling job:', error);
          return this.res.status(500).send('Error scheduling job.');
        }
      }

      return this.res.status(200).send('Links scheduled for processing in 1 second.');
    } catch (error) {
      sails.log.error('An unexpected error occurred:', error);
      return this.res.status(500).send('An unexpected error occurred.');
    }
  },
};
