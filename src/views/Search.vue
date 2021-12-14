<template>
<div class="Search">
    <section class="p-3">
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
        <hr>
        <span class="p-3 is-size-4">Results for <span class="has-text-grey">{{ query }}</span></span>
        <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading}">
            <div class="lds-dual-ring"></div>
        </div>
        <div class='columns is-mobile is-centered mb-4 mt-4'>
            <div class='column is-12'>
                <div class="table-container">
                    <table class="table is-striped is-hoverable is-fullwidth bg-light">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date</th>
                                <th>Logs</th>
                            </tr>
                        </thead>
                        <tbody>
                            <SearchAll v-for="log in logData" :key="log.id" :log="log" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import axios from 'axios'
import SearchAll from '@/components/SearchAll.vue'

export default {
    name: 'Search',
    components: {
        SearchAll
    },
    data() {
        return {
            logData: [],
            query: '',
        }
    },
    mounted() {
        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)

        if (params.get('query')) {
            this.query = params.get('query')
            this.logSearch()
        }
    },
    methods: {
        async logSearch() {
            document.title = "Search/"

            let token = localStorage.getItem('token');
            const authHeaders = {
                'headers': {
                    'Authorization': 'Token ' + token
                }
            }
            this.$store.commit('setIsLoading', true)
            
            await axios
                .post(`/api/logs/search/`, {
                    'query': this.query
                }, authHeaders)
                .then(response => {
                    this.logData = response.data
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
    }
}
</script>
