<template>
    <div class="list_store" :class="open ? 'open' : ''">
        <div class="box">
            <div class="top">
                <h6 class="title">Chọn cửa hàng</h6>
            </div>
            <div class="center">
                <div class="store" v-for="item in 4" :key="item">
                    <p>Soul Master {{item}}</p>
                </div>
            </div>
            <div class="bottom">
                <button @click.stop.prevent="handleSelectStore">Chọn</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListStore',
    data: function(){
        return {
            open: false,
            active: ""
        }
    },
    methods: {
        handleSelectStore: function(){
            let vm = this;
            vm.open = false;
        }
    }
}
</script>

<style>

</style>