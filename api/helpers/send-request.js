module.exports = {

  friendlyName: 'Send request',

  description: 'Send a GET request to the specified URL with optional cookies.',

  inputs: {
    link: {
      description: 'The target URL',
      example: 'http://www.google.com',
      type: 'string',
      required: true
    },
    cookie: {
      description: 'The cookies that will be  included in the request',
      example: 'user_id=1234',
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'Request was successful and the response is returned.'
    },
    invalidUrl: {
      description: 'The provided URL is invalid or malformed.',
      responseType: 'badRequest'
    },
    requestFailed: {
      description: 'The request to the specified URL failed.',
      responseType: 'serverError'
    }
  },

  fn: async function (inputs, exits) {
    var request = require('request');

    // Validate URL format
    try {
      new URL(inputs.link);
    } catch (err) {
      sails.log.error(`Invalid URL: ${inputs.link}`, err);
      return exits.invalidUrl('The provided URL is invalid.');
    }

    request.get({
      url: inputs.link,
      headers: {
        'cookie': inputs.cookie || ''
      }
    }, (error, response, body) => {
      if (error) {
        sails.log.error(`Request to ${inputs.link} failed:`, error);
        return exits.requestFailed('Failed to send the request.');
      } else if (response.statusCode < 200 || response.statusCode >= 300) {
        sails.log.warn(`Request to ${inputs.link} returned status ${response.statusCode}`);
        return exits.requestFailed(`Request failed with status code ${response.statusCode}.`);
      } else {
        // Request was successful
        sails.log(`Request to ${inputs.link} was successful.`);
        return exits.success(body);
      }
    });
  }

};
