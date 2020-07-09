<template>
    <div class="extend_bar" :class="$parent.open_menu_bar ? 'open' : ''">
        <div class="extend_box">
            <div class="top">
                <div class="name_store">
                    <span>Soul Master</span>
                </div>
            </div>
            <div class="center">
                <div class="list">
                    <ul>
                        <li @click.stop.prevent="handleDashboard"><i class="fas fa-th-large"></i><span>Trang chủ</span></li>
                        <li><i class="fas fa-shopping-basket"></i><span>Danh sách bán hàng</span></li>
                        <li @click.stop.prevent="handleOrder"><i class="fas fa-receipt"></i><span>Đơn đặt hàng</span></li>
                    </ul>
                </div>
            </div>
            <div class="bottom">
                <button @click.stop.prevent="$parent.open_menu_bar = false">Đóng</button>
                <button>Đăng xuất</button>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="$parent.open_menu_bar = false"></div>
    </div>
</template>

<script>
export default {
    name: 'ExtendBar',
    props: ['status'],
    data: function(){
        return {
            
        }
    },
    methods: {
        handleOrder: function(){
            let vm = this;
            vm.$parent.$refs.CompOrder.open = true;
            vm.$parent.open_menu_bar = false;
        },
        handleDashboard: function(){
            let vm = this;
            console.log(vm)
            vm.$parent.open_menu_bar = false;
            vm.$parent.$refs.CompOrder.open = false;
        }
    },
    created: function(){
        
    }
}
</script>

<style>

</style>