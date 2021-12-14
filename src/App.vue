<template>
<div id="wrapper">
    <nav class="navbar is-dark p-5">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item hero">
                <h3><strong><span class="is-size-4">Logtower</span></strong></h3>
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
        } else {
            axios.defaults.headers.common['Authorization'] = ""
        }
    },
    methods: {
        logout() {
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

.lds-dual-ring {
   display: inline-block;
   width: 80px;
   height: 80px;
 }
 .lds-dual-ring:after {
   content: "";
   display: block;
   width: 60px;
   height: 60px;
   margin: 8px;
   border-radius: 50%;
   border: 6px solid #ccc;
   border-color: #ccc transparent #ccc transparent;
   animation: lds-dual-ring 1.2s linear infinite;
 }

 @keyframes lds-dual-ring {
   0% {
     transform: rotate(0deg);
   }
   100% {
     transform: rotate(360deg);
   }
 }

 .is-loading-bar {
   height: 0;
   overflow: hidden;

   -webkit-transition: all 0.3s;
   transition: all 0.3s;

   &.is-loading {
     height: 80px;
   }
 }
</style>
