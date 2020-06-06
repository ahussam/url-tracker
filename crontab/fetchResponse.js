module.exports = {

  // Cron fetch function 

  run: async function (peroid) {


    var targets = await Target.find({ fetchEvery: peroid });
    var setting = await Setting.find();
    setting = setting[0];

    targets.forEach(async function (item) {

      // Get the new response hash 

      let responseHash = await sails.helpers.sendRequest(item.link);


      // Check if it matches the old one 

      if (responseHash !== item.responseHash) {

            sails.log("It works!");
        //    sails.log(item);
        

        // Check if user want to be repoted via email 

        if(setting.reportToEmail){

         await sails.helpers.sendEmail(item.link);

        }
        
        // Update database with the new hash 
        
        var updatedTarget = await Target.updateOne({ id: item.id })
          .set({
            responseHash: responseHash,
            status: 'changed'
          });

        if (updatedTarget) {
           // sails.log('Updated');
        }

      }


    })

  }
};