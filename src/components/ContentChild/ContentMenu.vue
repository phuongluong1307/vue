<template>
  <div class="content_menu">
    <div class="block_1">
      <div class="block_1_2">
        <div class="block_1_2_1">
          <div class="btn_bars">
            <button @click.stop.prevent="$parent.$parent.open_menu_bar = true"><i class="fal fa-bars"></i></button>
          </div>
          <div class="name_store" @click.stop.prevent="$parent.$parent.$refs.ListStore.open = false">{{nameBranch}}</div>
        </div>
      </div>
      <div class="block_1_1">
        <div class="block_1_1_1">
          <div class="search">
            <i class="fal fa-search" @click.stop.prevent="handleInput"></i>
            <input type="text" placeholder="Tìm tên hoặc mã sản phẩm" v-model="search" @input="isSearching = true" />
            <div class="searching" v-if="isSearching">Đang tìm kiếm</div>
          </div>
          <div class="shortcut_key">
            <div class="shortcut_key_1" @click.stop.prevent="displayShortcut = !displayShortcut">
              <div class="shortcut_key_icons"><i class="fal fa-exclamation-circle"></i></div>
              <div class="title">Danh sách phím tắt</div>
            </div>
            <div class="list_key" v-if="displayShortcut">
              <ul>
                <li class="key_item">(F2) In hóa đơn</li>
                <li class="key_item">(F4) Bật quét mã vạch</li>
                <li class="key_item">(F7) Danh sách hóa đơn</li>
                <li class="key_item">(F9) Danh sách sản phẩm</li>
              </ul>
            </div>
          </div>
          <div class="scan">
            <button class="btn_scan" :class="scan ? 'active' : '' " @click.stop.prevent="handleOpenBarcode"><i class="fal fa-barcode-read"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div class="block_2">
      <div class="block_2_1">
        <div class="block_2_1_1">
          <div class="item item_txt">
            <p>Tìm kiếm</p><b>{{arr_product.length}}</b><p>kết quả</p>
          </div>
          <div class="block_2_1_1_1" v-if="filter_category">
            <div class="item item_filter" v-for="(item,index) in list_select_category" :key="index">
              <p>{{item}}</p>
              <span @click.stop.prevent="deleteFilter(item,index)"><i class="fal fa-times"></i></span>
            </div>
          </div>
        </div>
        <div class="block_2_1_2" @click.stop.prevent="handleExtendFilter">
          <a class="filter">
            <i class="fal fa-filter"></i>
            Lọc sản phẩm
          </a>
        </div>
      </div>
    </div>
    <div class="block_3" id="style-block3">
      <!-- <div class="overflow_scroll"></div> -->
      <div class="block_3_1">
        <div class="block_3_1_1 block_item">
          <div class="alphabet">
            <ul class="list_alpha">
              <li class="word" v-for="row in listAlpha" :key="row">
                <a @click.stop.prevent="scrollItem(row)">{{row.toUpperCase()}}</a>
              </li>
            </ul>
          </div>
          <div class="product" v-if="filter == false">
            <div class="list_item" v-for="word in sortAlpha" :class="'list_' + word" :key="word">
              <div class="title">{{word}}</div>
              <div class="item" v-for="(item, index) in handleAlpha(word)" :key="item.id" @click.stop.prevent="handleItem(item)">
                <div class="item_box">
                  <div class="item_image" :class="index%2==0 ? 'by-height' : 'by-width'">
                    <img :src="$root.API_GATE + item.thumbnail" />
                  </div>
                  <div class="item_info">
                    <div class="name">{{item.product_name}}</div>
                    <div class="price">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SearchProduct ref="SearchProduct" v-else></SearchProduct>
        </div>
      </div>
      <div class="scan_qr" @click.stop.prevent="handleAutoFocus" v-if="scan">
        <div class="scan_qr_1">
          <p>Đang kích hoạt chế độ quét mã vạch</p>
          <input type="text" ref="inputBarcode" v-model="barcode_id" @keyup.enter="handleBarcode" placeholder="Nhập mã barcode" >
          <div v-if="showBarcode">
            <SvgBarcode v-model="barcode_show"></SvgBarcode>
          </div>
        </div>
        <div class="scan_qr_mask"></div>
      </div>
      <div class="extend_filter" :class="extend_filter ? 'extend-filter-opened' : ''">
        <ul class="extend_filter_1">
          <li class="extend_filter_1_1 extend_filter_1_1_1">
            <SelectMulti title="Vui lòng chọn sản phẩm" ref="SelectMulti1" :data="category"></SelectMulti>
          </li>
          <li class="extend_filter_1_1 extend_filter_1_1_1">
            <SelectMulti title="Sản phẩm bán chạy" ref="SelectMulti2" :data="category"></SelectMulti>
          </li>
          <li class="extend_filter_1_1 extend_filter_1_1_1">
            <div class="select_multi">
              <div class="selecter" @click.stop.prevent="select = !select">
                <div class="text">{{item == "" ? "Sản phẩm bán trong ngày" : item}}</div>
                <div class="icon"><i class="fal fa-chevron-down"></i></div>
                <div class="select_box" v-if="select">
                  <ul v-if="invoiceOfDate.length == 0">
                    <li style="text-align:center;padding:5px 0;">Chưa có sản phẩm</li>
                  </ul>
                  <ul v-else>
                    <li class="title">
                      <div class="title_1">
                        <div>Sản phẩm</div>
                        <div>SL</div>
                      </div>
                    </li>
                    <li class="select_item" v-for="(item,index) in data" :key="index" @click.stop.prevent="selectProduct(item)">
                      <div class="list_product">
                        <div class="product">{{item}}</div>
                        <div class="quantity">{{item}}</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li class="extend_filter_1_1 extend_filter_1_1_2">
            <div class="extend_filter_1_1_2_1">
              <a class="filter_link">Danh mục</a>
              <div class="input_select">
                <label for="un_selectAll" class="select_all">Bỏ chọn</label>
                <input type="checkbox" id="un_selectAll" @click.stop.prevent="unSelectAll" style="display:none;">
                <label for="selectAll" class="select_all">Chọn tất cả</label>
                <input type="checkbox" id="selectAll" @click.stop.prevent="selectCheckAll" style="display:none;">
              </div>
            </div>
            <ul class="list_category">
              <li v-for="(item, index) in list_category" :key="index">
                <label class="label_checkbox">{{item.category_name}}
                    <input type="checkbox" class="checkbox_category" name="checkbox1" :value="item.category" v-model="checkbox">
                    <span class="check_tax"></span>
                </label>
              </li>
            </ul>
          </li>
          <div class="button_filter">
            <button @click.stop.prevent="handleFilter">Lọc</button>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SelectMulti from '../SelectMulti';
