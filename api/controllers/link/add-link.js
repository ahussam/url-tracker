module.exports = {


  friendlyName: 'Add Link',


  description: 'Add new link to the system.',




  fn: async function () {

    let fs = require('fs');

    function validURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      return !!pattern.test(str);
    }


    // Get data from the PUT request 

    let desc = this.req.body.description;
    let link = this.req.body.link;
    let fetchEvery = this.req.body.fetchEvery;
    let keywords = this.req.body.keywords || "";
    let acceptedChange = this.req.body.acceptedChange || "";
    let cookie = this.req.body.cookie || "";



    // Check if the needed data have been provided 

   if(desc.length === 0 || link.length === 0 || fetchEvery.length === 0){

    return this.res.send("0");

   }

    // Check if the URL is valid 
    if (!(validURL(link))) {

      return this.res.send("0");

    }


    let response = await sails.helpers.sendRequest(link, cookie);

    // Check of acceptedChange is not set 

    if (acceptedChange === "") {

      let response2 = await sails.helpers.sendRequest(link, cookie);

      // find number of differences 

      acceptedChange = await sails.helpers.diffCheck(response, response2);

    }


    // Insert data to DB 

    var newTarget = await Target.create({
      description: desc, link: link, status: 'unchanged',
      acceptedChange: acceptedChange, fetchEvery: fetchEvery,
      keywords: keywords, cookie:cookie
    }).fetch();


    // Create the file that contains the response of the last request 

    let responseFile = "responses/" + newTarget.id + ".txt";


    fs.writeFile(responseFile, response, function (err) {
      if (err) throw err;
      console.log('Response file is created successfully.');
    });

    // Check if the new target is stored
    sails.log(newTarget);

    if (newTarget) {
      return this.res.send("1");
    } else {
      return this.res.send("0");
    }

  }


};
