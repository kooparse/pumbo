# Pumbo :/

  Pumbo is an abandoned project, I decided to open source the code because the architecture is pretty cool.

  The code is durty, there are bugs.

  It's the mega super duper alpha version of the finished project! :)

## Technologies

I used the [React.js](https://github.com/facebook/react) with the [Flux](https://github.com/facebook/flux) pattern.
[React-router](https://github.com/rackt/react-router) for the routing syst.

On the backend it's a simple express server with mongodb. Redis for the caching (sessions are stored in Redis too)

## Install && Running

### Unix and OS/X

- Fork or download this repository.
- `cd` to the project's location.
-  run `npm install`.
- Make sure MongoDB is running and reachable as configured in `api/config/db_conf.js`.
- Make sure Redis is running.
-  run `gulp`.
