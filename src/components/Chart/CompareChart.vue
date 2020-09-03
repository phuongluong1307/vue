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
            <MonthPickerInput ref="monthPicker2" v-model="filter.month2" lang="vi" class="month_picker1"></MonthPickerInput>
        </div>
        <div class="table_compare_chart" v-if="handleDataOfFilter.length > 0">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th rowspan="2" style="width:50px;">#</th>
                        <th rowspan="2">Chi nhánh</th>
                        <th colspan="2">Số đơn</th>
                        <th colspan="2">Doanh thu</th>
                        <th rowspan="2" class="profit">Lợi nhuận tháng {{ filter.month1.monthIndex }}</th>
                        <th rowspan="2" class="profit">Lợi nhuận tháng {{ filter.month2.monthIndex }}</th>
                        <th rowspan="2" class="profit">Tỉ lệ tăng trưởng</th>
                    </tr>
                    <tr>
                        <th class="month">Tháng {{ filter.month1.monthIndex }}</th>
                        <th class="month">Tháng {{ filter.month2.monthIndex }}</th>
                        <th class="month">Tháng {{ filter.month1.monthIndex }}</th>
                        <th class="month">Tháng {{ filter.month2.monthIndex }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in handleDataOfFilter" :key="index">
                        <td style="text-align:center;">{{ index+1 }}</td>
                        <td>{{ item.branch }}</td>
                        <td class="number">{{ item.quantity1 || 0 }}</td>
                        <td class="number">{{ item.quantity2 || 0 }}</td>
                        <td class="number">{{ $root.formatMoney(item.total_price1 || 0) }}</td>
                        <td class="number">{{ $root.formatMoney(item.total_price2 || 0) }}</td>
                        <td class="number">{{ $root.formatMoney(item.total_price1 || 0) }}</td>
                        <td class="number">{{ $root.formatMoney(item.total_price2 || 0) }}</td>
                        <td v-if="item.rate > 0" style="color:green;text-align:center;">+{{ item.rate || 0 }}%</td>
                        <td v-else style="color:red;text-align:center;">{{ item.rate || 0 }}%</td>
                    </tr>
                </tbody>
            </table>
            <canvas id="myChart" ref="myChart" width="100" height="40"></canvas>
        </div>
    </div>
</template>

<script>
import { MonthPickerInput  } from 'vue-month-picker';
import Chart from 'chart.js';
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
            vm.$nextTick(function(){
                let ctx = vm.$refs.myChart;
                if(arr.length > 0){
                    let listBranch = [],dataMonth1 = [],dataMonth2 = [];
                    arr.map(item => {
                        if(!listBranch.includes(item.branch)){
                            listBranch.push(item.branch);
                        };
                        if(!dataMonth1.includes(item.total_price1)){
                            dataMonth1.push(item.total_price1)
                        };
                        if(!dataMonth2.includes(item.total_price2)){
                            dataMonth2.push(item.total_price2)
                        }
                    });
                    const myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: listBranch,
                            datasets: [{
                                label: 'Doanh số tháng ' + vm.filter.month1.monthIndex,
                                data: dataMonth1,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Doanh số tháng ' + vm.filter.month2.monthIndex,
                                data: dataMonth2,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            },
                        },
                    });
                };
            });
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