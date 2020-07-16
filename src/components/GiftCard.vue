<template>
    <div class="gift_card" :class="open ? 'open' : ''">
        <div class="box">
            <div class="top">
                <div class="title">Thẻ quà tặng</div>
            </div>
            <div class="center">
                <div class="form-group">
                    <input type="text" placeholder="Nhập mã quà tặng">
                </div>
            </div>
            <div class="bottom">
                <button>Xác nhận</button>
            </div>
            <div class="cancel" @click.stop.prevent="open = false">
                <button><i class="fal fa-times"></i></button>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="open = false"></div>
    </div>
</template>

<script>
export default {
    name: 'GiftCard',
    data: function(){
        return {
            open: false
        }
    }
}
</script>

<style>

</style>