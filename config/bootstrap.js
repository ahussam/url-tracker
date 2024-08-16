/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // Import dependencies
  var path = require('path');

  // This bootstrap version indicates what version of fake data we're dealing with here.
  var HARD_CODED_DATA_VERSION = 0;

  // This path indicates where to store/look for the JSON file that tracks the "last run bootstrap info"
  // locally on this development computer (if we happen to be on a development computer).
  var bootstrapLastRunInfoPath = path.resolve(sails.config.appPath, '.tmp/bootstrap-version.json');

  // Whether or not to continue doing the stuff in this file (i.e. wiping and regenerating data)
  // depends on some factors:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // If the hard-coded data version has been incremented, or we're being forced
  // (i.e. `--drop` or `--environment=test` was set), then run the meat of this
  // bootstrap script to wipe all existing data and rebuild hard-coded data.
  if (sails.config.models.migrate !== 'drop' && sails.config.environment !== 'test') {
    // If this is _actually_ a production environment (real or simulated), or we have
    // `migrate: safe` enabled, then prevent accidentally removing all data!
    if (process.env.NODE_ENV==='production' || sails.config.models.migrate === 'safe') {
      sails.log('Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "'+sails.config.environment+'" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...');
      return;
    }//•

    // Compare bootstrap version from code base to the version that was last run
    var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath)
    .tolerate('doesNotExist');// (it's ok if the file doesn't exist yet-- just keep going.)

    if (lastRunBootstrapInfo && lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION) {
      sails.log('Skipping v'+HARD_CODED_DATA_VERSION+' bootstrap script...  (because it\'s already been run)');
      sails.log('(last run on this computer: @ '+(new Date(lastRunBootstrapInfo.lastRunAt))+')');
      return;
    }//•

    sails.log('Running v'+HARD_CODED_DATA_VERSION+' bootstrap script...  ('+(lastRunBootstrapInfo ? 'before this, the last time the bootstrap ran on this computer was for v'+lastRunBootstrapInfo.lastRunVersion+' @ '+(new Date(lastRunBootstrapInfo.lastRunAt)) : 'looks like this is the first time the bootstrap has run on this computer')+')');
  }
  else {
    sails.log('Running bootstrap script because it was forced...  (either `--drop` or `--environment=test` was used)');
  }

  // Since the hard-coded data version has been incremented, and we're running in
  // a "throwaway data" environment, delete all records from all models.
  for (let identity in sails.models) {
    await sails.models[identity].destroy({});
  }//∞

  // By convention, this is a good place to set up fake data during development.
  // await User.createEach([
  //   { emailAddress: 'admin@example.com', fullName: 'First user', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('abc123') },
  // ]);

  // await Setting.create({
  //   app: 'this',
  //   reportToTelegram: false,
  //   telegramToken: '',
  //   telegramChatID: '',
  // });


  // Save new bootstrap version
  await sails.helpers.fs.writeJson.with({
    destination: bootstrapLastRunInfoPath,
    json: {
      lastRunVersion: HARD_CODED_DATA_VERSION,
      lastRunAt: Date.now()
    },
    force: true
  })
  .tolerate((err)=>{
    sails.log.warn('For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `'+sails.config.appPath+'`.  Full error details: '+err.stack+'\n\n(Proceeding anyway this time...)');
  });

};

var Agenda = require('agenda');
var schedule = require('node-schedule');

module.exports.bootstrap = async function(done) {

  let usersCount = User.count();
  if(usersCount === 0){
    await User.createEach([
      { emailAddress: 'admin@example.com', fullName: 'First user', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('9TMhdaUSEzksEXF') },
    ]);
    await Setting.create({
      app: 'this',
      reportToTelegram: false,
      telegramToken: '',
      telegramChatID: '',
    });
  }

  _.extend(sails.hooks.http.app.locals, sails.config.http.locals);
  sails.config.crontab.crons().forEach((item) => {
    schedule.scheduleJob(item.interval,sails.config.crontab[item.method]);
  });

  const mongoConnectionString = 'mongodb://127.0.0.1/agenda';

  const agenda = new Agenda({ db: { address: mongoConnectionString } });

  // Define a sample job (you can define more jobs as needed)
  agenda.define('process link', async (job) => {
    let { link, desc, fetchEvery, keywords, acceptedChange, cookie } = job.attrs.data;

    try {
      let response = await sails.helpers.sendRequest(link, cookie);

      if (!acceptedChange) {
        let response2 = await sails.helpers.sendRequest(link, cookie);
        acceptedChange = await sails.helpers.diffCheck(response, response2);
      }

      let newTarget = await Target.create({
        description: desc,
        link: link,
        status: 'unchanged',
        acceptedChange: acceptedChange,
        fetchEvery: fetchEvery,
        keywords: keywords,
        cookie: cookie,
      }).fetch();

      let responseFile = 'responses/' + newTarget.id + '.txt';
      const fs = require('fs');
      fs.writeFileSync(responseFile, response);

      sails.log(`Processed link ${link} and stored response.`);
    } catch (error) {
      sails.log.error(`Error processing link ${link}:`, error);
    }
  });

  // Start the agenda processing
  await agenda.start();

  sails.config.agenda = agenda; // Store agenda instance globally if needed

  return done();
};
