/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},
  "logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},
  "updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},
  "updateSettings":{"verb":"PUT","url":"/api/v1/settings","args":["reportToTelegram","telegramToken","telegramChatID"]},
  "updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress"]},
  "login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},
  "addLink": { "verb": "POST", "url": "/api/v1/links", "args": ["description", "link", "fetchEvery"] }}

  /* eslint-enable */

});
