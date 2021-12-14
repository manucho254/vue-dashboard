<template>
<div class="login-page">
    <div class="columns p-3 mt-5">
        <div class="column is-4 is-offset-4">
          <div class="box is-light mt-4">
            <h1 class="title has-text-centered is-family-monospace">LogIn</h1>
            <hr>

            <form @submit.prevent="submitForm">
                <div class="field">
                    <label>Username</label>
                    <div class="control">
                        <input class="input" type="text" v-model="username">
                    </div>
                </div>
                <div class="field">
                    <label>Password</label>
                    <div class="control">
                        <input class="input" type="password" v-model="password">
                    </div>
                </div>
                <div class="notification is-danger" v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>
                <div class="field mt-3">
                    <div class="control">
                        <button class="button is-dark">Log In</button>
                    </div>
                </div>
            </form>
          </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'log-in | Dashboard '
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

}
</script>
