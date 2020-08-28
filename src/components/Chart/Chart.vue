<template>
    <div class="modal_chart" :class="open ? 'open' : ''">
        <div class="chart_box">
            <div class="card">
                <div class="card-header">
                    <div class="title">Biểu đồ bán hàng</div>
                </div>
                <div class="card-body">
                    <div class="card-text">Biểu đồ trong ngày</div>
                    <canvas id="myChart" ref="myChart" width="100" height="20"></canvas>
                </div>
                <div class="card-body">
                    <Datepicker class="date_picker" v-model="filters.date" style="width:200px;" :language="vi" placeholder="Tìm theo ngày" input-class="input_picker"></Datepicker>
                    <canvas id="chartFilter" ref="chartFilter" width="100" height="20"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js';
import Datepicker from 'vuejs-datepicker';
import {en, vi} from 'vuejs-datepicker/dist/locale';
export default {
    components: {
        Datepicker
    },
    name: 'Chart',
    data(){
        return {
            open: false,
            listBranch: [],
            invoiceOfDate: [],
            arr: [],
            debounce: null,
            en: en,
            vi: vi,
            filters: {
                date: ''
            }
        }
    },
    methods: {
        promise: function(){
            let vm = this;
            return new Promise(function(resolve, reject){
                vm.axios({
                    method: "GET",
                    url: vm.$root.API_GATE + '/api/branches/',
                    headers: {'auth-token': localStorage.getItem('token')}
                }).then(res => {
                    if(res.data.error){

                    }else{
                        if(res.data.data.docs){
                            let arr = [];
                            res.data.data.docs.map(item => {
                                arr.push(item.name);
                            });
                            resolve(arr);
                        }
                    }
                }).catch(err => {
                    console.log(err)
                });
            });
        },
        async createChart(){
            let vm = this;
            let arr = [];
            // let promise = new Promise(function(resolve, reject){
            //     vm.axios({
            //         method: "GET",
            //         url: vm.$root.API_GATE + '/api/branches/',
            //         headers: {'auth-token': localStorage.getItem('token')}
            //     }).then(res => {
            //         if(res.data.error){

            //         }else{
            //             if(res.data.data.docs){
            //                 let arr = [];
            //                 res.data.data.docs.map(item => {
            //                     arr.push(item.name);
            //                 });
            //                 resolve(arr);
            //             }
            //         }
            //     }).catch(err => {
            //         console.log(err)
            //     });
            // });
            vm.listBranch = await vm.promise();
            vm.$nextTick(function(){
                let dataLabelPrice = Array.from({length: vm.listBranch.length}, x => 0);
                let dataLabelDiscount = Array.from({length: vm.listBranch.length}, x => 0);
                const socket = vm.$root.socket;
                let ctx = vm.$refs.myChart;
                let data = new Date();
                let date = data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
                const myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: vm.listBranch ? vm.listBranch : [],
                        datasets: [{
                            label: 'Doanh số trong ngày',
                            data: dataLabelPrice,
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
                        }
                    }
                });
                let newDataset = {
                    label: 'Khuyến mãi',
                    backgroundColor: 'rgba(99, 255, 132, 0.2)',
                    borderColor: 'rgba(99, 255, 132, 1)',
                    borderWidth: 1,
                    data: dataLabelDiscount,
                };
                myChart.data.datasets.push(newDataset);
                myChart.update();
                socket.on('list branch', function(data){
                    data.map(item => {
                        let find = myChart.data.labels.findIndex(row => row == item.branch.name);
                        if(find > -1){
                            myChart.data.datasets[0].data[find] += item.total_price;
                            myChart.data.datasets[1].data[find] += item.discount_price;
                            myChart.update();
                        }
                    })
                });
                socket.on('add bill', function(data){
                    let findBranch = myChart.data.labels.findIndex(item => item == data.branch);
                    if(findBranch > -1){
                        myChart.data.datasets[0].data[findBranch] += data.total_price;
                        myChart.data.datasets[1].data[findBranch] += data.discount_price;
                        myChart.update();
                    };
                });
            });
        },
        chartFilter: async function(){
            let vm = this;
            vm.listBranch = await vm.promise();
            let dataLabelPrice = Array.from({length: vm.listBranch.length}, x => 0);
            let dataLabelDiscount = Array.from({length: vm.listBranch.length}, x => 0);
            const socket = vm.$root.socket;
            let ctx = vm.$refs.chartFilter;
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: vm.listBranch ? vm.listBranch : [],
                    datasets: [{
                        label: 'Đã bán',
                        data: dataLabelPrice,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Khuyến mãi',
                        data: dataLabelDiscount,
                        backgroundColor: 'rgba(99, 255, 132, 0.2)',
                        borderColor: 'rgba(99, 255, 132, 1)',
                        borderWidth: 1,
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            socket.on('list sale of date', function(data){
                if(data.length == 0){
                    myChart.data.datasets[0].data = Array.from({length: vm.listBranch.length}, x => 0);
                    myChart.data.datasets[1].data = Array.from({length: vm.listBranch.length}, x => 0);
                    myChart.update();
                }else{
                    myChart.data.datasets[0].data = Array.from({length: vm.listBranch.length}, x => 0);
                    myChart.data.datasets[1].data = Array.from({length: vm.listBranch.length}, x => 0);
                    data.map(item => {
                        let find = myChart.data.labels.findIndex(row => row == item.branch.name);
                        if(find > -1){
                            myChart.data.datasets[0].data[find] += item.total_price;
                            myChart.data.datasets[1].data[find] += item.discount_price;
                            myChart.update();
                        }
                    })
                };
            })
        },
    },
    mounted: function(){
        this.createChart();
        this.chartFilter();
    },
    created: function(){
        // this.loadBranch();
    },
    watch: {
        'filters.date'(newval){
            let vm = this;
            const socket = vm.$root.socket;
            let data = new Date(newval);
            let date = (data.getMonth() + 1) + '/' + data.getDate() + '/' + data.getFullYear();
            socket.emit('date of sale', date);
        }
    }
}
</script>

<style>

</style>