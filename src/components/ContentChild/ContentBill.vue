<template>
  <div class="content_bill" id="billContent">
    <div class="block_1">
      <div class="block_1_1">
        <div class="block_tab">
          <ul>
            <li>{{seller}}</li>
          </ul>
        </div>
        <div class="sales">
          <span class="sales_1">Đã bán trong ngày:</span>
          <span class="sales_2">100.000</span>
        </div>
      </div>
    </div>
    <div class="block_5" id="bill">
      <div class="block_5_1">
        <ul>
          <div v-for="(item, index) in totalBill" :key="index">
            <li class="tab" :class="item.bill == tab ? 'active' : ''" @click.stop.prevent="handleTab(item)">
              <a><span>{{item.bill}}</span></a>
              <span class="close_tab" @click.stop.prevent="handleDeleteBill(item,index)"><i class="fal fa-times"></i></span>
              
            </li>
          </div>
          <li class="add_bill" :class="data.length > 4 ? 'extend_add_bill' :''" @click.stop.prevent="handleAddBill">
            <a><i class="fal fa-plus"></i><span v-if="data.length > 4">{{data.length - totalBill.length}}</span></a>
          </li>
        </ul>
        <div class="list_bill" :class="extend_list_bill ? 'extend_list_bill': ''">
          <div class="list_bill_title">
            <span>Hóa đơn</span>
            <span>SL</span>
            <span>Tổng tiền</span>
          </div>
          <div class="bill" v-for="item in data" :key="item.bill" @click.stop.prevent="handleTab(item)">
            <span>{{item.bill}}</span>
            <span>{{handleQuantity}}</span>
            <span>100.000</span>
          </div>
          <div class="add_new_bill">
            <button @click.stop.prevent="multiBill">Thêm mới</button>
          </div>
        </div>
      </div>
    </div>
    <div class="content_bill_2">
      <div class="content_bill_2_1">
        <div class="block_2">
          <div class="block_2_1" @click.stop.prevent="$refs.CreateCustomer.open = true" v-if="select_customer">
            <div class="block_2_1_member">
              <i class="fal fa-user-circle"></i>
              <p>{{my_singleBill.customer ? my_singleBill.customer : 'Thêm khách hàng'}}</p>
            </div>
            <div class="block_2_1_button">
              <button class="times-circle" @click.stop.prevent="handleChangeCustomer">
                <i class="fal fa-times-circle"></i>
              </button>
            </div>
          </div>
          <div class="block_2_1" @click.stop.prevent="$refs.CreateCustomer.open = true" v-else>
            <div class="block_2_1_member">
              <i class="fal fa-user-circle"></i>
              <p>Thêm khách hàng</p>
            </div>
            <div class="block_2_1_button">
              <button class="plus_circle">
                <i class="fal fa-plus-circle"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="block_3" :class="{empty: my_singleBill.products.length == 0}">
          <SingleBill ref="SingleBill" :bill="my_singleBill"></SingleBill>
        </div>
        <div class="block_4" v-if="my_singleBill.products.length > 0">
          <div class="block_4_1">
            <div class="tax">
              <div class="tax_txt">
                <span>Thuế VAT(10%)</span>
              </div>
              <div class="tax_price">
                <b>{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(tax)}}</b>
              </div>
            </div>
            <div class="sub_total">
              <div class="total_txt">
                <p>Tổng tiền</p>
                <span>({{handleQuantity}} sản phẩm)</span>
              </div>
              <div class="total">
                <b>{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(handleTotal)}}</b>
              </div>
            </div>
            <div class="discount">
              <a @click.stop.prevent="$refs.ModalDiscount.open = true">
                <p>Thêm giảm giá</p>
                <div class="icons_plus" v-if="!status_discount">
                  <i class="fal fa-plus-circle"></i>
                </div>
                <div class="discount_1" v-else>-{{my_singleBill.discount_price + my_singleBill.discount_type}}</div>
              </a>
            </div>
          </div>
        </div>
        <div class="block_6">
          <button class="provisional">Tạm tính</button>
          <button class="pay" @click.stop.prevent="openCharge">Thanh toán</button>
        </div>
      </div>
    </div>
    <CreateCustomer ref="CreateCustomer" :bill="my_singleBill"></CreateCustomer>
    <AdjustProduct ref="AdjustProduct"></AdjustProduct>
    <CompCharge :data="my_singleBill" ref="CompCharge"></CompCharge>
    <ModalDiscount ref="ModalDiscount" @handleAddDiscount="handleAddDiscount"></ModalDiscount>
  </div>
