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
        <div class="box is-flex">
            <h1 class="is-size-5-touch is-size-5"><strong>Number of Logs: </strong></h1>
            <p class="is-size-5-touch ml-4 is-size-4">( {{ logData.length }} )</p>
        </div>
        <div class='columns is-mobile is-centered mb-4'>
            <div class='column is-12 p-2'>
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
                            <AllLogs v-for="log in logData" :key="log.id" :log="log" />
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
        }
    },
    mounted() {
        this.getLogs()
    },
    methods: {
        async getLogs() {
            document.title = "Home/"

            await axios
                .get(`/api/logs/`)
                .then(response => {
                    this.logData = response.data
                    console.log(this.logData)
                })
                .catch(error => {
                    console.log(error)
                })
        },
    }
}
</script>
