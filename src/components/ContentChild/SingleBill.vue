<template>
  <div class="block_3_bill">
    <div class="cart_empty" v-if="my_bill.products.length == 0">
      <i class="fal fa-shopping-cart"></i>
      <p>Không có sản phẩm trong giỏ hàng</p>
      <p>Vui lòng tìm và chọn sản phẩm thêm vào</p>
    </div>
    <div class="cart_product" v-else>
      <div class="list_item">
        <div class="item" v-for="(item, index) in my_bill.products" :key="index" @click.stop.prevent="handleAdjust(item)">
          <div class="delete" @click.stop.prevent="handleDelete(item,index)" >
            <i class="fal fa-times"></i>
          </div>
          <div class="name">{{item.product_name}}</div>
          <div class="quantity">
            <span>{{item.quantity}}</span>
          </div>
          <div class="total">
            <div class="price">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format((item.price * item.quantity) - (item.discount_price * item.quantity))}}</div>
            <div class="discount_price" v-if="item.discount_price != 0">Đã giảm:{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.discount_price * item.quantity)}}</div>
          </div>
        </div>
        <div class="delete_product" v-if="openModalDelete">
          <div class="box">
            <div class="top">
              <div class="title">Xóa sản phẩm</div>
            </div>
            <div class="center">
              <div class="center_1">Bạn có chắc muốn xóa sản phẩm!</div>
            </div>
            <div class="bottom">
              <button class="bottom_1" @click.stop.prevent="deleteItem">Xóa</button>
              <button class="bottom_2" @click.stop.prevent="openModalDelete = false">Hủy</button>
            </div>
          </div>
          <div class="mask_delete_product"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalDelete from '../ModalDelete';
export default {
  components: {
    ModalDelete
  },
  name: 'SingleBill',
  props: ['bill'],
  data(){
    return {
      arr_product: [],
      my_bill: null,
      openModalDelete: false,
      obj_product: null,
      discount: false
    }
  },
  methods: {
    handleAdjust: function(item){
      let vm = this;
      vm.$parent.$refs.AdjustProduct.openModalAdjust = true;
      vm.$parent.$refs.AdjustProduct.quantity = item.quantity.toString();
      vm.$parent.$refs.AdjustProduct.open = true;
      vm.$parent.$refs.AdjustProduct.obj = item;
      this.$forceUpdate();
    },
    deleteItem: function(){
      let vm = this;
      let findIndex = vm.my_bill.products.findIndex(row => row.id === vm.obj_product.id);
      if(findIndex > -1){
        vm.my_bill.products.splice(findIndex, 1);
        vm.openModalDelete = false;
      };
    },
    handleDelete:function(item,index){
      let vm = this;
      vm.openModalDelete = true;
      vm.obj_product = item;
    }
  },
  computed: {
    
  },
  created: function(){
    this.my_bill = this.bill;
  },
  watch: {
    'bill': {
      deep: true,
      handler: function(newval){
        this.my_bill = newval;
      }
    },
    'mybill': {
      deep: true,
      handler: function(newval){

      }
    }
  }
}
</script>

<style>

</style>