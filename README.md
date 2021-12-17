# vue-logtower-dashboard

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

### api calls
- The application uses axios to consume and display data from our backend api
- default BaseURL
>  axios.defaults.baseURL = 'https: //log-proj-redis-broker.herokuapp.com'

- since the backed requires Authorization: Token {token}
- All POST and GET request we send need the header
"
In views/Home.vue
In views/Search.vue

    let token = localStorage.getItem('token');
    const authHeaders = {
        'headers': {
            'Authorization': 'Token ' + token
        }
    }

"

: this.$store.commit('setIsLoading', true) = This state that show a loading animation when set to true. default is (false).

    await axios
        .post(`/api/logs/search/`, {
            'query': this.query
        }, authHeaders)

### state and store

```
store/index.js
Here is where we set the state of our application.

state: {
        isAuthenticated: false,
        token: '',
        isLoading: false,
    },

    mutations: {
        initializeApp(state) {
            if (localStorage.getItem('token')) {
                state.token = localStorage.getItem('token')
                state.isAuthenticated = true
            } else {
                state.token = ''
                state.isAuthenticated = false
            }
        },
        setIsLoading(state, status) {
            state.isLoading = status
        },
        setToken(state, token) {
            state.token = token
            state.isAuthenticated = true
        },
        removeToken(state) {
            state.token = ''
            state.isAuthenticated = false
        }
    }


we first set the state of our application:
isAuthenticated: false, This value will always be false until the user is authenticated.
token: '', : this value is always empty until the user is authenticated and then we get a token.
isLoading: false,: for the loading animation.

```

### routing

``` 
router/index.js

This is logic for redirecting the user to the login page  if not Authenticated.

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
        next({ name: 'Login', query: { to: to.path } });
    } else {
        next()
    }
})

Now we can add the logic to any of the url routes using

meta: {
    requireLogin: true
}

```

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

This file contains the configuration  that helps with the routing of paths on netlify once the app is hosted.

```