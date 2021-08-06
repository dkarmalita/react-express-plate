const autocannon = require('autocannon');

// https://www.nearform.com/blog/load-testing-with-autocannon
// https://www.npmjs.com/package/autocannon
// https://github.com/mcollina/autocannon/tree/master/samples

/* eslint-disable no-plusplus, no-unused-vars, no-use-before-define, no-console */

let postLoginCount = 0;
let getMeCount = 0;

async function startBench() {
  return new Promise((resolve, reject) => {
    const instance = autocannon({
      // duration: 5, // SEC
      // The number of seconds to run the autocannon. default: 10.

      // amount: 2,
      // The amount of requests to make before exiting the benchmark. If set, duration is ignored.

      // connections: 1,
      // The number of concurrent connections to use. default: 10.

      url: 'http://localhost:8081',
      requests: [
        {
        // let's create a new user
          method: 'POST',
          path: '/api/v1/login',
          body: JSON.stringify({
            user: 'testUser@mailinator.com',
            password: 'mypass',
          }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          onResponse: (status, body, context) => {
            postLoginCount++;
            if (status === 200) {
              context.token = JSON.parse(body).token;
            } // on error, you may abort the benchmark
          },
        },
        {
          method: 'GET',
          path: '/api/v1/me',
          setupRequest: (req, context) => ({
            ...req,
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          // body: JSON.stringify({
          //   ...context.user,
          //   lastName: 'Doe'
          // })
          }),
          onResponse: (status, body, context) => {
            getMeCount++;
            // console.log('STATUS-2', status)
            if (status === 200) {
            // console.log(JSON.parse(body))
            } // on error, you may abort the benchmark
          },
        },
      ],
    }, finishedBench);

    process.once('SIGINT', () => {
      instance.stop();
    });

    autocannon.track(instance, {
      renderResultsTable: true,
      renderProgressBar: true,
    });

    function finishedBench(err, res) {
      console.log('total login post', postLoginCount);
      console.log('total me get', getMeCount);
      console.log('total requests', postLoginCount + getMeCount);
      // console.log('finished bench', err, res)
      return err ? reject(err) : resolve(res);
    }
  });
}

startBench();
