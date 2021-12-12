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
            <div class="navbar-end">
                <router-link to="/" class="navbar-item">Home</router-link>
            </div>
        </div>
    </nav>
    <div class="is-flex is-justify-content-center mt-5 ">
        <form method="get" action="/search/">
            <div class="field has-addons">
                <div class="control">
                    <input type="text" class="input border-none is-rounded input-size" placeholder="Search" name="query" v-model="search">
                </div>
                <div class="control">
                    <input class="button has-background-dark has-text-light is-rounded" type="submit" value="Search">
                </div>
            </div>
        </form>
    </div>
    <router-view />
</div>
</template>

<script>
export default {
    data() {
        return {
            showMobileMenu: false,
        }
    }
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
