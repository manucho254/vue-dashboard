<template>
<div class="home">
    <section class="p-3">
        <hr>
        <div class='columns is-mobile is-centered mb-4 mt-4'>
            <div class='column is-12'>
                <div class="table-container">
                    <table class="table is-bordered is-striped is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date</th>
                                <th>Logs</th>
                            </tr>
                        </thead>
                        <SearchAll v-for="log in logData" :key="log.id" :log="log" />
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
    name: 'Home',
    components: {
        SearchAll
    },
    data() {
        return {
            logData: [],
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

            await axios
                .post(`/logs/search/`, {
                    'query': this.query
                })
                .then(response => {
                    this.logData = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
    }
}
</script>
