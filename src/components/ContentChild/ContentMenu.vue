<template>
  <div class="content_menu">
    <div class="block_1">
      <div class="block_1_2">
        <div class="block_1_2_1">
          <div class="btn_bars">
            <button @click.stop.prevent="$parent.$parent.open_menu_bar = true"><i class="fal fa-bars"></i></button>
          </div>
          <div class="name_store" @click.stop.prevent="$parent.$parent.$refs.ListStore.open = true">Soul Master</div>
        </div>
      </div>
      <div class="block_1_1">
        <div class="block_1_1_1">
          <div class="search">
            <i class="fal fa-search" @click.stop.prevent="handleInput"></i>
            <input type="text" placeholder="Tìm tên hoặc mã sản phẩm" v-model="search" @input="isSearching = true" />
            <div class="searching" v-if="isSearching">Đang tìm kiếm</div>
          </div>
          <div class="scan">
            <button class="btn_scan" :class="scan ? 'active' : '' " @click.stop.prevent="scan = !scan"><i class="fal fa-barcode-read"></i></button>
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
            <div class="item item_filter" v-if="allCategory">
              <p>Tất cả</p>
              <span @click.stop.prevent="deleteFilter('all', 3)"><i class="fal fa-times"></i></span>
            </div>
            <div class="item item_filter" v-for="(item,index) in list_select_category" :key="index" v-else>
              <p>{{item}}</p>
              <span @click.stop.prevent="deleteFilter(item,index)"><i class="fal fa-times"></i></span>
            </div>
          </div>
        </div>
        <div class="block_2_1_2" @click.stop.prevent="extend_filter = !extend_filter">
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
                    <img :src="item.thumbnail" />
                  </div>
                  <div class="item_info">
                    <p class="name">{{item.product_name}}</p>
                    <p class="price">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SearchProduct ref="SearchProduct" v-else></SearchProduct>
        </div>
      </div>
      <div class="scan_qr" v-if="scan">
        <div class="scan_qr_1">
          <p>Đang kích hoạt chế độ quét mã vạch</p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png" alt="">
        </div>
        <div class="scan_qr_mask"></div>
      </div>
      <div class="extend_filter" :class="extend_filter ? 'extend-filter-opened' : ''">
        <ul class="extend_filter_1">
          <li class="extend_filter_1_1 extend_filter_1_1_1">
            <SelectMulti title="Vui lòng chọn sản phẩm" :status="false" :data="category"></SelectMulti>
          </li>
          <li class="extend_filter_1_1 extend_filter_1_1_1">
            <SelectMulti title="Sản phẩm bán chạy" :status="false" :data="category"></SelectMulti>
          </li>
          <li class="extend_filter_1_1 extend_filter_1_1_1">
            <SelectMulti title="Sản phẩm bán trong ngày" :status="false" :data="selling"></SelectMulti>
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
export default {
  components: {
    SelectMulti,
    SearchProduct
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
      allCategory: false,
      isSearching: false,
      filter_product: []
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
        vm.checkbox.push(checkbox[i].value)
      };
    },
    unSelectAll: function(){
      let vm = this;
      let checkbox = document.querySelectorAll('.checkbox_category');
      for(let i = 0; i < checkbox.length;i++){
        checkbox[i].checked = false;
        vm.checkbox.splice(checkbox[i], 1);
      };
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
        if(vm.list_category.length == vm.checkbox.length){
          vm.allCategory = true;
          vm.loadProduct();
        }else{
          vm.allCategory = false;
          let arr_filter = [];
          vm.checkbox.map((item) => {
            if(!vm.list_select_category.includes(item)){
              vm.list_select_category.push(item)
            };
            vm.filter_product.map(row => {
              if(item == row.category){
                arr_filter.push(row);
              }
            });
          });
          vm.filter = true;
          return vm.arr_product = arr_filter;
        }
      }else{
        vm.filter = false;
        vm.loadProduct();
      }
    },
    deleteFilter: function(item,index){
      let vm = this;
      if(item == 'all'){
        vm.checkbox.splice(0, vm.checkbox.length);
        vm.allCategory = false;
      };
      let findIndex = vm.list_select_category.indexOf(item);
      vm.list_select_category.splice(findIndex,1);
      vm.checkbox.splice(findIndex, 1);
      vm.handleFilter();
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
    }
  },
  created: function(){
    this.genCharArray('a','z');
    this.loadProduct();
  },
  mounted: function(){
    
  }
};
</script>

<style>
</style>