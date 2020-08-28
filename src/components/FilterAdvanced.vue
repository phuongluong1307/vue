<template>
    <div class="filter_advanced" :class="open ? 'open' : ''">
        <div class="container box">
            <div class="filter_advanced_1">
                <ul class="filter_advanced_1_1">
                    <li class="filter_advanced_1_1_1">
                        <Datepicker class="date_picker" v-model="$parent.filters.date" :language="vi" placeholder="Tìm theo ngày" input-class="input_picker"></Datepicker>
                    </li>
                    <li class="filter_advanced_1_1_1">
                        <div class="select_multi">
                            <div class="selecter" @click.stop.prevent="showEvent">
                                <input type="text" class="text" placeholder="Loại người dùng" ref="customer" autocomplete="off" readonly="readonly" :value="inputCustomer">
                                <div class="icon"><i class="fal fa-chevron-down"></i></div>
                                <div class="select_box" v-show="select">
                                    <ul>
                                        <li class="select_item" v-for="item in data" :key="item._id" @click.stop.prevent="selectCustomer(item)">
                                            <a>{{item.name}}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="filter_advanced_2">
                <div class="nope" v-if="!filter">
                    <div class="filter">Vui lòng chọn để tìm kiếm</div>
                    <div class="icons_filter"><i class="fal fa-th-list"></i></div>
                </div>
                <div class="filter_advanced_2_1" v-else>
                    <div class="list_order">
                        <div class="item" v-for="(item, index) in arr" :key="index" @click.stop.prevent="handleSelect(item)">
                            <div class="code_bill">
                                <p>HD: {{item.code_bill}}</p>
                                <p>{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.total_price)}}</p>
                            </div>
                            <div class="time_bill">
                                <p>{{item.date}}</p>
                            </div>
                            <div class="invoice">
                                <p>Khách hàng: {{ item.customer ? item.customer.name : '' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cancel" @click.stop.prevent="open = false">
                <button><i class="fal fa-times"></i></button>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="open = false"></div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {en, vi} from 'vuejs-datepicker/dist/locale';
import SelectMulti from './SelectMulti';
export default {
    components: {
        Datepicker,
        SelectMulti
    },
    props: ['arrFilters'],
    name: 'FilterAdvanced',
    data: function(){
        return {
            open: false,
            en: en,
            vi: vi,
            filter: false,
            select: false,
            data: null,
            arr: null,
            inputCustomer: ''
        }
    },
    methods: {
        showEvent: function(){
            let vm = this;
            vm.select = !vm.select;
        },
        selectCustomer: function(item){
            let vm = this;
            vm.select = false;
            vm.inputCustomer = item.name;
            vm.$parent.filters.customer_id = item._id;
        },
        hideEvent: function(){
            let vm = this;
            vm.select = false;
        },
        loadCustomer: function(){
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/customers',
                headers: {'auth-token': localStorage.getItem('token')}
            }).then(res => {
                vm.data = res.data.data.docs;
            }).catch(err => {
                console.log(err)
            })
        },
        handleSelect: function(item){
            let vm = this;
            vm.$parent.handleSelectBill(item);
            vm.open = false;
        }
    },
    created: function(){
        let vm = this;
        // vm.loadCustomer();
        vm.arr = vm.arrFilters;
    },
    watch: {
        'arrFilters': {
            deep: true,
            handler: function(newval){
                let vm = this;
                vm.arr = newval;
                if(newval.length != 0){
                    vm.filter = true;
                }else{
                    vm.filter = false;
                }
            }
        }
    }
}
</script>

<style>

</style>