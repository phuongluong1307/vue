<template>
    <div>
        <div class="card-text">Bảng báo cáo sản phẩm tháng {{ (new Date()).getMonth() + 1 }}</div>
        <table class="table table-bordered">
            <thead>
                <tr style="text-align:center;">
                    <th style="width:50px;">#</th>
                    <th>Tên sản phẩm</th>
                    <th style="width:100px;">Giá</th>
                    <th>SL bán ra</th>
                    <th>Tổng doanh thu</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in filterListDetail" :key="index">
                    <td style="text-align:center;">{{index + 1}}</td>
                    <td>{{item.product_name}}</td>
                    <td class="td_number">{{$root.formatMoney(item.price)}}</td>
                    <td style="text-align:center;width:100px;">{{item.quantity}}</td>
                    <td class="td_number">{{$root.formatMoney(item.price * item.quantity)}}</td>
                </tr>
                <tr>
                    <td colspan="3" style="text-align:center;">Tổng cộng:</td>
                    <td style="text-align:center;">{{$root.formatMoney(totalQuantity)}}</td>
                    <td class="td_number">{{$root.formatMoney(grandTotal)}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'ChartProduct',
    data(){
        return {
            listDetailProduct: [],
            totalQuantity: 0,
            grandTotal: 0,
            status: true,
            statusLoad: true
        }
    },
    methods: {
        loadDetailProduct(){
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/invoice-detail/',
                headers: {'auth-token': localStorage.getItem('token')}
            }).then(res => {
                if(res.data.error){

                }else{
                    vm.listDetailProduct = res.data.data;
                }
            }).catch(err => {
                console.log(err)
            });
        }
    },
    computed: {
        filterListDetail(){
            let vm = this;
            let arr = [];
            if(vm.listDetailProduct.length > 0){
                vm.listDetailProduct.map(item => {
                    let findIndex = arr.findIndex(row => row.product_name == item.product_name);
                    if(findIndex > -1){
                        arr[findIndex].quantity += item.quantity;
                    }else{
                        arr.push({
                            product_name: item.product_name,
                            quantity: item.quantity,
                            price: item.price
                        });
                    };
                });
                if(vm.statusLoad){
                    vm.$nextTick(function(){
                        arr.map(i => {
                            vm.totalQuantity += i.quantity;
                            vm.grandTotal += (i.quantity * i.price);
                        });
                        vm.statusLoad = false;
                    });
                };
                return arr;
            };
        }
    },
    created: function(){
        let vm = this;
    }
}
</script>

<style>

</style>