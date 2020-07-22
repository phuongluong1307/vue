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
                        <li @click.stop.prevent="handleListProduct"><i class="fal fa-list-alt"></i><span>Danh sách sản phẩm</span></li>
                        <li @click.stop.prevent="handleOrder"><i class="fas fa-receipt"></i><span>Đơn đặt hàng</span></li>
                        <li @click.stop.prevent="handlePermission"><i class="fal fa-key"></i><span>CRM</span></li>
                    </ul>
                </div>
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
            vm.$parent.$refs.ListProduct.open = true;
            vm.$parent.$refs.Permission.open = false;
        },
        handleDashboard: function(){
            let vm = this;
            vm.$parent.open_menu_bar = false;
            vm.$parent.$refs.CompOrder.open = false;
            vm.$parent.$refs.ListProduct.open = false;
            vm.$parent.$refs.Permission.open = false;
        },
        handleListProduct: function(){
            let vm = this;
            vm.$parent.$refs.ListProduct.open = true;
            vm.$parent.open_menu_bar = false;
            vm.$parent.$refs.CompOrder.open = false;
            vm.$parent.$refs.Permission.open = false;
        },
        handlePermission: function(){
            let vm = this;
            vm.$parent.$refs.Permission.open = true;
            vm.$parent.$refs.CompOrder.open = false;
            vm.$parent.$refs.ListProduct.open = false;
        }
    },
    created: function(){
        
    }
}
</script>

<style>

</style>