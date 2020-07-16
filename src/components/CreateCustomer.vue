<template>
  <div class="create_customer" :class="open ? 'open' : ''">
        <div class="box" :class="popup ? 'popup' : ''">
            <div class="title"><h3>Thêm khách hàng</h3></div>
            <div class="form">
                <div class="form-group">
                    <input type="text" placeholder="Tìm kiếm theo tên hoặc số điện thoại">
                </div>
            </div>
            <div class="range"><span>Hoặc</span></div>
            <div class="btn_create">
                <button @click.stop.prevent="addCustomer">Tạo mới khách hàng</button>
            </div>
            <div class="cancel" @click.stop.prevent="open = false">
                <button><i class="fal fa-times"></i></button>
            </div>
        </div>
      <div class="mask" @click.stop.prevent="open = false"></div>
      <AddCustomer ref="AddCustomer"></AddCustomer>
  </div>
</template>

<script>
import AddCustomer from './AddCustomer';
export default {
    components: {
        AddCustomer
    },
    name: 'CreateCustomer',
    data: function(){
        return {
            open: false,
            popup: false
        }
    },
    methods: {
        addCustomer: function(){
            let vm = this;
            vm.popup = true;
            vm.$refs.AddCustomer.open = true;
        }
    }
}
</script>

<style>

</style>