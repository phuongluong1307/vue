<template>
    <div class="charge" :class="open ? 'open' : ''">
        <div class="charge_back">
            <button @click.stop.prevent="open = false"><i class="fal fa-arrow-left"></i></button>
            <h5>Thanh toán</h5>
        </div>
        <div class="charge_content">
            <div class="content_left">
                <div class="left_1">
                    <div class="left_1_1">
                        <div class="user_name">
                            <p class="txt_name"><i class="fal fa-user-circle"></i><span>{{data.customer != null ? data.customer.name : 'Khách lẻ'}}</span></p>
                        </div>
                    </div>
                    <div class="left_1_2">
                        <div class="left_1_2_1">
                            <p class="store_credit">Số dư khả dụng</p>
                            <p class="txt">0</p>
                        </div>
                        <div class="left_1_2_2">
                            <p class="account_balance">Số dư tài khoản</p>
                            <p class="txt">0</p>
                        </div>
                    </div>
                </div>
                <div class="left_2">
                    <div class="left_2_1">
                        <div class="list_item">
                            <div class="item" v-for="(item, index) in data.products" :key="index">
                                <div class="delete" @click.stop.prevent="deleteItem(item,index)">
                                    <i class="fal fa-times"></i>
                                </div>
                                <div class="name">{{item.product_name}}</div>
                                <div class="quantity">
                                    <span>{{item.quantity}}</span>
                                </div>
                                <div class="total">
                                    <div class="price">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format((item.price * item.quantity) - (item.discount_price * item.quantity))}}</div>
                                    <div class="discount_price" v-if="item.discount_price != 0">Đã giảm:{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.discount_price * item.quantity)}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="left_3">
                    <div class="left_3_1 sub_total">
                        <div class="left_3_1_1 sub_total_1">
                            <p class="sub_total_1_1">Tổng cộng({{$parent.handleQuantity}} sản phẩm)</p>
                            <p class="txt">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(subtotal)}}</p>
                        </div>
                    </div>
                    <div class="left_3_1 tax">
                        <div class="left_3_1_1 tax_1">
                            <p class="tax_1_1">Thuế</p>
                            <p class="txt">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format($parent.tax)}}</p> 
                        </div>
                    </div>
                    <div class="left_3_1 discount">
                        <div class="left_3_1_1 discount_1">
                            <p class="discount_1_1">Giảm giá ({{data.discount_value + data.discount_type}})</p>
                            <p class="txt">-{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(discount_price)}}</p> 
                        </div>
                    </div>
                    <div class="left_3_1 grand_total">
                        <div class="left_3_1_1 grand_total_1">
                            <p class="grand_total_1_1">Tổng cộng</p>
                            <p class="txt">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(brandTotal)}}</p> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="content_right">
                <div class="right_1">
                    <div class="right_1_1">
                        <div class="right_1_1_1">Khoản tiền</div>
                        <div class="right_1_1_2">0<i class="fal fa-pen" @click.stop.prevent="open_caculator = !open_caculator"></i></div>
                        <div class="box_calculator" :class="open_caculator ? 'open' : ''">
                            <Calculator ref="Calculator"></Calculator>
                            <div class="cancel">
                                <button>OK</button>
                            </div>
                        </div>
                    </div>
                    <div class="right_1_2">
                        <div class="payment">
                            <button  @click.stop.prevent="open_caculator = true">Tiền mặt</button>
                        </div>
                        <div class="payment">
                            <button>Thẻ</button>
                        </div>
                        <div class="payment">
                            <button>Chuyển khoản</button>
                        </div>
                        <div class="payment">
                            <button>Ví điện tử</button>
                        </div>
                        <div class="payment">
                            <button>Thẻ cửa hàng</button>
                        </div>
                        <div class="payment">
                            <button @click.stop.prevent="$refs.GiftCard.open = true">Thẻ quà tặng</button>
                        </div>
                    </div>
                    <div class="right_1_3">
                        <div class="right_1_3_1">
                            <span class="right_1_3_1_1">100.000</span>
                            <span class="right_1_3_1_2">Bằng tiền mặt</span>
                            <span class="right_1_3_1_3">
                                <button><i class="fal fa-minus-circle"></i></button>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="right_2">
                    <button class="delete" @click.stop.prevent="delete_invoice = true">Hủy</button>
                    <button class="complete" @click.stop.prevent="open_confirm = true">Hoàn thành</button>
                </div>
                <div class="popupConfirm" :class="open_confirm ? 'open' : ''">
                    <div class="box">
                        <div class="top">
                            <h6>Xác nhận in</h6>
                        </div>
                        <div class="center">
                            <p>Bạn có muốn in hay không!</p>
                        </div>
                        <div class="bottom">
                            <button class="print" @click.stop.prevent="handlePrint">In</button>
                            <button class="cancel" @click.stop.prevent="open_confirm = false">Hủy</button>
                        </div>
                    </div>
                    <div class="mask"></div>
                </div>
                <div class="deleteInvoice" :class="delete_invoice ? 'open' : ''">
                    <div class="box">
                        <div class="top">
                            <h6>Xác nhận xóa</h6>
                        </div>
                        <div class="center">
                            <p>Thao tác này xóa hóa đơn khỏi danh sách!</p>
                        </div>
                        <div class="bottom">
                            <button class="print" @click.stop.prevent="handleDeleteBill">Xác nhận</button>
                            <button class="cancel" @click.stop.prevent="delete_invoice = false">Hủy</button>
                        </div>
                    </div>
                    <div class="mask_delete" @click.stop.prevent="delete_invoice = false"></div>
                </div>
            </div>
        </div>
        <GiftCard ref="GiftCard"></GiftCard>
        <iframe id="printf" name="printf" frameborder="0" style="display:none;"></iframe>
        <div class="mask" :class="open_caculator ? 'open' : ''" @click.stop.prevent="open_caculator = false"></div>
    </div>
