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
            <input type="text" placeholder="Tìm tên hoặc mã sản phẩm" />
          </div>
          <div class="scan">
            <button class="btn_scan active" @click.stop.prevent="scan = !scan"><i class="fal fa-barcode-read"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div class="block_2">
      <div class="block_2_1">
        <div class="block_2_1_1">
          <div class="item item_txt">
            <p>Tìm kiếm</p><b>{{arr.length}}</b><p>kết quả</p>
          </div>
          <div class="item item_filter">
            <p>Cà phê</p>
            <span><i class="fal fa-times"></i></span>
          </div>
          <div class="item item_filter">
            <p>Cà phê</p>
            <span><i class="fal fa-times"></i></span>
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
          <div class="product">
            <div class="list_item" v-for="word in sortAlpha" :class="'list_' + word" :key="word">
              <div class="title">{{word}}</div>
              <div class="item" v-for="(item, index) in handleAlpha(word)" :key="item.id" @click.stop.prevent="handleItem(item)">
                <div class="item_box">
                  <div class="item_image" :class="index%2==0 ? 'by-height' : 'by-width'">
                    <img :src="item.image" />
                  </div>
                  <div class="item_info">
                    <p class="name">{{item.name_product}}</p>
                    <p class="price">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scan_qr" v-if="scan">
        <div class="scan_qr_1">
          <p>Đang kích hoạt chế độ quét mã vạch</p>
          <img src="https://file.hstatic.net/1000246569/file/1_b9a45066e30341189f2127cd73c0d080_grande.jpeg" alt="">
        </div>
        <div class="scan_qr_mask"></div>
      </div>
      <div class="extend_filter" :class="extend_filter ? 'extend-filter-opened' : ''">
        <ul class="extend_filter_1">
          <li class="extend_filter_1_1 extend_filter_1_1_1">
            <select>
              <option value="0">Vui lòng chọn sản phẩm</option>
              <option value="1">Cà phê</option>
            </select>
          </li>
          <li class="extend_filter_1_1 extend_filter_1_1_1">
            <select>
              <option value="0">Sản phẩm bán chạy</option>
              <option value="1">Cà phê</option>
            </select>
          </li>
          <li class="extend_filter_1_1 extend_filter_1_1_1">
            <select>
              <option value="0">Sản phẩm bán trong ngày</option>
              <option value="1">Cà phê</option>
            </select>
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
              <li>
                  <label class="label_checkbox">Cà phê
                      <input type="checkbox" class="checkbox_category" name="checkbox1" value="Cà phê" v-model="checkbox">
                      <span class="check_tax"></span>
                  </label>
              </li>
              <li>
                  <label class="label_checkbox">Nước giải khát
                      <input type="checkbox" class="checkbox_category" name="checkbox2" value="Nước giải khát" v-model="checkbox">
                      <span class="check_tax"></span>
                  </label>
              </li>
              <li>
                  <label class="label_checkbox">Sinh tố
                      <input type="checkbox" class="checkbox_category" name="checkbox3" value="Sinh tố" v-model="checkbox">
                      <span class="check_tax"></span>
                  </label>
              </li>
              <li>
                  <label class="label_checkbox">Thuốc lá
                      <input type="checkbox" class="checkbox_category" name="checkbox4" value="Thuốc lá" v-model="checkbox">
                      <span class="check_tax"></span>
                  </label>
              </li>
            </ul>
          </li>
          <div class="button_filter">
            <button>Lọc</button>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    
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
      arr: [
        {
          id: 1,
          name_product: "Cà phê đá",
          image: "https://comgasg.com/wp-content/uploads/2019/11/cafe-da-3.jpg",
          price: 15000
        },
        {
          id: 2,
          name_product: "Cà phê sữa",
          image:
            "https://media.cooky.vn/recipe/g1/2022/s320x320/recipe2022-prepare-step11-635711695846648568.jpg",
          price: 15000
        },
        {
          id: 21,
          name_product: "Cà phê sữa",
          image:
            "https://media.cooky.vn/recipe/g1/2022/s320x320/recipe2022-prepare-step11-635711695846648568.jpg",
          price: 15000
        },
        {
          id: 3,
          name_product: "Cà phê sữa",
          image:
            "https://media.cooky.vn/recipe/g1/2022/s320x320/recipe2022-prepare-step11-635711695846648568.jpg",
          price: 15000
        },
        {
          id: 33,
          name_product: "Cà phê sữa",
          image:
            "https://media.cooky.vn/recipe/g1/2022/s320x320/recipe2022-prepare-step11-635711695846648568.jpg",
          price: 15000
        },
        {
          id: 4,
          name_product: "Cà phê sữa",
          image:
            "https://media.cooky.vn/recipe/g1/2022/s320x320/recipe2022-prepare-step11-635711695846648568.jpg",
          price: 15000
        },
        {
          id: 5,
          name_product: "Cà phê sữa",
          image:
            "https://media.cooky.vn/recipe/g1/2022/s320x320/recipe2022-prepare-step11-635711695846648568.jpg",
          price: 15000
        },
        {
          id: 6,
          name_product: "Cà phê sữa",
          image:
            "https://media.cooky.vn/recipe/g1/2022/s320x320/recipe2022-prepare-step11-635711695846648568.jpg",
          price: 15000
        },
        {
          id: 7,
          name_product: "Sinh tố dâu",
          image:
            "https://yeunoitro.net/wp-content/uploads/sinh-to-dau-tay1.jpg",
          price: 15000
        },
        {
          id: 8,
          name_product: "Sinh tố bơ",
          image:
            "https://media.cooky.vn/recipe/g4/36472/s480x480/recipe36472-cook-step3-636692472537038778.JPG",
          price: 15000
        },
        {
          id: 9,
          name_product: "Yogurt",
          image:
            "https://www.washingtonpost.com/rf/image_982w/2010-2019/WashingtonPost/2020/04/09/Food/Images/VhowtoMakeyogurt04.JPG",
          price: 15000
        },
        {
          id: 10,
          name_product: "Aquafina",
          image:
            "https://www.washingtonpost.com/rf/image_982w/2010-2019/WashingtonPost/2020/04/09/Food/Images/VhowtoMakeyogurt04.JPG",
          price: 15000
        },
        {
          id: 21,
          name_product: "D",
          image:
            "https://media.cooky.vn/recipe/g1/2022/s320x320/recipe2022-prepare-step11-635711695846648568.jpg",
          price: 15000
        },
        {
          id: 24,
          name_product: "E",
          image:
            "https://media.cooky.vn/recipe/g1/2022/s320x320/recipe2022-prepare-step11-635711695846648568.jpg",
          price: 15000
        },
        {
          id: 22,
          name_product: "F",
          image:
            "https://media.cooky.vn/recipe/g1/2022/s320x320/recipe2022-prepare-step11-635711695846648568.jpg",
          price: 15000
        },
        {
          id: 23,
          name_product: "G",
          image:
            "https://media.cooky.vn/recipe/g1/2022/s320x320/recipe2022-prepare-step11-635711695846648568.jpg",
          price: 15000
        }
      ],
      alpha: [],
      list_product: null,
      extend_filter: false,
      scan: false,
      checkbox: []
    };
  },
  methods: {
    handleAlpha: function(word) {
      let vm = this;
      let data = [];
      vm.arr.map(item => {
        let val = item.name_product;
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
        name_product: item.name_product,
        price: item.price,
        image: item.image,
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
    alphabet: function() {
      let vm = this;
      vm.arr.map((item, index) => {
        let val = item.name_product;
        let word = val.substr(0, 1);
        if (!vm.alpha.includes(word)) {
          vm.alpha.push(word);
        }
      });
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
      }
    },
    unSelectAll: function(){
      let vm = this;
      let checkbox = document.querySelectorAll('.checkbox_category');
      for(let i = 0; i < checkbox.length;i++){
        checkbox[i].checked = false;
        vm.checkbox.splice(checkbox[i], 1);
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
    }
  },
  watch: {
    alphabet: {
      deep: true,
      handler: function(newval, oldval) {}
    }
  },
  created: function(){
    this.genCharArray('a','z');
    this.alphabet();
  }
};
</script>

<style>
</style>