<template>
    <div class="paginate">
        <div class="records-perpage">
            <select class="form-control" v-model="data.limit">
                <option value="10">10 records</option>
                <option value="20">20 records</option>
                <option value="50">50 records</option>
                <option value="100">100 records</option>
            </select>
        </div>
        <ul>
            <li><a :class="data.current_page==1 ? 'disabled' : ''" @click.stop.prevent="data.current_page = 1">First page</a></li>
            <li><a :class="data.current_page==1 ? 'disabled' : ''" @click.stop.prevent="data.current_page -= data.current_page>1 ? 1 : 0">Prev page</a></li>
            <li v-for="item in data.number_page" :key="item"><a @click.stop.prevent="data.current_page=item" :class="item==data.current_page ? 'active' : ''">{{ item }}</a></li>
            <li><a :class="data.current_page==data.number_page ? 'disabled' : ''" @click.stop.prevent="data.current_page += data.current_page<data.number_page ? 1 : 0">Next page</a></li>
            <li><a :class="data.current_page==data.number_page ? 'disabled' : ''" @click.stop.prevent="data.current_page = data.number_page">Last page</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "paginate",
    props: ['data'],
    data: function () {
        return {
            limit: 10
        }
    },
}
</script>

<style>

</style>