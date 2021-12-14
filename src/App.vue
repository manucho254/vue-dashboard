<template>
<div id="wrapper">
    <nav class="navbar is-dark p-5">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item hero">
                <h3 class="is-size-5 is-success"><strong><span>Log</span>dashboard</strong></h3>
            </router-link>
            <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
                <div v-if="!showMobileMenu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
                <div class="has-text-centered is-size-4 mt-2" v-else>
                    <i class="fas fa-times"></i>
                </div>
            </a>
        </div>
        <div class="navbar-menu is-hoverable" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">
            <div class="navbar-end" v-if="$store.state.isAuthenticated === true">
                <router-link to="/" class="navbar-item"><strong>Home</strong></router-link>
              <span class="navbar-item">
                <button @click="logout()" class="navbar-item button is-dark"><strong>Log out</strong></button>
              </span>
            </div>
        </div>
    </nav>
    <router-view />
</div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            showMobileMenu: false,
        }
    },
    beforeCreate() {
     this.$store.commit('initializeApp')
     const token = this.$store.state.token

     if (token) {
       axios.defaults.headers.common['Authorization'] = "Token" + token
     }else {
       axios.defaults.headers.common['Authorization'] = ""
     }
   },
    methods: {
        logout () {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")         

            this.$store.commit('removeToken')
            this.$router.push('/login')
        }
    },
}
</script>

<style lang="scss">
@import '../node_modules/bulma';

.input-size {
    width: 600px;
}

@media (max-width: 768px) {
    .input-size {
        width: auto;
    }
}
</style>
