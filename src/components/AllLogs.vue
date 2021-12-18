<template>
    <tr>
        <td>{{ log.log_time }}</td>
        <td>{{ log.type }}</td>
        <td>{{ log.appname }}</td>
        <td>{{ log.username }}</td>
        <td>{{ log.my_logs }}</td>
        <td>{{ log.traceback }}</td>
    
    </tr>
</template>

<script>

export default {
    props: {
        log: {
            required: true
        }
  }
}
</script>