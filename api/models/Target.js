/**
 * Target.js
 *
 * A link that fetched every X seconds.
 */

module.exports = {

    attributes: {
         
    description: {
      type: 'string',
      example: 'Uber S3 bucket'
    },

    link: {
      type: 'string',
      required: true,
      unique: true,
      example: 'https://s3.amazonaws.com/yahoo_us/'
    },

    status: {
      type: 'string',
      isIn: ['changed', 'unchanged'],
      defaultsTo: 'unchanged',
    },

    responseHash: {
        type: 'string',
        required: true,
      },

      fetchEvery : {
        type: 'string',
        isIn: ['hour', 'day', 'week','month'],
        defaultsTo: 'week',
      },



  }
};