# vue-logtower-dashboard

## Project setup using yarn
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```
### yarn setup won't work since yarn.lock has been removed when hosting the application

### npm will work well..

## Build Setup npm

### install dependencies
```
npm install
```

### serve with hot reload at localhost:8080
```
npm run dev
```

### build for production with minification
```
npm run build
```

### build for production and view the bundle analyzer report
```
npm run build --report
```

# Lets Disect the app

### 

### Heroku hosting
```
server.js
This is the server configuration for our application when hosting on heroku.
It just a simple express script that helps in creating a server

```

### Netlify

- Netlify is serverless so we dont need the server.js file here.

```
netlify.toml

This file contains the configuration  that helps with the routing of paths on netlify once the app is hosted in netlify.

```