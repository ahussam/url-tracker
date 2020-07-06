module.exports = {


  friendlyName: 'Delete Link',


  description: 'Delete link from the db.',




  fn: async function () {

    let id = this.req.params.id;
    sails.log(id);

    var destroyedRecord = await Target.destroyOne({ id: id });

    if (destroyedRecord) {

      return this.res.send('1');

    } else {
      return this.res.send('0');

    }



  }


};
