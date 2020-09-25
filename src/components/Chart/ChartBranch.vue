<template>
    <div>
        <div class="card-text">Biểu đồ trong tháng {{ (new Date).getMonth() + 1}}</div>
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
        <canvas id="myChart" ref="myChart" width="100" height="40"></canvas>  
    </div>
</template>

<script>
import Chart from 'chart.js';
import Datepicker from 'vuejs-datepicker';
import {en, vi} from 'vuejs-datepicker/dist/locale';
export default {
    name: 'ChartBranch',
    data(){
        return {
            en: en,
            vi: vi,
            listBranch: [],
            arr: [],
            debounce: null,
            select: false,
            inputBranch: '',
            objBranch: null,
            loadBranch: true,
            status: true,
        }
    },
    methods: {
        showEvent: function(){
            this.select = !this.select;
        },
        getDaysInMonth(month, year) {
            var date = new Date(year, month, 1);
            var days = [];
            while (date.getMonth() === month) {
                let data = new Date(date);
                let new_day = (data.getMonth() + 1) + '/' + data.getDate() + '/' + data.getFullYear();
                days.push(new_day);
                date.setDate(date.getDate() + 1);
            }
            return days;
        },
        async createChart(){
            let vm = this;
            let data = new Date();
            let month = data.getMonth();
            let year = data.getFullYear();
            let listDateOfMonth = vm.getDaysInMonth(month, year);
            let listInvoice = await vm.$parent.getInvoiceByIdBranch(vm.objBranch._id);
            listInvoice = listInvoice.data;
            let saleOfDate = [];
            if(listDateOfMonth.length > 0){
               saleOfDate = Array.from({length: listDateOfMonth.length}, x => x = 0);
            };
            let total = 0;
            if(listInvoice != 'undefined'){
                listDateOfMonth.map((row, rowIndex) => {
                    let date = new Date(row).getDate();
                    let filter = listInvoice.filter(item => item._id.day == date);
                    saleOfDate[rowIndex] = filter[0].total;
                });
            };
            if(vm.listBranch){
                const socket = vm.$root.socket;
                let ctx = vm.$refs.myChart;
                let date = data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
                const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: listDateOfMonth ? listDateOfMonth : [],
                        datasets: [{
                            label: 'Doanh số trong tháng',
                            data: saleOfDate,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
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
                        tooltips: {
                            mode: 'label',
                        }
                    },
                });
                socket.on('add bill', function(data){
                    let days = new Date();
                    let date = (days.getMonth() + 1) + '/' + days.getDate() + '/' + days.getFullYear();
                    if(vm.objBranch.name == data.branch){
                        let findBranch = myChart.data.labels.findIndex(item => item == date);
                        if(findBranch > -1){
                            myChart.data.datasets[0].data[findBranch] += data.total_price;
                            myChart.update();
                        };
                    };
                });
            };
        },
        selectBranch: function(item){
            this.select = false;
            this.inputBranch = item.name;
            this.objBranch = item;
        }
    },
    watch: {
        'objBranch': {
            deep: true,
            handler: function(newval){
                let vm = this;
                if(newval){
                    vm.createChart();
                };
            }
        },
    },
    mounted: function(){
        let vm = this;
        if(vm.$parent.listBranch.length > 0){
            vm.listBranch = vm.$parent.listBranch;
            vm.inputBranch = vm.listBranch[0].name;
            vm.objBranch = vm.listBranch[0];
        };
    },
}
</script>

<style>

</style>