<template>
    <div class="paginate">
        <ul>
            <li><a :class="filter.current_page==1 ? 'disabled' : ''" @click.stop.prevent="filter.current_page = 1">First page</a></li>
            <li><a :class="filter.current_page==1 ? 'disabled' : ''" @click.stop.prevent="filter.current_page -= filter.current_page>1 ? 1 : 0">Prev page</a></li>
            <li v-for="item in filter.number_page" :key="item"><a @click.stop.prevent="filter.current_page=item" :class="item==filter.current_page ? 'active' : ''">{{ item }}</a></li>
            <li><a :class="filter.current_page==filter.number_page ? 'disabled' : ''" @click.stop.prevent="filter.current_page += filter.current_page<filter.number_page ? 1 : 0">Next page</a></li>
            <li><a :class="filter.current_page==filter.number_page ? 'disabled' : ''" @click.stop.prevent="filter.current_page = filter.number_page">Last page</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "PaginateProduct",
    props: ['filter'],
}
</script>

<style>

</style>