<template>
    <div class="modal_chart" :class="open ? 'open' : ''">
        <div class="chart_box">
            <div class="card">
                <div class="card-header">
                    <div class="title">Biểu đồ bán hàng</div>
                </div>
                <div class="card-body">
                    <div class="nav_chart">
                        <div class="nav_chart_1">
                            <button class="nav_chart_1_1" :class="{active: step == 1}" @click.stop.prevent="handleSelectFollowChart(1, 'ChartBranch')">Cửa hàng</button>
                        </div>
                        <div class="nav_chart_1">
                            <button class="nav_chart_1_2" :class="{active: step == 2}" @click.stop.prevent="handleSelectFollowChart(2, 'ChartUser')">Nhân viên</button>
                        </div>
                        <div class="nav_chart_1">
                            <button class="nav_chart_1_3" :class="{active: step == 3}" @click.stop.prevent="handleSelectFollowChart(3, 'ChartProduct')">Sản phẩm</button>
                        </div>
                        <div class="nav_chart_1">
                            <button class="nav_chart_1_4" :class="{active: step == 4}" @click.stop.prevent="handleSelectFollowChart(4, 'CompareChart')">So sánh</button>
                        </div>
                        <div class="nav_chart_1">
                            <button class="nav_chart_1_4" :class="{active: step == 5}" @click.stop.prevent="handleSelectFollowChart(5, 'CompStream')">Stream</button>
                        </div>
                    </div>
                    <component ref="chartTable" v-bind:is="chart_component"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChartBranch from './ChartBranch';
import ChartUser from './ChartUser';
import ChartProduct from './ChartProduct';
import CompareChart from './CompareChart';
import CompStream from './CompStream';
export default {
    components: {
        ChartBranch,
        ChartUser,
        ChartProduct,
        CompareChart,
        CompStream
    },
    name: 'Chart',
    data(){
        return {
            open: false,
            chart_component: 'ChartBranch',
            step : 1,
            statusBody: false,
            listBranch: [],
            status: true
        }
    },
    methods: {
        handleSelectFollowChart(index, item){
            let vm = this;
            vm.step = index;
            vm.chart_component = item;
            vm.$nextTick(function(){
                switch (vm.step) {
                    case 1:
                        if(vm.$refs.chartTable.status){
                            vm.$refs.chartTable.status = false;
                            vm.$refs.chartTable.createChart();
                        };
                        break;
                    case 2:
                        if(vm.$refs.chartTable.status){
                            vm.$refs.chartTable.status = false;
                            vm.$refs.chartTable.loadInvoice();
                        };;
                        break;
                    case 3: 
                        if(vm.$refs.chartTable.status){
                            vm.$refs.chartTable.status = false;
                            vm.$refs.chartTable.loadDetailProduct();
                        };
                        break;
                    default:
                        break;
                };
            })
        },
        getInvoiceByIdBranch:async function(id){
            let vm = this;
            let result = null;
            let date = new Date();
            let month = "" + (date.getMonth() + 1);
            let promise = new Promise(function(resolve,reject){
                vm.axios({
                    method: "GET",
                    url: vm.$root.API_GATE + '/api/invoice-of-day',
                    headers: {'auth-token': localStorage.getItem('token')},
                    params: {
                        branch_id: id ? id : null,
                        month_of_year: month
                    }
                }).then(res => {
                    if(res.data.error){

                    }else{
                        resolve(res.data);
                    };
                }).catch(err => {
                    console.log(err)
                });
            });
            result = await promise;
            return result;
        },
        loadListBranch: function(){
            let vm = this;
            if(vm.status){
                vm.axios({
                    method: "GET",
                    url: vm.$root.API_GATE + '/api/branches/',
                    headers: {'auth-token': localStorage.getItem('token')}
                }).then(res => {
                    if(res.data.error){

                    }else{
                        if(res.data.data.docs){
                            vm.listBranch = res.data.data.docs;
                        }
                    }
                }).catch(err => {
                    console.log(err)
                });
                vm.status = false;
            }
        },
    },
    watch: {
        'listBranch': {
            deep: true,
            handler: function(newval){
                let vm = this;
                if(newval.length > 0 && vm.step == 1){
                    vm.listBranch.map(item => {
                        vm.$refs.chartTable.listBranch.push({
                            _id: item._id,
                            name: item.name
                        });
                    });
                    vm.$refs.chartTable.inputBranch = vm.$refs.chartTable.listBranch[0].name;
                    vm.$refs.chartTable.objBranch = vm.$refs.chartTable.listBranch[0];
                }
            }
        },
    },
}
</script>

<style>

</style>