<template>
  <div class="add_customer" :class="open ? 'open' : ''">
      <div class="box">
          <div class="top">
              <div class="back" @click.stop.prevent="closePopup"><i class="fal fa-arrow-left"></i></div>
              <div class="title">Khách hàng mới</div>
          </div>
          <div class="center">
              <div class="form-group">
                  <input type="text" v-model="form_customer.name" name="name" placeholder="Họ và tên">
              </div>
              <div class="form-group">
                  <input type="email" v-model="form_customer.email" name="email" placeholder="Email">
              </div>
              <div class="form-group">
                  <input type="tel" v-model="form_customer.phone_number" name="phone" placeholder="Số điện thoại">
              </div>
              <div class="form-group">
                  <input type="text" name="name" placeholder="Ghi chú">
              </div>
          </div>
          <div class="bottom">
              <button @click.stop.prevent="handleAddCustomer">Tạo mới khách hàng</button>
          </div>
      </div>
      <div class="mask"></div>
  </div>
</template>

<script>
export default {
    name: 'AddCustomer',
    data: function(){
        return {
            open: false,
            form_customer: {
                name: '',
                email: '',
                phone_number: ''
            }
        }
    },
    methods: {
        closePopup: function(){
            let vm = this;
            vm.open = false;
            vm.$parent.popup = false;
        },
        handleAddCustomer: function(){
            let vm = this;
            vm.axios({
                method: "POST",
                url: vm.$root.API_GATE + '/api/customers/',
                headers: {'auth-token': localStorage.getItem('token')},
                data: vm.form_customer
            }).then(res => {
                if(res.data.error){

                }else{
                    vm.open = false;
                    vm.$parent.popup = false;
                    vm.$parent.closePopup();
                    vm.$parent.select_customer = true;
                    vm.$parent.name_customer = vm.form_customer.name;
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>