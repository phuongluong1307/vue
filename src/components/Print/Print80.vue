<template>
    <div class="print_container" id="print_80"> 
        <div class="box_print">
            <div>
                <p style="font-size:13px;font-weight:bold;text-align:center;">Hệ thống cửa hàng</p>
                <p style="text-align:center;font-size:13px;font-weight:bold;">Soul Master</p>
                <p style="padding-top:3px;">CN1: 123 Nguyễn Văn Khối</p>
                <p>CN2: 456 Nguyễn Văn Khối</p>
            </div>
            <div style="padding-bottom:3px;">
                <p style="font-weight:bold;font-size:12px;text-align:center;">Hóa đơn thanh toán</p>
                <p style="display:flex;justify-content:space-between;align-items:center;">
                    <span>Hóa đơn: HĐ001</span>
                    <span>Ngày: {{(new Date()).toLocaleDateString()}}</span>
                </p>
                <p>Nhân viên: Tèo</p>
            </div>
            <div class="board" style="display:flex;align-items:center;padding:3px 0;border-bottom:1px dashed black;border-top:1px dashed black;">
                <p style="width:40%;">Tên SP</p>
                <p style="width:10%;">SL</p>
                <p style="width:25%;text-align:center;">Đơn giá</p>
                <p style="width:25%;text-align:right;">Thành tiền</p>
            </div>
            <div class="list_item" style="border-bottom:1px dashed black;padding:3px 0;">
                <div class="item" v-for="item in $parent.$refs.Content.data" :key="item.id" style="display:flex;align-items:center;">
                    <p style="width:40%;">{{item.product_name}}</p>
                    <p style="width:10%;">{{item.quantity}}</p>
                    <p style="width:25%;text-align:center;">{{item.price}}</p>
                    <p style="width:25%;text-align:right;">{{item.quantity * item.price}}</p>
                </div>
            </div>
            <div style="display:flex; align-items:center;justify-content:flex-end;padding-top:3px;">
                <div style="width:60%;display:flex;justify-content:space-between;">
                    <p>Tổng tiền hàng:</p>
                    <p>{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(grandTotal)}}</p>
                </div>
            </div>
            <div style="display:flex; align-items:center;justify-content:flex-end;">
                <div style="width:60%;display:flex;justify-content:space-between;">
                    <p>Chiết khấu:</p>
                    <p>{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(0)}}</p>
                </div>
            </div>
            <div style="display:flex; align-items:center;justify-content:flex-end;">
                <div style="width:60%;display:flex;justify-content:space-between;">
                    <p>Tổng cộng:</p>
                    <p>{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(grandTotal)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Print80',
    data: function(){
        return {
            obj: null
        }
    },
    computed: {
        grandTotal: function(){
            let vm = this;
            let total = null;
            vm.$parent.$refs.Content.data.map((item,index) => {
                total += item.price * item.quantity;
            });
            return total;
        }
    },
    created: function(){
        this.obj = this.$parent.$refs.Content.$refs.ContentBill.my_singleBill;
    }
}
</script>

<style>
.print_container{display:none;}
@media print{
    @page{
        size:80mm;
    }
    *{
        background:transparent!important;
        color:#000!important;
        -webkit-box-shadow:none!important;
        box-shadow:none!important;
        text-shadow:none!important;
    }
    html,body{
        font-family: Arial, sans-serif;
        background: none;
        color: black;
        font-size:10px;
    }
    .content,.extend_bar,.order,.list_store,.list_product{display:none;}
    .print_container{display:block;}
    .box_print{width:302px;height:100%;padding:0 20px;}
}
</style>