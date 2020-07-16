<template>
    <div class="block_3_bill">
        <div class="cart_empty" v-if="$parent.$parent.data.length == 0">
          <i class="fal fa-shopping-cart"></i>
          <p>Không có sản phẩm trong giỏ hàng</p>
          <p>Vui lòng tìm và chọn sản phẩm thêm vào</p>
        </div>
        <div class="cart_product" v-else>
          <div class="list_item">
            <div class="item" v-for="(item, index) in $parent.$parent.data" :key="index" @click.stop.prevent="handleAdjust(item)">
              <div class="delete" @click.stop.prevent="deleteItem(index)">
                <i class="fal fa-times"></i>
              </div>
              <div class="name">{{item.name_product}}</div>
              <div class="quantity">
                <span>{{item.quantity}}</span>
              </div>
              <div class="total">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}}</div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SingleBill',
    methods: {
        handleAdjust: function(item){
            let vm = this;
            vm.obj = item;
            vm.$parent.$refs.AdjustProduct.quantity = item.quantity.toString();
            vm.$parent.$refs.AdjustProduct.open = true;
        },
        deleteItem: function(index){
            let vm = this;
            vm.$parent.$parent.data.splice(index, 1)
        },
    }
}
</script>

<style>

</style>