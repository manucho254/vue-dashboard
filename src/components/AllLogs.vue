<template>
    <tr>
        <td>{{ log.id }}</td>
        <td>{{ log.timestamp }}</td>
        <td>{{ log.my_logs }}</td>
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