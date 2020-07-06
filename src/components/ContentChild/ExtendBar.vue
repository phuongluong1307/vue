<template>
    <div class="extend_bar" :class="open ? 'open' : ''">
        <div class="extend_box">
            <div class="top">
                <div class="name_store">
                    <span>Soul Master</span>
                </div>
            </div>
            <div class="center">
                <div class="list">
                    <ul>
                        <li><i class="fas fa-th-large"></i><span>Dashboard</span></li>
                        <li><i class="fas fa-shopping-basket"></i><span>Danh sách bán hàng</span></li>
                        <li><i class="fas fa-receipt"></i><span>Đơn đặt hàng</span></li>
                    </ul>
                </div>
            </div>
            <div class="bottom">
                <button @click.stop.prevent="open = false">Đóng</button>
                <button>Đăng xuất</button>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="open = false"></div>
    </div>
</template>

<script>
export default {
    name: 'ExtendBar',
    data: function(){
        return {
            open: false
        }
    },
    methods: {
        
    },
    created: function(){
        
    }
}
</script>

<style>

</style>