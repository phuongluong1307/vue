<template>
    <div class="search_product">
        <div class="box_search_product">
            <div class="item" v-for="(item, index) in $parent.arr_product" :key="item.id" @click.stop.prevent="$parent.handleItem(item)">
                <div class="item_box">
                    <div class="item_image" :class="index%2==0 ? 'by-height' : 'by-width'">
                        <img :src="$root.API_GATE + item.thumbnail" />
                    </div>
                    <div class="item_info">
                        <p class="name">{{item.product_name}}</p>
                        <p class="price">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchProduct'
}
</script>

<style>

</style>