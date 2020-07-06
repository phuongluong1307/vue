<template>
  <div class="content_bill">
    <div class="block_1">
      <div class="block_1_1">
        <div class="block_tab">
          <ul>
            <li>Tên nhân viên</li>
          </ul>
        </div>
        <div class="block_bar">
          <button>
            <i class="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="block_5">
      <div class="block_5_1">
        <ul>
          <div>
            <li class="tab">
              <a><span>#1</span></a>
              <span class="close_tab"><i class="fas fa-times"></i></span>
            </li>
          </div>
          <li class="add_bill">
            <a><i class="fas fa-plus"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="block_2">
      <div class="block_2_1" @click.stop.prevent="$refs.CreateCustomer.open = true">
        <div class="block_2_1_member">
          <i class="fas fa-user-circle"></i>
          <p>Thêm khách hàng</p>
        </div>
        <div class="block_2_1_button">
          <button class="plus_circle">
            <i class="fas fa-plus-circle"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="block_3" :class="{empty: $parent.data.length == 0}">
      <div class="block_3_bill">
        <div class="cart_empty" v-if="$parent.data.length == 0">
          <i class="fas fa-shopping-cart"></i>
          <p>Không có sản phẩm trong giỏ hàng</p>
          <p>Vui lòng tìm và chọn sản phẩm thêm vào</p>
        </div>
        <div class="cart_product" v-else>
          <div class="list_item">
            <div class="item" v-for="(item, index) in $parent.data" :key="index" @click.stop.prevent="handleAdjust(item)">
              <div class="delete" @click.stop.prevent="deleteItem(index)">
                <i class="fas fa-times"></i>
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
    </div>
    <div class="block_4" v-if="$parent.data.length > 0">
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
          <a>
            <p>Thêm giảm giá</p>
            <i class="fas fa-plus-circle"></i>
          </a>
        </div>
      </div>
    </div>
    <!-- <div class="block_5">
      <div class="block_5_discount">
        <div class="form-group">
          <div class="found_user">
            <i class="fas fa-search"></i>
            <input type="text" class="form-control" placeholder="Tìm khách hàng" />
          </div>
        </div>
        <div class="form-group">
          <div class="discount">
            <label>Giảm giá:</label>
            <input type="text" placeholder="Nhập ở đây..." />
            <button>Đồng ý</button>
          </div>
        </div>
        <div class="form-group">
          <div class="total">
            <label>
              <strong>Tổng tiền:</strong>
            </label>
            <div>{{ handleTotal ? handleTotal : 0 }}</div>
          </div>
        </div>
        <div class="form-group">
          <div class="paying">
            <div>
              <label>
                <span>Hình thức thanh toán:</span>
                <span>Tiền mặt</span>
              </label>
            </div>
            <div class="payment">
              <input type="text" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="note">
            <i class="fas fa-pencil-alt"></i>
            <input type="text" class="form-control" placeholder="Ghi chú" />
          </div>
        </div>
      </div>
    </div> -->
    <div class="block_6">
      <button class="provisional">Tạm tính</button>
      <button class="pay">Thanh toán</button>
    </div>
    <CreateCustomer ref="CreateCustomer"></CreateCustomer>
    <AdjustProduct ref="AdjustProduct"></AdjustProduct>
  </div>
</template>

<script>
import CreateCustomer from '../CreateCustomer';
import AdjustProduct from '../AdjustProduct';
export default {
  name: "ContentBill",
  components: {
      CreateCustomer,
      AdjustProduct
    },
  data() {
    return {
      data: 4,
      tax: 0,
      obj: {
        name_product: '',
        image: '',
        price: '',
        quantity: ''
      }
    };
  },
  methods: {
    deleteItem: function(index){
      let vm = this;
      vm.$parent.data.splice(index, 1)
    },
    handleAdjust: function(item){
      let vm = this;
      vm.obj = item;
      vm.$refs.AdjustProduct.quantity = item.quantity.toString();
      vm.$refs.AdjustProduct.open = true;
    }
  },
  computed: {
    handleTotal: function(){
      let vm = this;
      let total = null;
      vm.$parent.data.map((item,index) => {
        total += item.price * item.quantity;
        vm.tax = total / 10;
      });
      return total + vm.tax;
    },
    handleQuantity: function(){
      let vm = this;
      let total = 0;
      vm.$parent.data.map((item,index) => {
        total += item.quantity;
      });
      return total;
    }
  },
  watch: {
    
  }
};
</script>

<style>
</style>