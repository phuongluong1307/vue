<template>
  <div class="add_customer" :class="open ? 'open' : ''">
      <div class="box">
          <div class="top">
              <div class="back" @click.stop.prevent="closePopup"><i class="fal fa-arrow-left"></i></div>
              <div class="title">Khách hàng mới</div>
          </div>
          <div class="center">
              <div class="form-group">
                  <input type="text" name="name" placeholder="Họ và tên">
              </div>
              <div class="form-group">
                  <input type="email" name="email" placeholder="Email">
              </div>
              <div class="form-group">
                  <input type="tel" name="name" placeholder="Số điện thoại">
              </div>
              <div class="form-group">
                  <input type="text" name="name" placeholder="Ghi chú">
              </div>
              <div class="form-group">
                  <button><i class="fal fa-plus"></i>Thêm chi tiết</button>
              </div>
          </div>
          <div class="bottom">
              <button>Tạo mới khách hàng</button>
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
            open: false
        }
    },
    methods: {
        closePopup: function(){
            let vm = this;
            vm.open = false;
            vm.$parent.popup = false;
        }
    }
}
</script>

<style>

</style>