module.exports = {


  friendlyName: 'Update target',


  description: 'Update the status of a target.',


  exits: {

    success: {

    },

  },


  fn: async function () {

    let fs = require('fs');

    let id = this.req.params.id;

    //  sails.log(id);

    let updateRecord = await Target.updateOne({ id: id })
      .set({
        status: 'unchanged'
      });


    if (!updateRecord) {
      return this.res.send('0');
    }

    // Get diffFile content and save it to send it back to user

    let diffFile = 'responses/diffs/' + id + '.txt';
    let data = fs.readFileSync(diffFile);
    let resp = data.toString();

    // Delete diffFile after reading it

    fs.unlinkSync(diffFile);

    this.res.setHeader('Content-Type', 'text/plain');

    return this.res.send(resp);



  }


};
