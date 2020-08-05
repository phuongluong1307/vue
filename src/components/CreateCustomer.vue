<template>
  <div class="create_customer" :class="open ? 'open' : ''">
        <div class="box" :class="popup ? 'popup' : ''">
            <div class="title"><h3>Thêm khách hàng</h3></div>
            <div class="form">
                <div class="form-group search_customer">
                    <input type="text" v-model="search" placeholder="Tìm kiếm theo tên hoặc số điện thoại" @input="is_searching = true">
                    <div class="searching" v-if="is_searching">Đang tìm kiếm...</div>
                    <div class="result_searching" v-if="is_result">
                        <ul class="list_item" v-if="is_empty">
                            <li class="title">
                                <div class="name">Tên</div>
                                <div class="phone_number">Số điện thoại</div>
                            </li>
                            <li class="item" v-for="(item,index) in list_customer" :key="index" @click.stop.prevent="handleSelect(item)">
                                <div class="name">{{item.name}}</div>
                                <div class="phone_number">{{item.phone_number}}</div>
                            </li>
                        </ul>
                        <div class="searching_empty" v-else>
                            <div class="txt">Không có kết quả tìm kiếm</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="range"><span>Hoặc</span></div>
            <div class="btn_create">
                <button @click.stop.prevent="addCustomer">Tạo mới khách hàng</button>
            </div>
            <div class="cancel" @click.stop.prevent="open = false">
                <button><i class="fal fa-times"></i></button>
            </div>
        </div>
      <div class="mask" @click.stop.prevent="closePopup"></div>
      <AddCustomer ref="AddCustomer"></AddCustomer>
  </div>
</template>

<script>
import AddCustomer from './AddCustomer';
export default {
    components: {
        AddCustomer
    },
    props: ['bill'],
    name: 'CreateCustomer',
    data: function(){
        return {
            open: false,
            popup: false,
            is_searching: false,
            search: '',
            debounce: null,
            is_result: false,
            list_customer: [],
            is_empty: false,
            name_customer: ''
        }
    },
    methods: {
        addCustomer: function(){
            let vm = this;
            vm.popup = true;
            vm.$refs.AddCustomer.open = true;
        },
        loadRecords: function(){
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/customers/',
                headers: {'auth-token': localStorage.getItem('token')},
                params: {
                    keyword: vm.search
                }
            }).then(res => {
                if(res.data.error){

                }else{
                    vm.list_customer = res.data.data.docs;
                    if(res.data.data.docs.length != 0){
                        vm.is_empty = true;
                    }else{
                        vm.is_empty = false;
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        },
        handleSelect: function(item){
            let vm = this;
            vm.$parent.select_customer = true;
            vm.bill.customer = item.name;
            vm.search = '';
            vm.closePopup();
        },
        closePopup: function(){
            let vm = this;
            vm.open = false;
            vm.is_result = false;
            vm.is_empty = false;
            vm.is_searching = false;
            vm.popup = false;
        }
    },
    watch: {
        search(newval, oldval){
            let vm = this;
            clearTimeout(vm.debounce);
            vm.debounce = setTimeout(function(){
                vm.loadRecords();
                vm.is_searching = false;
                vm.is_result = true;
                if(newval == ''){
                    vm.is_result = false;
                }
            }, 500)
        }
    }
}
</script>

<style>

</style>