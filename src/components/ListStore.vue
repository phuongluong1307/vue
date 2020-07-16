<template>
    <div class="list_store" :class="open ? 'open' : ''">
        <div class="box">
            <div class="back" @click.stop.prevent="open = false"><i class="fal fa-arrow-left"></i></div>
            <div class="top">
                <h6 class="title">Chọn cửa hàng</h6>
            </div>
            <div class="center">
                <div class="store">
                    <p>Soul Master 1</p>
                    <p><i class="fal fa-arrow-right"></i></p>
                </div>
                <div class="store">
                    <p>Soul Master 2</p>
                    <p><i class="fal fa-arrow-right"></i></p>
                </div>
                <div class="store">
                    <p>Soul Master 3</p>
                    <p><i class="fal fa-arrow-right"></i></p>
                </div>
                <div class="store">
                    <p>Soul Master 4</p>
                    <p><i class="fal fa-arrow-right"></i></p>
                </div>
            </div>
            <div class="bottom">
                <button>Chọn</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListStore',
    data: function(){
        return {
            open: false
        }
    }
}
</script>

<style>

</style>