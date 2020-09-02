<template>
    <div>
        <div class="card-text">Bảng báo cáo nhân viên</div>
        <div class="selection_date">
            <div>Chọn theo ngày hoặc tháng hiện tại:</div>
            <select class="selection_date_1" v-model="valueSelect">
                <option :value="valueDay" @click.stop.prevent="handleSelectDate(false)">Ngày</option>
                <option :value="1" @click.stop.prevent="handleSelectDate(true)">Tháng</option>
            </select>
        </div>
        <table class="table table-bordered" v-if="valueDay == valueSelect">
            <thead>
                <tr style="text-align:center;">
                    <th style="width:50px;">#</th>
                    <th>Tên nhân viên</th>
                    <th style="width:150px;">SL đơn hàng</th>
                    <th>Doanh số</th>
                </tr>
            </thead>
            <tbody v-show="filterInvoiceOfDate.length > 0">
                <tr v-for="(item, index) in filterInvoiceOfDate" :key="index">
                    <td style="text-align:center;">{{index + 1}}</td>
                    <td>{{item.name}}</td>
                    <td class="td_number">{{$root.formatMoney(item.quantity)}}</td>
                    <td class="td_number">{{$root.formatMoney(item.total)}}</td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align:center;">Tổng cộng:</td>
                    <td class="td_number">{{$root.formatMoney(totalQuantityDay)}}</td>
                    <td class="td_number">{{$root.formatMoney(grandTotalDay)}}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-bordered" v-else>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tên nhân viên</th>
                    <th>Doanh số</th>
                    <th>Lợi nhuận({{getDateMonth ? getDateMonth : ''}})</th>
                </tr>
            </thead>
            <tbody v-show="filterInvoiceOfMonth && filterInvoiceOfMonth.length > 0">
                <tr v-for="(item, index) in filterInvoiceOfMonth" :key="index">
                    <td style="text-align:center;">{{index + 1}}</td>
                    <td>{{item.name}}</td>
                    <td class="td_number">{{$root.formatMoney(item.total)}}</td>
                    <td class="td_number">{{$root.formatMoney(item.total)}}</td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align:center;">Tổng cộng:</td>
                    <td class="td_number">{{$root.formatMoney(grandTotalMonth)}}</td>
                    <td class="td_number">{{$root.formatMoney(grandTotalMonth)}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'ChartUser',
    data(){
        return {
            listInvoiceOfMonth: [],
            arrTotal: [],
            status: true,
            valueDay: null,
            valueSelect: '',
            listInvoiceOfDate: [],
            totalQuantityDay: 0,
            grandTotalDay: 0,
            grandTotalMonth: 0,
            statusDay: true,
            statusMonth: true
        }
    },
    methods: {
        loadInvoice: async function(){
            let vm = this;
            let listInvoice = await vm.$parent.getInvoiceByIdBranch('');
            vm.listInvoiceOfMonth = listInvoice.invoiceOfMonth;
        },
    },
    computed: {
        filterInvoiceOfMonth: function(){
            let vm = this;
            let arr = [];
            if(vm.listInvoiceOfMonth.length > 0){
                vm.listInvoiceOfMonth.map(item => {
                    let findIndex = arr.findIndex(row => row.name == item.seller.name);
                    if(findIndex > -1){
                        arr[findIndex].total += item.total_price
                    }else{
                        arr.push({
                            name: item.seller.name,
                            total: item.total_price
                        })
                    };
                });
                if(vm.statusMonth){
                    vm.$nextTick(function(){
                        arr.map(i => {
                            vm.grandTotalMonth += i.total;
                        })
                        vm.statusMonth = false;
                    });
                };
            };
            return arr;
        },
        getDateMonth: function(){
            let vm = this;
            let day = new Date();
            let firstDay = new Date(day.getFullYear(), day.getMonth(), 1);
            let lastDay = new Date(day.getFullYear(), day.getMonth() + 1, 0);
            let firstDayOfMonth = (firstDay.getMonth() + 1) + '/' + firstDay.getDate() + '/' + firstDay.getFullYear();
            let lastDayOfMonth = (lastDay.getMonth() + 1) + '/' + lastDay.getDate() + '/' + lastDay.getFullYear();
            let getDate = (firstDay.getDate() + ' - ' + lastDay.getDate() + '/' + (lastDay.getMonth() + 1) + '/' + lastDay.getFullYear());
            return getDate;
        },
        filterInvoiceOfDate: function(){
            let vm = this;
            let arr = [];
            if(vm.listInvoiceOfDate.length > 0){
                vm.listInvoiceOfDate.map(item => {
                    let findIndex = arr.findIndex(row => row.name == item.seller.name);
                    if(findIndex > -1){
                        arr[findIndex].quantity += 1;
                        arr[findIndex].total += item.total_price;
                    }else{
                        arr.push({
                            name: item.seller.name,
                            quantity: 1,
                            total: item.total_price
                        })
                    }
                });
                if(vm.statusDay){
                    vm.$nextTick(function(){
                        arr.map(i => {
                            vm.totalQuantityDay += i.quantity;
                            vm.grandTotalDay += i.total;
                        });
                        vm.statusDay = false;
                    });
                };
            };
            return arr;
        },
    },
    created: function(){
        let vm = this;
        let day = new Date();
        let current_day = (day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear();
        vm.valueDay = current_day;
        vm.valueSelect = current_day;
    },
    watch: {
        'valueSelect':{
            deep:true,
            handler: function(newval){
                let vm = this;
                if(newval == vm.valueDay){
                    vm.axios({
                        method: "GET",
                        url: vm.$root.API_GATE + '/api/invoices',
                        headers: {'auth-token': localStorage.getItem('token')},
                        params: {
                            date: vm.valueDay
                        }
                    }).then(res => {
                        if(res.data.error){

                        }else{
                            vm.listInvoiceOfDate = res.data.filters;
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }else{
                    vm.loadInvoice();
                }
            }
        }
    }
}
</script>

<style>

</style>