module.exports = {


  friendlyName: 'Add Link',


  description: 'Add new link to the system.',




  fn: async function () {


    // Get data from the PUT request 

    let desc = this.req.body.description;
    let link = this.req.body.link;
    let fetchEvery = this.req.body.fetchEvery;
    let responseHash = await sails.helpers.sendRequest(link);


    // Insert data to DB 

    var status = await Target.create({
      description: desc, link: link, status: 'unchanged',
      responseHash: responseHash, fetchEvery: fetchEvery
    }).fetch();

    sails.log(status);

    if (status) {
      return this.res.send("1");
    } else {
      return this.res.send("0");
    }



  }


};
