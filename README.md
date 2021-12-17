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

### views and api calls

- The application uses axios to consume and display data from our backend api
- default BaseURL
>  axios.defaults.baseURL = 'https: //log-proj-redis-broker.herokuapp.com'

- since the backed requires Authorization: Token {token}
- All POST and GET request we send need the header
"
In views/Home.vue
In views/Search.vue

we first get the token from our local localstrogage and pass it ,and the create a new const variable and pass it to a api call.

    let token = localStorage.getItem('token');
    const authHeaders = {
        'headers': {
            'Authorization': 'Token ' + token
        }
    }

"

: this.$store.commit('setIsLoading', true) = This state that show a loading animation when set to true. default is (false).

views/Search.vue

    await axios
        .post(`/api/logs/search/`, {
            'query': this.query
        }, authHeaders)


### componentS

```

 components/AllLogs.vue
 component/SearchAll.vue

```

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

### Authentication

```

We first use the v-model directive in out 'input v-model="username"' 'input v-model="password"'  html atrribute to get the value of our input fields.

The submitForm() script is quit straightforward we first validate the input boxes and then get there values.
We create a const variable to hold the values we got and then pass the data to our api call to authenticate the user.

If we get an error we return our custom error message.

views/Login.vue

data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
methods: {
    async submitForm() {
        this.errors = []
        if (this.username === '') {
            this.errors.push('The username is missing')
        }
        if (this.password === '') {
            this.errors.push('The password is missing')
        }
        
        if (!this.errors.length) {
            const formData = {
                password: this.password,
                username: this.username
            }
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")

            await axios
                .post("/api/auth/token/login/", formData)
                .then(response => {

                    const token = response.data.auth_token

                    this.$store.commit('setToken', token)

                    axios.defaults.headers.common['Authorization'] = "Token" + token

                    localStorage.setItem("token", token)

                    const toPath = this.$route.query.to || '/'

                    this.$router.push(toPath)

                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                        console.log(JSON.stringify(error.response.data))
                    } else if (error.message) {
                        this.errors.push('something went wrong. Please try again')
                        console.log(JSON.stringify(error))
                    }
                })
        }
    }
}

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