<template>
<div class="home">
    <section class="p-3 ">
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
        <div class="box columns is-multiline is-mobile">
            <div class="p-3 column is-4">
                <h1 class="is-size-5-touch is-size-5"><strong>Total number of logs: </strong></h1>
                <p class="is-size-5-touch ml-4 is-size-4" placeholder="0">( {{ logData.count }} )</p>
            </div>
            <div class="p-3 column is-4">
                <h1 class="is-size-5-touch is-size-5"><strong>Number of logs fetched:</strong></h1>
                <p class="is-size-5-touch ml-4 is-size-4">( {{ logsFetched }} )</p>
            </div>
            <div class="p-3 column is-4">
                <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                    <ul class="pagination-list">
                        <li><a class="pagination-previous has-background-dark has-text-light" v-on:click="getPreviousPage()">&#171; Prev</a></li>
                        <li><a class="pagination-link" aria-label="Goto page 1">{{ currentPage }}</a></li>
                        <li><a class="pagination-next has-background-dark has-text-light" v-on:click="getNextPage()">Next &#187;</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading}">
            <div class="lds-dual-ring"></div>
        </div>
        <div class='columns is-mobile is-centered mb-4'>
            <div class='column is-12 p-2'>
                <div class="table-container">
                    <table class="table is-striped is-hoverable is-fullwidth bg-light">
                        <thead>
                            <tr>
                                <th>Date/Time</th>
                                <th>Logtype</th>
                                <th>Appname</th>
                                <th>Username</th>
                                <th>Logs</th>
                                <th>Traceback</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AllLogs v-for="log in logData.results" :key="log.id" :log="log" />
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
import AllLogs from '@/components/AllLogs.vue'

export default {
    name: 'Home',
    components: {
        AllLogs
    },
    data() {
        return {
            logData: [],
            currentPage: 1,
            logsFetched: 0,
        }
    },
    mounted() {
        this.getLogs()
    },
    methods: {
        async getLogs() {
            document.title = "Home/"

            let token = localStorage.getItem('token');
            const authHeaders = {
                'headers': {
                    'Authorization': 'Token ' + token
                }
            }
            this.$store.commit('setIsLoading', true)

            await axios
                .get(`/api/logs/?page=` + this.currentPage, authHeaders)
                .then(response => {
                    this.logData = response.data
                    
                    console.log(this.logData)
                    this.logsFetched = response.data.results.length

                })
                .catch(error => {
                    console.log(error)
                })
                this.$store.commit('setIsLoading', false)
        },
        scrollUp() {
            window.scrollTo(0, 0);
        },
        getNextPage() {
            this.currentPage += 1
            this.getLogs()
            this.scrollUp()
        },
        getPreviousPage() {
            if (this.currentPage > 1) {
                this.currentPage -= 1
                this.getLogs()
                this.scrollUp()
            } else if (this.currentPage === 1) {
                return null
            }
        },
    }
}
</script>
