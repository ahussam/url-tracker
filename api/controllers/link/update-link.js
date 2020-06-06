module.exports = {


    friendlyName: 'Update target',
  
  
    description: 'Update the status of a target.',
  
  
    exits: {
  
      success: {
  
      },
  
    },
  
  
    fn: async function () {
      
      let id = this.req.params.id;

    //  sails.log(id);
  
 let updateRecord = await Target.updateOne({ id: id })
    .set({
      status: 'unchanged'
    });

      if (updateRecord) {
        return this.res.send("1");
  
      } else {
        return this.res.send("0");
  
      }
  
    }
  
  
  };