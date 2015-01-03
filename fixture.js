var fixtures  = require('pow-mongodb-fixtures').connect('pumbo'),
    id        = require('pow-mongodb-fixtures').createObjectId;

fixtures.load({
    users: [
        {
          _id: id('54c10b6814119d547013cc1d'),

          username: 'alex',

          description: '',

          email: 'alex@pumbo.io',

          creation_date: Date.now,

          collections: {
        		count: 0,
        		list: []
        	},

        	stories: {
        		count: 3,
        		list: [
              id('54c10c49ed334c4b71066d8a'),
              id('54c10c49ed334c4b71066d8b'),
              id('54c10c49ed334c4b71066d8c')

            ]
        	},

        	followers: {
        		count: 0,
        		list: []
        	},

        	following: {
        		count: 0,
        		list: []
        	},

          local: {
            email: 'alex@pumbo.io',
            password: '$2a$08$7ayJZFfWgMABoCaDJQfvaukHEGpl9DnyR3s1erfLu.oqSjz8m1rTq'
          }
        },

        {
          _id: id('54c10b6814119d547013cc1e'),

          username: 'hugo',

          description: '',

          email: 'hugo@pumbo.io',

          creation_date: Date.now,

          collections: {
        		count: 0,
        		list: []
        	},

        	stories: {
        		count: 4,
        		list: [
              id('54c110197db651fe755a1023'),
              id('54c10b6814119d547013cc1a'),
              id('54c10b6814119d547013cc1b'),
              id('54c10b6814119d547013cc1c')
            ]
        	},

        	followers: {
        		count: 0,
        		list: []
        	},

        	following: {
        		count: 0,
        		list: []
        	},

          local: {
            email: 'hugo@pumbo.io',
            password: '$2a$08$7ayJZFfWgMABoCaDJQfvaukHEGpl9DnyR3s1erfLu.oqSjz8m1rTq'
          }
        },

        {
          _id: id('54c10b6814119d547013cc1f'),

          username: 'james',

          description: '',

          email: 'james@pumbo.io',

          creation_date: Date.now,

          collections: {
        		count: 0,
        		list: []
        	},

        	stories: {
        		count: 0,
        		list: []
        	},

        	followers: {
        		count: 0,
        		list: []
        	},

        	following: {
        		count: 0,
        		list: []
        	},

          local: {
            email: 'james@pumbo.io',
            password: '$2a$08$7ayJZFfWgMABoCaDJQfvaukHEGpl9DnyR3s1erfLu.oqSjz8m1rTq'
          }
        },

    ],

    stories: [
      {
        _id: id('54c10c49ed334c4b71066d8a'),
        description: '',
        title: 'The Japanese wrestler that almost amputated Muhammad Ali’s leg',
        url: 'https://medium.com/culture-club/the-japanese-wrestler-that-almost-amputated-muhammad-alis-leg-409928af6b2f',
        userInfos: {
          username: "alex",
          userId: "54c10866bf39c1cb6c0d7e42"
        },
        read_count: 0,
        creation_date: Date.now
      },

      {
        _id: id('54c10c49ed334c4b71066d8b'),
        description: '',
        title: 'How PAPER Magazine’s web engineers scaled their back-end for Kim Kardashian (SFW)',
        url: 'https://medium.com/message/how-paper-magazines-web-engineers-scaled-kim-kardashians-back-end-sfw-6367f8d37688',
        userInfos: {
          username: "alex",
          userId: "54c10866bf39c1cb6c0d7e42"
        },
        read_count: 0,
        creation_date: Date.now
      },

      {
        _id: id('54c10c49ed334c4b71066d8c'),
        description: '',
        title: 'YOUR LIFE IN MY HANDS',
        url: 'https://medium.com/human-parts/your-life-in-my-hands-6796ffd14814',
        userInfos: {
          username: "alex",
          userId: "54c10866bf39c1cb6c0d7e42"
        },
        read_count: 0,
        creation_date: Date.now
      },

      {
        _id: id('54c110197db651fe755a1023'),
        description: '',
        title: "9 Awesome Tools That Pro Web Designers Use",
        url: 'http://www.designbolts.com/2015/01/20/9-awesome-tools-that-pro-web-designers-use/',
        userInfos: {
          username: "hugo",
          userId: "54c10b6814119d547013cc1e"
        },
        read_count: 0,
        creation_date: Date.now
      },


      {
        _id: id('54c10b6814119d547013cc1a'),
        description: '',
        title: "WhatsApp doesn't understand the web",
        url: 'http://andregarzia.com/posts/en/whatsappdoesntunderstandtheweb/',
        userInfos: {
          username: "hugo",
          userId: "54c10b6814119d547013cc1e"
        },
        read_count: 0,
        creation_date: Date.now
      },

      {
        _id: id('54c10b6814119d547013cc1b'),
        description: '',
        title: "Duolingo's brilliant onboarding",
        url: 'http://www.useronboard.com/how-duolingo-onboards-new-users/',
        userInfos: {
          username: "hugo",
          userId: "54c10b6814119d547013cc1e"
        },
        read_count: 0,
        creation_date: Date.now
      },

      {
        _id: id('54c10b6814119d547013cc1c'),
        description: '',
        title: "▶ Introducing Touch Preview by Spotify - YouTube",
        url: 'http://www.youtube.com/watch?v=BriF9qxInAk',
        userInfos: {
          username: "hugo",
          userId: "54c10b6814119d547013cc1e"
        },
        read_count: 0,
        creation_date: Date.now
      }
    ]
}, function () {
  console.log('finished');
});
