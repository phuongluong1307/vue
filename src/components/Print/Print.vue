<template>
    <div class="page" style="width:100%;font-family:Arial,sans-serif;font-size:15px;display:none;">
        <table style="width:100%;border-collapse:collapse;">
            <tr style="width:100%;">
                <td style="width:100%;">
                    <tr style="width:100%;display:flex;justify-content:center;align-items:center;">
                        <td style="font-size:20px;font-weight:bold;">Đơn mua hàng</td>
                    </tr>
                    <tr style="display:flex;align-items:center;justify-content:flex-end;padding:5px 0;">
                        <td>Ngày và giờ in:</td>
                        <td>{{(new Date()).toLocaleDateString()}} {{(new Date).toLocaleTimeString()}}</td>
                    </tr>
                    <tr style="width:100%;display:flex;">
                        <td style="width:70%;">
                            <tr style="display:flex;align-items:center;padding:5px 0;">
                                <td>Họ tên khách hàng:</td>
                                <td style="padding-left:15px;">Nguyễn Văn A</td>
                            </tr>
                            <tr style="display:flex;align-items:center;padding:5px 0;">
                                <td>Địa chỉ:</td>
                                <td style="padding-left:15px;">11/11/11 Đường Số 11, Phường 11</td>
                            </tr>
                            <tr style="display:flex;align-items:center;padding:5px 0;">
                                <td>Số điện thoại:</td>
                                <td style="padding-left:15px;">(028) 123456778</td>
                            </tr>
                            <tr style="display:flex;align-items:center;padding:5px 0;">
                                <td>Mã số thuế:</td>
                                <td style="padding-left:15px;">...</td>
                            </tr>
                        </td>
                        <td style="width:30%;">
                            <tr style="display:flex;align-items:center;padding:5px 0;">
                                <td>Mã hóa đơn:</td>
                                <td style="padding-left:15px;font-weight:bold;">HD001</td>
                            </tr>
                            <tr style="display:flex;align-items:center;padding:5px 0;">
                                <td>Ngày:</td>
                                <td style="padding-left:15px;">{{(new Date()).toLocaleDateString()}}</td>
                            </tr>
                        </td>
                    </tr>
                </td>
            </tr>
            <tr style="width:100%;">
                <td style="width:100%;">
                    <table style="width:100%;border-collapse:collapse;border:1px solid black;border-bottom:none;">
                        <tr style="width:100%;display:flex;align-items:center;text-align:center;border-bottom:1px solid black;">
                            <td style="width:15%;font-weight:bold;border-right:1px solid black;">Mã hàng</td>
                            <td style="width:35%;font-weight:bold;border-right:1px solid black;">Diễn giải</td>
                            <td style="width:10%;font-weight:bold;border-right:1px solid black;">Đơn vị</td>
                            <td style="width:10%;font-weight:bold;border-right:1px solid black;">SL</td>
                            <td style="width:15%;font-weight:bold;border-right:1px solid black;">Đơn giá</td>
                            <td style="width:15%;font-weight:bold;">Thành tiền</td>
                        </tr>
                        <tr style="width:100%;display:flex;align-items:center;text-align:left;border-bottom:1px solid black;" v-for="item in $parent.$refs.Content.data" :key="item.id">
                            <td style="width:15%;border-right:1px solid black;padding:3px;">001</td>
                            <td style="width:35%;border-right:1px solid black;padding:3px;">{{item.name_product}}</td>
                            <td style="width:10%;border-right:1px solid black;padding:3px;">Ly</td>
                            <td style="width:10%;border-right:1px solid black;text-align:right;padding:3px;">{{item.quantity}}</td>
                            <td style="width:15%;border-right:1px solid black;text-align:right;padding:3px;">{{item.price}}</td>
                            <td style="width:15%;text-align:right;padding:3px;">{{item.quantity * item.price}}</td>
                        </tr>
                        <tr style="width:100%;display:flex;align-items:center;justify-content:center;border-bottom:1px solid black;position:relative;padding:5px;">
                            <td>Tổng cộng</td>
                            <td style="position:absolute;right:0;font-weight:bold">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(grandTotal)}}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Print',
    computed: {
        grandTotal: function(){
            let vm = this;
            let total = null;
            vm.$parent.$refs.Content.data.map(item => {
                total += item.quantity * item.price;
            })
            return total;
        }
    }
}
</script>

<style>
@page{
    size: A4;
    margin: 0;
}
@media print{
    *{
        background:transparent!important;
        color:#000!important;
        -webkit-box-shadow:none!important;
                box-shadow:none!important;
        text-shadow:none!important;
    }
    html,body{
        width:210mm;
        height:297mm;
        margin-top:20mm;
    }
    .page{display:block!important;}
    .content,.extend_bar,.order{display:none;}
}
</style>