</template>

<script>
import CreateCustomer from '../CreateCustomer';
import AdjustProduct from '../AdjustProduct';
import CompCharge from '../CompCharge';
import ModalDiscount from '../ModalDiscount';
import SingleBill from './SingleBill';
export default {
  name: "ContentBill",
  components: {
      CreateCustomer,
      AdjustProduct,
      CompCharge,
      ModalDiscount,
      SingleBill
    },
  data() {
    return {
      data: [
        {
          bill: "HD001",
          products: [],
          customer: null,
          total_price: 0,
          discount_price: 0,
          discount_type: 'VND',
          discount_value: 0,
          seller: localStorage.getItem('name'),
          statusDiscountTotal: false
        }
      ],
      tax: 0,
      obj: {
        name_product: '',
        image: '',
        price: '',
        quantity: ''
      },
      extend_list_bill: false,
      tab: 'HD001',
      modalDelete: false,
      name_customer: '',
      select_customer: false,
      seller: '',
      status_discount: false
    };
  },
  methods: {
    handleChangeCustomer: function(){
      let vm = this;
      vm.select_customer = false;
    },
    openCharge: function(){
      let vm = this;
      if(vm.my_singleBill.products != ''){
        vm.$refs.CompCharge.open = true;
      }else{
        alert('Vui lòng chọn sản phẩm!');
        vm.$forceUpdate();
      };
    },
    scrollToFixed: function(){
      let vm = this;
      let content_bill = document.getElementById("billContent");
      content_bill.onscroll = function(){
        let pageBill = content_bill.scrollTop;
        let bill = document.getElementById('bill');
        if(pageBill > bill.offsetTop){
          bill.classList.add("sticky");
        }else{
          bill.classList.remove("sticky")
        }
      };
    },
    handleAddBill: function(){
      let vm = this;
      if(window.innerWidth > 1439){
        if(vm.data.length > 4){
          vm.extend_list_bill = !vm.extend_list_bill;
        }else{
          vm.multiBill();
        };
      }else{
        if(vm.data.length > 3){
          vm.extend_list_bill = !vm.extend_list_bill;
        }else{
          vm.multiBill();
        };
      }
    },
    multiBill: function(){
      let vm = this;
      for(let i = 0; i < vm.data.length; i++){
        let number = vm.data[i].bill.substr(3,2);
        let k = i + 1;
        let j = number - k;
        if(j > 0){
          let h = k < 10 ? "" + "0" + k : "" + k;
          let new_bill = {
            bill: `HD0${h}`,
            products: [],
            customer: null,
            total_price: 0,
            discount_price: 0,
            discount_type: 'VND',
            discount_value: 0,
            seller: localStorage.getItem('name'),
            statusDiscountTotal: false
          };
          vm.data.push(new_bill);
          let findIndex = vm.totalBill.indexOf(new_bill.bill);
          if(findIndex == -1){
            vm.totalBill.splice(vm.totalBill.length - 1, 1);
            vm.totalBill.push(new_bill);
          }
          vm.tab = new_bill.bill;
          vm.data.sort(function(a,b){
            let number_a = a.bill.substr(3,2);
            let number_b = b.bill.substr(3,2);
            if(number_a < number_b) return -1;
            if(number_a > number_b) return 1;
            return 0;
          });
          break;
        }else if(i == vm.data.length - 1){
          let o = vm.data.length;
          o = o < 9 ? "" + "0" + (o + 1) : "" + (o + 1);
          let new_bill = {
            bill: `HD0${o}`,
            products: [],
            customer: null,
            total_price: 0,
            discount_price: 0,
            discount_type: 'VND',
            discount_value: 0,
            seller: localStorage.getItem('name'),
            statusDiscountTotal: false
          };
          vm.data.push(new_bill);
          let findBill = vm.totalBill.indexOf(new_bill.bill);
          if(findBill == -1){
            vm.totalBill.splice(vm.totalBill.length - 1, 1);
            vm.totalBill.push(new_bill);
          }
          vm.tab = new_bill.bill;
          break;
        }
      };
    },
    handleDeleteBill: function(item,index){
      let vm = this;
      let button = document.getElementById('deleteBill');
      if(vm.data.length > 1){
        let findIndex = vm.data.findIndex(row => row.bill === item.bill);
        if(findIndex > -1){
          vm.data.splice(findIndex, 1);
        }
      };
      if(window.innerWidth > 1439 && vm.data.length < 5){
        vm.extend_list_bill = false;
      }else if(window.innerWidth < 1439 && vm.data.length < 4){
        vm.extend_list_bill = false;
      };
      if(vm.tab == item.bill){
        let popTab = vm.totalBill[vm.totalBill.length - 1];
        vm.tab = popTab.bill;
      }
    },
    handleTab: function(item){
      let vm = this;
      if(vm.data.length > 5){
        let new_bill = {
          bill: item.bill
        };
        let findBill = vm.totalBill.indexOf(item);
        if(findBill == -1){
          let pop = vm.totalBill.pop();
          vm.totalBill.push(new_bill);
        }
        vm.tab = item.bill;
      }else{
        vm.tab = item.bill;
      }
    },
    handleAddDiscount: function(value){
      let vm = this;
      if(value.discount_price != 0){
        vm.status_discount = true;
        vm.my_singleBill.discount_type = value.discount_type;
        vm.my_singleBill.discount_price = value.discount_price;
        vm.$refs.ModalDiscount.open = false;
      }else{
        vm.my_singleBill.discount_type = value.discount_type;
        vm.my_singleBill.discount_price = value.discount_price;
        vm.status_discount = false;
        vm.$refs.ModalDiscount.open = false;
      }
    }
  },
  computed: {
    handleTotal: function(){
      let vm = this;
      let total = null;
      vm.my_singleBill.products.map((item,index) => {
        total += item.price * item.quantity;
        vm.tax = total / 10;
      });
      return total + vm.tax;
    },
    handleQuantity: function(){
      let vm = this;
      let total = 0;
      vm.my_singleBill.products.map((item,index) => {
        total += item.quantity;
      });
      return total;
    },
    totalBill: function(){
      let vm = this;
      let bill;
      if(window.innerWidth > 1439){
        bill = vm.data.slice(0,5);
      }else{
        bill = vm.data.slice(0,4);
      };
      return bill;
    },
    my_singleBill: function(){
      let vm = this;
      let obj = null;
      let findIndex = vm.data.findIndex(item => item.bill === vm.tab);
      obj = vm.data[findIndex];
      return obj;
    }
  },
  mounted: function(){
    let vm = this;
    vm.scrollToFixed();
  },
  created: function(){
    let vm = this;
    vm.seller = localStorage.getItem('name')
  },
  watch: {
    'tab': {
      deep:true,
      handler: function(newval){
        this.$parent.my_tab = newval;
      }
    },
    'my_singleBill': {
      deep: true,
      handler: function(newval){
        this.$parent.$parent.$refs.Print80.obj = newval;
      }
    }
  }
};
</script>

<style>
</style>