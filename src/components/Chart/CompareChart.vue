<template>
    <div>
        <div class="card-text">Bảng so sánh giữa các tháng</div>
        <div class="container compare_chart">
            <div class="select_multi">
                <div class="selecter" @click.stop.prevent="showEvent" style="width:250px;">
                    <input type="text" class="text" ref="customer" autocomplete="off" readonly="readonly" :value="inputBranch">
                    <div class="icon"><i class="fal fa-chevron-down"></i></div>
                    <div class="select_box" v-if="select">
                        <ul>
                            <li class="select_item" v-for="item in listBranch" :key="item.id" @click.stop.prevent="selectBranch(item)">
                                <a>{{item.name}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <MonthPickerInput ref="monthPicker1" v-model="filter.month1" lang="vi"></MonthPickerInput>
            <MonthPickerInput ref="monthPicker2" v-model="filter.month2" lang="vi"></MonthPickerInput>
        </div>
        <div class="table_compare_chart" v-if="handleDataOfFilter.length > 0">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th rowspan="2">#</th>
                        <th rowspan="2">Chi nhánh</th>
                        <th colspan="2">Số đơn</th>
                        <th colspan="2">Doanh thu</th>
                        <th rowspan="2" class="profit">Lợi nhuận tháng {{ filter.month1.monthIndex }}</th>
                        <th rowspan="2" class="profit">Lợi nhuận tháng {{ filter.month2.monthIndex }}</th>
                        <th rowspan="2">Tỉ lệ tăng trưởng</th>
                    </tr>
                    <tr>
                        <th>Tháng {{ filter.month1.monthIndex }}</th>
                        <th>Tháng {{ filter.month2.monthIndex }}</th>
                        <th>Tháng {{ filter.month1.monthIndex }}</th>
                        <th>Tháng {{ filter.month2.monthIndex }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in handleDataOfFilter" :key="index">
                        <td>{{ index+1 }}</td>
                        <td>{{ item.branch }}</td>
                        <td>{{ item.quantity1 || 0 }}</td>
                        <td>{{ item.quantity2 || 0 }}</td>
                        <td>{{ $root.formatMoney(item.total_price1 || 0) }}</td>
                        <td>{{ $root.formatMoney(item.total_price2 || 0) }}</td>
                        <td>{{ $root.formatMoney(item.total_price1 || 0) }}</td>
                        <td>{{ $root.formatMoney(item.total_price2 || 0) }}</td>
                        <td v-if="item.rate > 0" style="color:green;">+{{ item.rate || 0 }}%</td>
                        <td v-else style="color:red;">{{ item.rate || 0 }}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { MonthPickerInput  } from 'vue-month-picker'
export default {
    components: {
        MonthPickerInput 
    },
    name: 'CompareChart',
    data(){
        return {
            filter: {
                month1: null,
                month2: null
            },
            resultMonth1: null,
            resultMonth2: null,
            dataOfFilter: null,
            listBranch: [],
            select: false,
            inputBranch: '',
            objBranch: null,
            statusPush: true,
            arrayAllId: [],
            month: [],
            arrFilter: [],
            sortMonth: []
        }
    },
    methods: {
        showEvent: function(){
            this.select = !this.select;
        },
        selectBranch: function(item){
            this.select = false;
            this.inputBranch = item.name;
            this.objBranch = item;
        },
        loadInvoiceByMonth: function(month1, month2, input){
            let vm = this;
            if(month1 && month2){
                var month_1 = {
                    month: month1.monthIndex,
                    year: month1.year
                };
                var month_2 = {
                    month: month2.monthIndex,
                    year: month2.year
                };
            };
            let month = [];
            month.push(month_1, month_2);
            vm.month = month;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/invoices',
                headers: {'auth-token': localStorage.getItem('token')},
                params: {
                    arrMonth: month,
                    listBranch: input == 'Tất cả' ? vm.arrayAllId : vm.objBranch._id
                }
            }).then(res => {
                if(res.data.error){

                }else{
                    vm.dataOfFilter = res.data.data;
                }
            }).catch(err => {
                console.log(err)
            });
        }
    },
    computed: {
        handleDataOfFilter: function(){
            let vm = this;
            let arr = [];
            if(vm.dataOfFilter){
                vm.dataOfFilter.map(row => {
                    let findIndexBranch = arr.findIndex(i => i.branch == row.branch.name);
                    let date = (new Date(row.date));
                    if(findIndexBranch > -1){
                        if('month1' in arr[findIndexBranch] && arr[findIndexBranch].month1 == (date.getMonth() + 1) && arr[findIndexBranch].month1 == vm.filter.month1.monthIndex){
                            arr[findIndexBranch].total_price1 += row.total_price;
                            arr[findIndexBranch].quantity1 += 1;
                        }else{
                            if('month2' in arr[findIndexBranch] && arr[findIndexBranch].month2 == (date.getMonth() + 1) && arr[findIndexBranch].month2 == vm.filter.month2.monthIndex){
                                arr[findIndexBranch].total_price2 += row.total_price;
                                arr[findIndexBranch].quantity2 += 1;
                            }else{
                                arr[findIndexBranch].month2 = (date.getMonth() + 1);
                                arr[findIndexBranch].year2 = date.getFullYear();
                                arr[findIndexBranch].total_price2 = row.total_price;
                                arr[findIndexBranch].quantity2 = 1;
                            }
                        };
                    }else{
                        arr.push({
                            branch: row.branch.name,
                            month1: date.getMonth() + 1,
                            year1: date.getFullYear(),
                            total_price1: row.total_price,
                            quantity1: 1
                        })
                    };
                });
            };
            if(arr.length > 0){
                arr.map((item, index) => {
                    if(item.month1 > item.month2){
                        let total = item.total_price1 - item.total_price2;
                        arr[index].rate = (Math.floor((total / item.total_price2) * 100))
                    }else if(item.month2 > item.month1){
                        let total = item.total_price2 - item.total_price1;
                        arr[index].rate = (Math.floor((total / item.total_price1) * 100))
                    }else{
                        arr[index].rate = 0;
                    }
                });
            };
            arr.sort(function(a,b){
                let x = a.month1;
                let y = b.month2;
                if(x > y) return 1;
                if(x < y) return -1;
                return 0;
            })
            return arr;;
        }
    },
    watch: {
        'filter': {
            deep: true,
            handler: function(newval){
                let vm = this;
                let day = new Date();
                let current_day = (new Date(day.getFullYear(), day.getMonth() + 1)).getTime();
                if(newval.month1){
                    var select_month1 = (new Date(newval.month1.year, newval.month1.monthIndex)).getTime();
                };
                if(newval.month2){
                    var select_month2 = (new Date(newval.month2.year, newval.month2.monthIndex)).getTime();
                };
                if(select_month1 > current_day || select_month2 > current_day){
                    alert('Vui lòng chọn tháng nhỏ hơn tháng hiện tại!!!');
                }else{
                    if(newval.month1 && newval.month2 && vm.inputBranch != 'Vui lòng chọn cửa hàng!!'){
                        vm.loadInvoiceByMonth(newval.month1, newval.month2, vm.inputBranch);
                    }
                };
                if(select_month1 == select_month2){
                    alert('Vui lòng chọn 2 tháng khác biệt!!');
                };
            }
        },
        'inputBranch': {
            deep: true,
            handler: function(newval){
                let vm = this;
                if(newval == 'Tất cả'){
                    vm.listBranch.map(item => {
                        vm.arrayAllId.push(item._id);
                    });
                    vm.arrayAllId.splice(vm.arrayAllId.length - 1, 1);
                };
                if(vm.filter.month1 && vm.filter.month2 && newval != 'Vui lòng chọn cửa hàng!!'){
                    vm.loadInvoiceByMonth(vm.filter.month1, vm.filter.month2, newval);
                }
            }
        }
    },
    created: function(){
        let vm = this;
        vm.listBranch = [...vm.$parent.listBranch];
        vm.inputBranch = 'Vui lòng chọn cửa hàng!!';
        vm.objBranch = vm.listBranch[0];
        vm.listBranch.push({
            name: 'Tất cả'
        });
    },
    mounted: function(){
        let vm = this;
        vm.$refs.monthPicker1.$el.children[0].placeholder = "Vui lòng chọn tháng!!!!";
        vm.$refs.monthPicker2.$el.children[0].placeholder = "Vui lòng chọn tháng!!!!"
    },
}
</script>

<style>

</style>