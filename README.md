# React UA + NodeJS API

## Development mode

### Start the UI 

In the first terminal:

```sh
cd ui
npm ci
npm start
```
The commands above start the UI development server at http://localhost:8080. With hot reload (HMR) and API proxies enabled.

To update the proxies configuration, look at the devServer.proxy section of ui/webpack.config.js

### Start the API server 

In the second terminal:

```sh
cd server
npm ci
npm run dev
```

The commands above start the API server at http://localhost:8081. With hot reload enabled.


### Test how it works

Now we are ready to go to http://localhost:8080 and try to log in.  When you put the correct credentials to the form, you'll be able to see obtained token and user data (which is obtained with the secont, bearer-authorized, request) in console.

There is no database connection in this example, so the only available user is hardcoded:

User: testUser@mailinator.com
Password: mypass


## Build a-la-production :)

Building ui:
```sh
cd ui
npm ci
npm run build
```

The commands above create the "dist" folder in the root directory within the production-ready UI.

Now we can run the whole application:

```sh
cd server
npm ci
npm start
```

And go to http://localhost:8081 to see the production UI build serving by our NodeJS server (not the webpack dev server in this case).

**Warning.** While the login flow is still works in this mode, example requests to the https://jsonplaceholder.typicode.com are brocken becouse this proxy is configured only for configuration example of webpack dev server and not supported by the API.

Please note that the server is configured for production deployment as AWS lambda (please refer to the [Serverless](https://www.serverless.com/) for details). 

Alternatively, it can be deployed in a more traditional way, but in this case some load balancing and restart mechanisms must be added. For some ideas, please refer to:

* [NodeJS Cluster Documentation](https://nodejs.org/api/cluster.html)
* [Process managers for Express apps](https://expressjs.com/en/advanced/pm.html)
* [Express Tutorial Part 7: Deploying to production](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)


