<template>
  <div class="create_customer" :class="open ? 'open' : ''">
      <div class="box">
          <div class="title"><h3>Thêm khách hàng</h3></div>
          <div class="form">
              <div class="form-group">
                  <input type="text" placeholder="Tìm kiếm theo tên hoặc số điện thoại">
              </div>
          </div>
          <div class="range"><span>Hoặc</span></div>
          <div class="btn_create">
              <button>Tạo mới khách hàng</button>
          </div>
      </div>
      <div class="mask" @click.stop.prevent="open = false"></div>
  </div>
</template>

<script>
export default {
    name: 'CreateCustomer',
    data: function(){
        return {
            open: false
        }
    }
}
</script>

<style>

</style>