import SearchProduct from './SearchProduct';
import SvgBarcode from '@/components/Product/SvgBarcode';
export default {
  components: {
    SelectMulti,
    SearchProduct,
    SvgBarcode
  },
  name: "ContentMenu",
  data() {
    return {
      data: [
        {
          name: "phuong",
          age: 18
        },
        {
          name: "phuong1",
          age: 19
        }
      ],
      alpha: [],
      list_product: null,
      list_select_category: [],
      extend_filter: false,
      scan: false,
      checkbox: [],
      select: false,
      category: ["Cà phê", "Sinh tố", "Giải khát"],
      selling: ["Cà phề", "Thuốc lá"],
      arr_product: [],
      search: '',
      filter: false,
      debounce: null,
      arr_filter: [],
      filter_category: false,
      isSearching: false,
      filter_product: [],
      nameBranch: '',
      barcode_id: '',
      showBarcode: false,
      barcode_show: '',
      displayShortcut: false,
      item: '',
      listInvoice: [],
    };
  },
  methods: {
    handleAlpha: function(word) {
      let vm = this;
      let data = [];
      vm.arr_product.map(item => {
        let val = item.product_name;
        let val_word = val.substr(0, 1);
        if (val_word === word) {
          data.push(item);
        }
      });
      return data;
    },
    handleItem: function(item) {
      let vm = this;
      let obj = {
        id: item.id,
        product_name: item.product_name,
        price: item.price,
        image: item.thumbnail,
        quantity: 1
      };
      vm.$emit("handleData", obj);
    },
    genCharArray: function(charA, charZ){
      var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
      for (; i <= j; ++i) {
          a.push(String.fromCharCode(i));
      };
      return a;
    },
    scrollItem: function(item){
      let div = document.querySelector(`.list_${item.toUpperCase()}`);
      if(!div){
        alert('Không có sản phẩm theo tên đã chọn')
      }else{
        div.scrollIntoView({
          behavior: 'smooth'
        })
      }
    },
    selectCheckAll: function(){
      let vm = this;
      let checkbox = document.querySelectorAll('.checkbox_category');
      for(let i = 0; i < checkbox.length;i++){
        checkbox[i].checked = true;
        if(!vm.checkbox.includes(checkbox[i].value)){
          vm.checkbox.push(checkbox[i].value);
        };
      };
    },
    unSelectAll: function(){
      let vm = this;
      let checkbox = document.querySelectorAll('.checkbox_category');
      // for(let i = 0; i < checkbox.length;i++){
      //   checkbox[i].checked = false;
      //   vm.checkbox.splice(checkbox[i], 1); 
      // };
      vm.checkbox = [];
    },
    loadProduct: function(){
      let vm = this;
      vm.axios({
        method: "GET",
        url: vm.$root.API_GATE + '/api/products',
        headers: {'auth-token': localStorage.getItem('token')},
        params: {
          keyword: vm.search
        }
      }).then(res => {
        let result = res.data.data;
        vm.filter_product = result.docs;
        vm.arr_product = result.docs;
      }).catch(err => {
        console.log(err)
      })
    },
    handleFilter: function(){
      let vm = this;
      vm.filter_category = true;
      vm.extend_filter = false;
      if(vm.checkbox.length != 0){
        if(vm.list_category.length == 0){
          vm.loadProduct();
        }else{
          let arr_filter = [];
          vm.checkbox.map((item) => {
            vm.filter_product.map(row => {
              if(item == row.category && !arr_filter.includes(row)){
                arr_filter.push(row);
              }
            });
          });
          vm.filter = true;
          vm.list_select_category = vm.checkbox;
          vm.arr_product = arr_filter;
        }
      }else{
        vm.list_select_category = [];
        vm.filter = false;
        vm.loadProduct();
      }
    },
    deleteFilter: function(item,index){
      let vm = this;
      if(item == 'all'){
        vm.checkbox.splice(0, vm.checkbox.length);
      };
      let findIndex = vm.list_select_category.indexOf(item);
      vm.checkbox.splice(findIndex, 1);
      vm.handleFilter();
    },
    handleExtendFilter: function(){
      let vm = this;
      vm.extend_filter = !vm.extend_filter;
      vm.checkbox = vm.list_select_category;
    },
    handleBarcode: function(){
      let vm = this;
      vm.axios({
        method: "GET",
        url: vm.$root.API_GATE + '/api/products/',
        headers: {'auth-token': localStorage.getItem('token')},
        params: {
          barcode_id: vm.barcode_id
        }
      }).then(res => {
        vm.showBarcode = true;
        vm.barcode_show = vm.barcode_id;
        if(res.data.error){

        }else{
          if(res.data.data.docs.length > 0){
            vm.barcode_id = "";
            vm.handleItem(res.data.data.docs[0]);
            clearTimeout(vm.debounce);
            vm.debounce = setTimeout(function(){
              vm.showBarcode = false;
              vm.barcode_show = "";
            },1000)
          }else{
            
          };
        };
      }).catch(err => {
        console.log(err)
      })
    },
    handleOpenBarcode: function(){
      let vm = this;
      vm.scan = !vm.scan;
      window.removeEventListener('keyup', vm.myFunction);
      vm.$nextTick(function(){
        if(vm.$refs.inputBarcode){
          vm.$refs.inputBarcode.focus();
        };
      })
    },
    handleAutoFocus: function(){
      let vm = this;
      if(vm.$refs.inputBarcode){
        vm.$refs.inputBarcode.focus();
      };
    },
    myFunction: function(event){
      let vm = this;
      if(event.keyCode == 27){
        vm.handleOpenBarcode();
      }
    },
    shortCutWindow: function(e){
      let vm = this;
      let keyCode = e.keyCode;
      switch (keyCode) {
        case 113:
          
          break;
        case 115:
          vm.handleOpenBarcode();
          break;
        case 118:
          vm.$parent.$parent.$refs.ExtendBar.handleOrder();
          break;
        case 120:
          
          break;
      
        default:
          break;
      }
    }
  },
  computed: {
    sortAlpha: function() {
      let vm = this;
      return vm.alpha.sort();
    },
    listAlpha: function(){
      let vm = this;
      return vm.genCharArray('a','z');
    },
    alphabet: function() {
      let vm = this;
      if(vm.arr_product.length > 1){
        vm.arr_product.map((item, index) => {
          let val = item.product_name;
          let word = val.substr(0, 1);
          if (!vm.alpha.includes(word)) {
            vm.alpha.push(word);
          }
        });
      }
    },
    list_category: function(){
      let vm = this;
      let arr_category = [];
      vm.$root.list_category.map((item) => {
        if(!arr_category.includes(item._id)){
          arr_category.push(item)
        }
      });
      return arr_category;
    },
    getInvoiceOfDate: function(){
      let vm = this;
      let data = new Date();
      let date;
      if(vm.listInvoice.length > 0){
        vm.listInvoice.map((item,index) => {

        })
      }
    }
  },
  watch: {
    alphabet: {
      deep: true,
      handler: function(newval, oldval) {}
    },
    'search': {
      deep: true,
      handler: function (newVal, oldVal) {
        let vm = this;
        clearTimeout(vm.debounce);
        vm.debounce = setTimeout(function () {
          vm.filter = true;
          vm.loadProduct();
          vm.isSearching = false;
          if(newVal === ""){
            vm.filter = false;
          }
        }, 500);
      }
    },
    extend_filter(newval,oldval){
      let vm = this;
      if(vm.extend_filter){
        document.getElementById('style-block3').style.overflow = 'hidden';
      }else{
        document.getElementById('style-block3').style.overflow = 'auto';
      }
    },
    'scan': {
      deep: true,
      handler: function(newval){
        let vm = this;
        if(newval){
          window.addEventListener('keyup', vm.myFunction)
        }
      }
    }
  },
  created: function(){
    let vm = this;
    this.genCharArray('a','z');
    this.loadProduct();
    if(localStorage.getItem('nameBranch')){
      vm.nameBranch = localStorage.getItem('nameBranch');
    };
  },
  mounted: function(){
    let vm = this;
    window.addEventListener('keyup', vm.shortCutWindow);
  },
  destroyed: function(){
    let vm = this;
    window.removeEventListener('keyup', vm.shortCutWindow)
  }
};
</script>

<style>
</style>