</template>

<script>
import GiftCard from './GiftCard';
import Calculator from './Calculator';
export default {
    components: {
        GiftCard,
        Calculator
    },
    name: 'Charge',
    props: ['data'],
    data: function(){
        return {
            open: false,
            open_caculator: false,
            open_confirm: false,
            discount_price: 0,
            discount_value: 0,
            paymentSuccess: false,
            debounce: null,
            debounce_1: null,
            delete_invoice: false
        }
    },
    methods:{
        deleteItem: function(item,index){
            let vm = this;
            let findIndex = vm.data.products.findIndex(row => row.id === item.id);
            if(findIndex > -1){
                vm.data.products.splice(findIndex, 1);
            };
        },
        handlePrint: function(){
            let vm = this;
            // if(!vm.$parent.$parent.$parent.streaming){
            //     alert('Vui lòng truy cập camera!!!')
            // };
            const socket = vm.$root.socket;
            // vm.$parent.$parent.$parent.takePicture();
            let new_invoice = {
                customer_id: vm.data.customer != null ? vm.data.customer._id : null,
                seller: JSON.parse(localStorage.getItem('name')).name,
                total_price: vm.brandTotal,
                subtotal: vm.subtotal,
                tax_value: vm.data.tax_value,
                tax_price: vm.data.tax_price,
                discount_type: vm.data.discount_type,
                discount_price: vm.discount_price,
                discount_value: vm.data.discount_value,
                products: vm.data.products,
                branch_id: localStorage.getItem('branch_id') ? localStorage.getItem('branch_id') : null,
                image: vm.$parent.$parent.$parent.image
            };
            vm.axios({
                method: "POST",
                url: vm.$root.API_GATE + '/api/invoices/',
                headers:{'auth-token': localStorage.getItem('token')},
                data: new_invoice
            }).then(res => {
                if(res.data.error){

                }else{
                    socket.emit('new bill', res.data.invoice.branch_id, res.data.invoice.total_price);
                    vm.$parent.loadInvoiceOfDate();
                    vm.$parent.$parent.$parent.$refs.CompOrder.loadInvoice();
                    let bill = res.data.data;
                    vm.open_confirm = false;
                    vm.$parent.$parent.$parent.loading = true;
                    vm.$parent.$parent.$parent.mask = true;
                    let findIndex = vm.$parent.data.indexOf(vm.data);
                    if(vm.$parent.data.length == 1){
                        let obj = {
                            bill: "HD001",
                            products: [],
                            customer: null,
                            tax_value: 0,
                            tax_price: 0,
                            total_price: 0,
                            discount_price: 0,
                            discount_type: 'VND',
                            discount_value: 0,
                            statusDiscountTotal: false
                        };
                        vm.$parent.data.push(obj);
                        vm.$parent.tab = "HD001";
                    };
                    if(findIndex > -1){
                        vm.$parent.data.splice(findIndex, 1);
                        vm.$parent.tab = vm.$parent.data[0].bill;
                        vm.$parent.$parent.$parent.$refs.LoadingModal.title = "Thêm thành công!";
                        clearTimeout(vm.debounce);
                        vm.debounce = setTimeout(function(){
                            vm.$parent.$parent.$parent.loadingModal = true;
                            vm.$parent.$parent.$parent.loading = false;
                            clearTimeout(vm.debounce_1);
                            vm.debounce_1 = setTimeout(function(){
                                vm.$parent.$parent.$parent.loadingModal = false;
                                vm.$parent.$parent.$parent.mask = false;
                                vm.open = false;
                                window.frames["printf"].document.write(`<body style="@media print{@page{size: 80mm;}}">`)
                                window.frames["printf"].document.write(`<div><h1 style="text-align:center;">Hệ thống cửa hàng</h1></div>`);
                                window.frames["printf"].document.write(`<div><h3 style="text-align:center;">Soul Master</h3></div>`);
                                window.frames["printf"].document.write(`<div><p style="padding-top:3px;">CN1: 123 Nguyễn Văn Khối</p></div>`)
                                window.frames["printf"].document.write(`<div><p>CN2: 456 Nguyễn Văn Khối</p></div>`)
                                window.frames["printf"].document.write(`
                                    <div style="padding-bottom:3px;">
                                        <h2 style="text-align:center;">Hóa đơn thanh toán</h2>
                                        <p style="display:flex;justify-content:space-between;align-items:center;">
                                            <span>Hóa đơn: ${res.data.invoice.code_bill}</span>
                                            <span>Ngày: ${(new Date()).toLocaleDateString()}</span>
                                        </p>
                                        <p>Nhân viên: ${res.data.seller}</p>
                                    </div>
                                `)
                                window.frames["printf"].document.write(`
                                    <div class="board" style="display:flex;align-items:center;padding:3px 0;border-bottom:1px dashed black;border-top:1px dashed black;">
                                        <p style="width:40%;">Tên SP</p>
                                        <p style="width:10%;">SL</p>
                                        <p style="width:25%;text-align:center;">Đơn giá</p>
                                        <p style="width:25%;text-align:right;">Thành tiền</p>
                                    </div>
                                `)
                                let grand_total = 0;
                                bill.forEach(item => {
                                    window.frames["printf"].document.write(`
                                        <div class="list_item" style="border-bottom:1px dashed black;padding:15px 0;">
                                            <div class="item" v-for="item in $parent.$refs.Content.data" :key="item.id" style="display:flex;align-items:center;">
                                                <div style="width:40%;">${item.product_name}</div>
                                                <div style="width:10%;">${item.quantity}</div>
                                                <div style="width:25%;text-align:center;">${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price)}</div>
                                                <div style="width:25%;text-align:right;position:relative;">
                                                    <div style="position:relative;">${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format((item.price * item.quantity) - (item.discount_price * item.quantity))}</div>
                                                    ${item.discount_price > 0 ? `<div style="position:absolute;right:0;top:50%;font-size:12px;padding:10px 0;">Đã giảm ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.discount_price * item.quantity)}</div>` : ""}
                                                </div>
                                            </div>
                                        </div>
                                    `);
                                    grand_total += item.price * item.quantity;
                                });
                                window.frames["printf"].document.write(`
                                    <div style="display:flex; align-items:center;justify-content:flex-end;padding-top:3px;">
                                        <div style="width:60%;display:flex;justify-content:space-between;">
                                            <p>Tổng tiền hàng:</p>
                                            <p>${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(grand_total)}</p>
                                        </div>
                                    </div>
                                    <div style="display:flex; align-items:center;justify-content:flex-end;">
                                        <div style="width:60%;display:flex;justify-content:space-between;">
                                            <p>Thuế (${res.data.invoice.tax_value}%):</p>
                                            <p>${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(Number(res.data.invoice.tax_price))}</p>
                                        </div>
                                    </div>
                                    <div style="display:flex; align-items:center;justify-content:flex-end;">
                                        <div style="width:60%;display:flex;justify-content:space-between;">
                                            <p>Chiết khấu(${res.data.invoice.discount_value + res.data.invoice.discount_type}):</p>
                                            <p>${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(res.data.invoice.discount_price)}</p>
                                        </div>
                                    </div>
                                    <div style="display:flex; align-items:center;justify-content:flex-end;">
                                        <div style="width:60%;display:flex;justify-content:space-between;">
                                            <p>Tổng cộng:</p>
                                            <p>${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(res.data.invoice.total_price)}</p>
                                        </div>
                                    </div>
                                `);
                                window.frames["printf"].document.write("</body>")
                                window.frames["printf"].print();
                                window.frames["printf"].document.close();
                            }, 1000);
                        }, 1000);
                    };
                }
            }).catch(err => {
                console.log(err)
            })
        },
        handleDeleteBill: function(){
            let vm = this;
            let findIndex = vm.$parent.data.findIndex(row => row.bill === vm.data.bill);
            vm.delete_invoice = false;
            vm.$parent.$parent.$parent.loading = true;
            vm.$parent.$parent.$parent.mask = true;
            if(findIndex > -1){
                if(vm.$parent.data.length == 1){
                    let obj = {
                        bill: "HD001",
                        products: [],
                        customer: null,
                        tax_value: 0,
                        tax_price: 0,
                        total_price: 0,
                        discount_price: 0,
                        discount_type: 'VND',
                        discount_value: 0,
                        statusDiscountTotal: false
                    };
                    vm.$parent.data.push(obj);
                    vm.$parent.tab = "HD001";
                };
                vm.$parent.data.splice(findIndex, 1);
                vm.$parent.tab = vm.$parent.data[0].bill;
                vm.$parent.$parent.$parent.$refs.LoadingModal.title = "Xóa thành công!";
                clearTimeout(vm.debounce);
                vm.debounce = setTimeout(function(){
                    vm.$parent.$parent.$parent.loadingModal = true;
                    vm.$parent.$parent.$parent.loading = false;
                    vm.open = false;
                    clearTimeout(vm.debounce_1);
                    vm.debounce_1 = setTimeout(function(){
                        vm.$parent.$parent.$parent.loadingModal = false;
                        vm.$parent.$parent.$parent.mask = false;
                        vm.open = false;
                    },1000)
                },1000)
            }
        }
    },
    computed:{
        brandTotal: function(){
            let vm = this;
            let total = 0;
            if(vm.$parent.my_singleBill.discount_type == "%"){
                let price = 0;
                price = (vm.$parent.handleTotal * Number(vm.data.discount_value)) / 100;
                vm.discount_price = Number(price);
                total = vm.$parent.handleTotal - price;
            }else{
                vm.discount_price = Number(vm.data.discount_value);
                total = vm.$parent.handleTotal - Number(vm.data.discount_value);
            };
            return Number(total);
        },
        subtotal: function(){
            let vm = this;
            let total = 0;
            vm.data.products.map(item => {
                total += item.quantity * item.price;
            });
            return total;
        }
    },
    created: function(){
        let vm = this;
    },
    mounted: function(){
        
    }
}
</script>

<style>

</style>