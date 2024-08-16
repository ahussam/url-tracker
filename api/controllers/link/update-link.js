module.exports = {

  friendlyName: 'Update target',

  description: 'Update the status of a target.',

  exits: {
    success: {},
    notFound: {
      description: 'No target with the specified ID was found in the database.',
      responseType: 'notFound'
    },
    fileNotFound: {
      description: 'The specified diff file could not be found.',
      responseType: 'notFound'
    },
    serverError: {
      description: 'An unexpected error occurred.',
      responseType: 'serverError'
    }
  },

  fn: async function () {
    try {
      let fs = require('fs');
      let id = this.req.params.id;

      // Attempt to update the target record
      let updateRecord = await Target.updateOne({ id: id })
        .set({
          status: 'unchanged'
        });

      // If no record was found, return a 404 response
      if (!updateRecord) {
        return this.res.notFound('Target not found');
      }

      // Define the path to the diff file
      let diffFile = 'responses/diffs/' + id + '.txt';

      // Attempt to read the diff file
      let data;
      try {
        data = fs.readFileSync(diffFile);
      } catch (err) {
        // If the file is not found, return a 404 response
        sails.log.warn(err);
        return this.res.notFound('Diff file not found');
      }

      // Convert the file content to string
      let resp = data.toString();

      // Attempt to delete the diff file after reading it
      try {
        fs.unlinkSync(diffFile);
      } catch (err) {
        sails.log.warn(`Failed to delete diff file: ${diffFile}`, err);
        // Continue execution even if the file deletion fails
      }

      // Set the response content type and send the file content
      this.res.setHeader('Content-Type', 'text/plain');
      return this.res.send(resp);

    } catch (error) {
      // Log the error and return a server error response
      sails.log.error('Error updating target:', error);
      return this.res.serverError('An unexpected error occurred');
    }
  }
};
