<template>
    <input v-model="number" type="number" placeholder="Enter price..." />
</template>

<script>
export default {
    name: 'number',
    data: function () {
        return {
            number: ''
        }
    }
}
</script>

<style>

</style>