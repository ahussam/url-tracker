/**
 * Target.js
 *
 * A link that fetched every X seconds.
 */

module.exports = {

  attributes: {

    description: {
      type: 'string',
      example: 'Uber S3 bucket',
      required: true,
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

    keywords: {
      type: 'string',
    },

    acceptedChange: {
      type: 'number',
    },

    cookie: {
      type: 'string',
    },

    fetchEvery: {
      type: 'string',
      isIn: ['hour', 'day', 'week', 'month'],
      defaultsTo: 'week',
    },



  }
};