parasails.registerPage('main', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    modal: '',
    diff: '',
    pageLoadedAt: Date.now(),
    search: '',
    targets: [],
    syncing: false,

    // Form data
    formData: {
      /* … */
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: {
      /* … */
    },

    // Server error state for the form
    cloudError: '',
  },
  computed: {
    isDisabled() {
      if (this.search !== '') {
        return true;
      } else {
        return false;
      }
    },

    filteredTargetsList() {
      return this.targets.filter((target) => {
        return target.description
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
  created: function () {
    setInterval(() => {
      this.updateTable();
    }, 10000);
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    // console.log(this.targets);
  },
  mounted: async function () {
    //  console.log(this.targets);
  },

  //  ╦  ╦╦╦═╗╔╦╗╦ ╦╔═╗╦    ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ╚╗╔╝║╠╦╝ ║ ║ ║╠═╣║    ╠═╝╠═╣║ ╦║╣ ╚═╗
  //   ╚╝ ╩╩╚═ ╩ ╚═╝╩ ╩╩═╝  ╩  ╩ ╩╚═╝╚═╝╚═╝
  // Configure deep-linking (aka client-side routing)
  virtualPagesRegExp: /^\/main\/?([^\/]+)?\/?/,
  afterNavigate: async function (virtualPageSlug) {
    // `virtualPageSlug` is determined by the regular expression above, which
    // corresponds with `:unused?` in the server-side route for this page.
    switch (virtualPageSlug) {
      case 'add':
        this.modal = 'add';
        break;
      case 'diff':
        this.modal = 'diff';
        break;
      default:
        this.modal = '';
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝

  methods: {
    viewDiff(diffText) {

      // Escape HTML

      diffText = diffText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

      // Insert ins and del tags

      diffText = diffText
        .replace(/\[\[START_DEL_URL_Tracker\]\]/g, '<del>')
        .replace(/\[\[END_DEL_URL_Tracker\]\]/g, '</del>')
        .replace(/\[\[START_INS_URL_Tracker\]\]/g, '<ins>')
        .replace(/\[\[END_INS_URL_Tracker\]\]/g, '</ins>');
      this.diff = diffText;
    },
    submittedForm: async function () {
      // Redirect to the account page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      this.syncing = true;
      this.updateTable();
      setTimeout(() => {
        location = '/main';
      }, 2000);
    },

    handleParsingForm: function () {
      function validURL(str) {
        var pattern = new RegExp(
          '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
          'i'
        ); // fragment locator
        return !!pattern.test(str);
      }

      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      //  console.log(argins);

      // Validate description

      if (!argins.description) {
        this.formErrors.description = true;
      }
      let bulk = argins.bulkAdd;
      if (!bulk) {
        if (!argins.link) {
          //this.formErrors.link = true;
        }
        // Validate safe url
        if (!validURL(argins.link)) {
          // this.formErrors.link = true;
        }
      }


      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

    open: async function (modal) {
      switch (modal) {
        case 'add':
          this.goto('/main/add');
          break;
        case 'diff':
          this.goto('/main/diff');
          break;
      }

      // Or, without deep links, instead do:
      // ```
      // this.modal = 'example';
      // ```
    },

    close: async function () {
      this.goto('/main');
      // Or, without deep links, instead do:
      // ```
      // this.modal = '';
      // ```
    },

    removeRow: async function (index) {
      let linkID = this.targets[index].id;
      console.log(linkID);
      fetch('api/v1/links/' + linkID, {
        method: 'DELETE',
      }).then(() => {
        console.log('Deleted');
      });

      console.log(this.targets[index].id);

      this.targets.splice(index, 1);
    },

    markAsSeen: async function (index) {
      let linkID = this.targets[index].id;

      // Mark as seen in DB and return the diff checker result

      fetch('api/v1/links/' + linkID, {
        method: 'PUT',
      })
        .then((response) => response.text())
        .then((response) => {
          this.viewDiff(response);
          this.open('diff');
        })
        .catch((err) => console.log(err));

      this.targets[index].status = 'unchanged';
    },

    updateTable: async function () {
      // Check if user is signed in
      if (this.me.id) {
        let currentLink = new URL(location.href);

        if (currentLink.href.indexOf('/add') !== -1) {
          //   console.log('ping');

          return;
        }

        let data = await getData('api/v1/links');
        console.log(data);

        this.targets = data;

        async function getData(url) {
          const response = await fetch(url);

          return response.json();
        }
      }
    },
  },
});
