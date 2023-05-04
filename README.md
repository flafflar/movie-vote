# Movie Vote

A small web-app for friends or groups to vote on what movie to watch.

![Screenshot of app](https://user-images.githubusercontent.com/49089857/235318159-9b8bf090-7b02-4f19-b654-af81ff38a45c.png)

Users must log in with their Instagram accounts before voting, so you can make sure only the people you want can vote!

## Running

You can host this app in any server that supports Node.js and has an HTTPS certificate. The HTTPS certificate is required because Instagram's OAuth API does not allow redirecting to unsecure HTTP websites. You will also need a MySQL database (not necessarily hosted in the same server).

First, go to [Meta for Developers](https://developers.facebook.com) and create an app. This app is used for obtaining the API tokens required for the OAuth login to work. After that, set up Instagram Basic Display for your app, so you can make OAuth requests to Instagram. In the "Valid OAuth Redirect URIs" field, enter the value `<your-app's-url>/oauth`. If you omit this step or enter the wrong URL the OAuth authentication will not work and users will not be able to log in!

After you have created your Meta app and obtained the API tokens, it's time to configure this app. There are two `.env` files that contain configuration variables for the app: one in the root directory and one in the `frontend` directory. There are already template .env files in those directories that can help you configure the server.

After you have configured everything, pack the frontend into a static website by running `npm -C frontend run build`. Then you can start serving the app by running `npm start`. You can also run it with a production process manager like [PM2](https://pm2.keymetrics.io/).

The database requires no configuration, the server will automatically create all necessary tables during the first run.