module.exports = {

  friendlyName: 'Delete Link',

  description: 'Delete link from the database and its associated file.',

  fn: async function () {
    try {
      let fs = require('fs');
      let id = this.req.params.id;
      sails.log(`Attempting to delete record with ID: ${id}`);

      if (!id) {
        sails.log.error('No ID provided.');
        return this.res.status(400).send('No ID provided.');
      }

      // Attempt to delete the record from the database
      var destroyedRecord;
      try {
        destroyedRecord = await Target.destroyOne({ id: id });
      } catch (error) {
        sails.log.error(`Error deleting record with ID ${id}:`, error);
        return this.res.status(500).send('Failed to delete the record.');
      }

      // If the record was successfully deleted, attempt to delete the associated file
      if (destroyedRecord) {
        sails.log(`Successfully deleted record with ID: ${id}`);

        // Construct the file path
        let filePath = `./responses/${id}.txt`;

        // Attempt to delete the file
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            sails.log(`Successfully deleted file associated with ID: ${id}`);
          } else {
            sails.log.warn(`File not found for ID: ${id}`);
          }
        } catch (fileError) {
          sails.log.error(`Error deleting file for record with ID ${id}:`, fileError);
          return this.res.status(500).send('Record deleted, but failed to delete the associated file.');
        }

        return this.res.send('1');
      } else {
        sails.log.warn(`No record found with ID: ${id}`);
        return this.res.status(404).send('Record not found.');
      }

    } catch (error) {
      sails.log.error('An unexpected error occurred:', error);
      return this.res.status(500).send('An unexpected error occurred.');
    }
  }
};
