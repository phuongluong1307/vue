<template>
  <section class="content" :class="$parent.open_menu_bar ? 'menu-bar-opened' : ''">
    <ContentMenu ref="ContentMenu" @handleData="handleData"></ContentMenu>
    <ContentBill ref="ContentBill"></ContentBill>
  </section>
</template>

<script>
import ContentMenu from "./ContentChild/ContentMenu";
import ContentBill from "./ContentChild/ContentBill";
export default {
  components: {
    ContentMenu,
    ContentBill
  },
  name: "Content",
  data: function(){
    return {
      data: [],
      arr_bill: null,
      my_tab: 'HD001'
    }
  },
  methods: {
    handleData: function(e){
      let vm = this;
      let new_products = {
        id: e.id,
        image: e.image,
        price: e.price,
        product_name: e.product_name,
        quantity: e.quantity,
        discount_price: 0,
        discount_type: 'VND',
        discount_value: 0
      }
      let findIndex = vm.arr_bill.findIndex(row => row.bill === this.my_tab);
      if(this.arr_bill[findIndex]){
        let findDupli  = this.arr_bill[findIndex].products.findIndex(item => item.id === e.id);
        if(findDupli > -1){
          this.arr_bill[findIndex].products[findDupli].quantity += 1;
        }else{
          this.arr_bill[findIndex].products.push(new_products);
        }
      };
    }
  },
  computed: {

  },
  watch: {
    'arr_bill': {
      deep: true,
      handler: function(newval){

      }
    }
  },
  mounted: function(){
    this.arr_bill = this.$refs.ContentBill.data;
  }
};
</script>

<style>

</style>