module.exports.crontab = {
  /*
      Crontab control
      Note: if you want to modify the cron times you can find them here.
   */

  crons: function () {
    var jsonArray = [];

    jsonArray.push({ interval: '* * * * *', method: 'fetchResponseHour' });

    // Every hour fetching
    //jsonArray.push({ interval: '0 * * * *', method: 'fetchResponseHour' });
    // Every day fetching
    jsonArray.push({ interval: '0 1 * * *', method: 'fetchResponseDay' });
    // Every week fetching
    jsonArray.push({ interval: '0 0 * * 0', method: 'fetchResponseWeek' });
    // Every month fetching
    jsonArray.push({ interval: '0 0 1 * *', method: 'fetchResponseMonth' });

    return jsonArray;
  },

  // Cron methods for each period

  fetchResponseHour: function () {
    require('../crontab/fetchResponse.js').run('hour');
  },
  fetchResponseDay: function () {
    require('../crontab/fetchResponse.js').run('day');
  },
  fetchResponseWeek: function () {
    require('../crontab/fetchResponse.js').run('week');
  },
  fetchResponseMonth: function () {
    require('../crontab/fetchResponse.js').run('month');
  },
};
