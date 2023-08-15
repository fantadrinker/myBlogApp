---

title: 'How to Create an Electron App with React and TailwindCSS'

date: "2023-08-15"

---

Today I want to walk through how to develop an Electron app with React and how to set up.

## Background

The app will be about searching pdfs with text.

## Set up Electron

We can follow electon's official [quick-start guide](https://www.electronjs.org/docs/latest/tutorial/quick-start) to set it up.

First make sure node is installed

    node -v
    npm -v

Then Scaffold the project 

    mkdir my-electron-app && cd my-electron-app
    npm init

Make sure the entry point is `main.js` in `package.json` file

```json
{
  ...
  "main": "main.js",
  ...
}
```

Install electron with npm 

    npm install --save-dev electron

Add the following script command to `package.json`

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

Run this command to start the app

    npm start

You will likely receive a warning since no code has been set up to 
specify what UI to show and what kind of initial setup to run.
So we will tackle that next.

## App Essentials

### UI

We now create a webpage for our home UI. Create a new directory `frontend` to
store all frontend code, then paste the following to `frontend/index.html` file

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.
  </body>
</html>
```

### Main js

We will now define the main process for the Electron app by creating a `main.js` 
file. Create the file and paste in the following code. To understand more about
how these code work I suggest you check out the official docs page.

```javascript
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```

### Preload js

`Preload.js` file is a script that is helpful when defining the interactions
between frontend webpage and backend node js process. We can paste the following
into the file.

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

Then go back to `main.js` and modify the `createWindow` function to inject 
the preload dependency into the window.

```js
// don't forget to import the module
const path = require('path')
...
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('src/index.html')
}
```

### Checkpoint

Now is a good point to test the code we have pasted so far. Run

    npm run start

We should be able to see the node, chromium, and electron version in the screen.

## Webpack, React

### React

To install React, we can use webpack to bundle the javascript and html. For this 
part I will be referencing this [online article](https://medium.com/age-of-awareness/setup-react-with-webpack-and-babel-5114a14a47e9)

First install react and react dom

    npm install react react-dom

Then we will define the react root within `index.html` by replacing the content
with

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

Then create a new file named `index.js` and paste in the following code

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello World</h1>,
  document.getElementById('root')
);
```

### Webpack for React

Now let's install and configure webpack for react. We will come back to this 
later for css.

First, install dev dependencies 

    npm install webpack webpack-cli webpack-dev-server --save-dev
    npm install html-webpack-plugin --save-dev
    npm install @babel/core babel-loader --save-dev
    npm install @babel/preset-env @babel/preset-react --save-dev

Configure webpack using `webpack.config.js`

    touch webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development'
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path:path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: process.env.PORT || 8080,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: false,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
}
```

Then we can serve or compile the react code with 

    webpack

to compile to dist, or 

    webpack serve

to serve on port 8080.

### Integrate with main process

To leverage the hot reload functionality from `webpack serve`, we will have the
main electron process listening on local dev server on port 8080. To do that, 
modify `main.js`

```js

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  //win.loadFile('src/index.html')
  win.loadURL(`http://localhost:${process.env.PORT || 8080}`)
}

```

To run the application locally, we can use 2 terminals with one running

    npx webpack serve

the other running 

    npm run start

or alternatively use concurrently, to install, run:

    npm install -D concurrently

Then modify `package.json` to add following scripts:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:electron": "electron .",
    "build": "webpack --mode=production",
    "start": "concurrently \"webpack serve --mode=development\" \"electron .\""
  },
```

After this is done, we can run `npm run start` again to start dev server.

## Wrap up

It is probably best to be broken down to 2-3 blogs. From here we will be able to 
start developing with react on the project and play around with the main process
apis. In the next blog I will be covering setting up TailwindCSS and maybe 
publishing and distributing the app.


