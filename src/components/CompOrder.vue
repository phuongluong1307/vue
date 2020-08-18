<template>
    <div class="order" :class="{open: open, 'menu-bar-opened':$parent.open_menu_bar}">
        <div class="bar">
            <div class="btn_bars">
                <button @click.stop.prevent="$parent.open_menu_bar = true"><i class="fal fa-bars"></i></button>
            </div>
            <div class="name_store">Đơn đặt hàng</div>
        </div>
        <div class="content">
            <div class="content_left">
                <div class="search">
                    <div class="search_input">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Tìm mã hóa đơn, tên hoặc sđt khách hàng" v-model="search">
                    </div>
                    <div class="search_advanced">
                        <a @click.stop.prevent="$refs.FilterAdvanced.open = true">Tìm kiếm nâng cao</a>
                    </div>
                </div>
                <div class="list_order">
                    <div class="item" v-for="item in data" :key="item.id" @click.stop.prevent="handleSelectBill(item)" :class="active == item.code_bill ? 'active' : ''">
                        <div class="code_bill">
                            <p class="code_bill_1">{{item.code_bill}}</p>
                            <p class="total_price">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.total_price)}}</p>
                        </div>
                        <div class="time_bill">
                            <p>{{item.date}}</p>
                        </div>
                        <div class="invoice">
                            <p>Người bán: </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content_right" v-if="validCustomer">
                <div class="top">
                    <div class="top_1 top_1_1">
                        <p>{{customer.code_bill}}</p>
                        <p>{{customer.customer_name}}</p>
                    </div>
                    <div class="top_1 top_1_2">
                        <p>{{customer.date}}</p>
                        <p>{{customer.email}}</p>
                    </div>
                    <div class="top_1 top_1_3">
                        <p>Nhân viên: {{customer.seller}}</p>
                        <p>{{customer.phone_number}}</p>
                    </div>
                    <div class="list_button">
                        <div class="list_button_1">
                            <button @click.stop.prevent="modalConfirm = true">
                                <i class="fal fa-print"></i>
                                <span>In hóa đơn</span>
                            </button>
                            <button>
                                <i class="fal fa-exchange"></i>
                                <span>Trả hàng</span>
                            </button>
                        </div>
                        <div class="list_button_2" v-if="openEdit">
                            <button @click.stop.prevent="handleUpdate">
                                <i class="fal fa-pen"></i>
                                <span>Cập nhật</span>
                            </button>
                        </div>
                        <div class="list_button_2" v-else>
                            <button @click.stop.prevent="handleEdit">
                                <i class="fal fa-pen"></i>
                                <span>Chỉnh sửa</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="center" v-if="openEdit">
                    <div class="list_item" >
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th class="action" style="width:50px;">Action</th>
                                    <th class="name">Tên SP</th>
                                    <th class="discount">Khuyến mãi</th>
                                    <th class="price">Giá</th>
                                    <th class="quantity">SL</th>
                                    <th class="total">Tổng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in listProduct" :key="row.id" style="height:50px;">
                                    <td style="text-align:center;color:#4c5bbf;cursor:pointer;" @click.stop.prevent="handleDelete(row)"><i class="fal fa-trash-alt"></i></td>
                                    <td class="name">{{row.product_name}}</td>
                                    <td class="discount">{{row.discount_price}}</td>
                                    <td class="price">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(row.price)}}</td>
                                    <td class="quantity">
                                        <button @click.stop.prevent="handleAmount(row, false)">-</button>
                                        <input type="text" name="quantity" :value="row.quantity">
                                        <button @click.stop.prevent="handleAmount(row, true)">+</button>
                                    </td>
                                    <td class="total">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(row.price * row.quantity)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="payments">
                        <div class="payments_1">
                            <div class="payments_1_1">
                                <div class="payments_1_1_1">Ghi chú:</div>
                            </div>
                            <div class="payments_1_2"></div>
                        </div>
                        <div class="payments_2">
                            <div class="payments_2_1 sub_total">
                                <span class="payments_2_1_1">Tổng ({{listProduct.length}} SP):</span>
                                <span class="payments_2_1_2">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(customer.subtotal)}}</span>
                            </div>
                            <div class="payments_2_1 tax">
                                <span class="payments_2_1_1">Thuế ({{customer.tax_value}}%):</span>
                                <span class="payments_2_1_2">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(customer.tax_price)}}</span>
                            </div>
                            <div class="payments_2_1 discount">
                                <span class="payments_2_1_1">KM ({{customer.discount_value + customer.discount_type}}):</span>
                                <span class="payments_2_1_2">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(customer.discount_price)}}</span>
                            </div>
                            <div class="payments_2_1 grand_total">
                                <span class="payments_2_1_1">Tổng cộng:</span>
                                <span class="payments_2_1_2">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(customer.total_price)}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="center" v-else>
                    <div class="list_item" >
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th class="name">Tên SP</th>
                                    <th class="discount">Khuyến mãi</th>
                                    <th class="price">Giá</th>
                                    <th class="quantity">SL</th>
                                    <th class="total">Tổng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in listProduct" :key="row.id" style="height:50px;">
                                    <td class="name">{{row.product_name}}</td>
                                    <td class="discount">{{row.discount_price}}</td>
                                    <td class="price">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(row.price)}}</td>
                                    <td class="quantity">{{row.quantity}}</td>
                                    <td class="total">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(row.price * row.quantity)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="payments">
                        <div class="payments_1">
                            <div class="payments_1_1">
                                <div class="payments_1_1_1">Ghi chú:</div>
                            </div>
                            <div class="payments_1_2"></div>
                        </div>
                        <div class="payments_2">
                            <div class="payments_2_1 sub_total">
                                <span class="payments_2_1_1">Tổng ({{listProduct.length}} SP):</span>
                                <span class="payments_2_1_2">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(customer.subtotal)}}</span>
                            </div>
                            <div class="payments_2_1 tax">
                                <span class="payments_2_1_1">Thuế ({{customer.tax_value}}%):</span>
                                <span class="payments_2_1_2">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(customer.tax_price)}}</span>
                            </div>
                            <div class="payments_2_1 discount">
                                <span class="payments_2_1_1">KM ({{customer.discount_value + customer.discount_type}}):</span>
                                <span class="payments_2_1_2">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(customer.discount_price)}}</span>
                            </div>
                            <div class="payments_2_1 grand_total">
                                <span class="payments_2_1_1">Tổng cộng:</span>
                                <span class="payments_2_1_2">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(customer.total_price)}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content_right content_right_else" v-else>
                <div class="title">Chọn hóa đơn</div>
                <div class="image">
                    <span><i class="fal fa-file-invoice-dollar"></i></span>
                </div>
            </div>
            <div class="modal_confirm" v-if="modalConfirm">
                <div class="modal_confirm_box">
                    <div class="top">Bảng in</div>
                    <div class="center">Xác nhận in hóa đơn!</div>
                    <div class="bottom">
                        <button class="bottom_1" @click.stop.prevent="handlePrint">In</button>
                        <button class="bottom_2" @click.stop.prevent="modalConfirm = false">Hủy</button>
                    </div>
                </div>
                <div class="modal_confirm_mask"></div>
            </div>
        </div>
        <FilterAdvanced ref="FilterAdvanced" :arrFilters="arrFilters"></FilterAdvanced>
    </div>
</template>

<script>
import FilterAdvanced from './FilterAdvanced';
export default {
    components: {
        FilterAdvanced
    },
    name: 'CompOrder',
    data: function(){
        return {
            open: false,
            data: [],
            active: '',
            customer: {},
            validCustomer: false,
            code_bill: '',
            search: '',
            debounce: null,
            listProduct: null,
            openEdit: false,
            tax: 0,
            listReplace: null,
            filters: {
                date: '',
                customer: ''
            },
            debounce_1: null,
            modalConfirm: false,
            arrFilters: []
        }
    },
    methods: {
        loadInvoice: function(){
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/invoices',
                headers: {'auth-token': localStorage.getItem('token')},
                params: {
                    keyword: vm.search,
                    date: vm.filters.date,
                    customer: vm.filters.customer
                }
            }).then(res => {
                let result = res.data.data;
                vm.data = result.docs;
                vm.arrFilters = res.data.filters
            }).catch(err => {
                console.log(err)
            })
        },
        handleSelectBill: function(item){
            let vm = this;
            vm.active = item.code_bill;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/invoices/' + item._id,
                headers: {'auth-token': localStorage.getItem('token')},
                params: {
                    seller_id: item.seller_id,
                    customer_id: item.customer_id
                }
            }).then(res => {
                let result = res.data.data;
                vm.validCustomer = true;
                vm.customer = {
                    id: item._id,
                    customer_name: result ? result.name : "Khách lẻ",
                    phone_number: result ? result.phone_number : "",
                    email: result ? result.email : "",
                    code_bill: item.code_bill,
                    date: item.date,
                    tax_price: item.tax_price,
                    tax_value: item.tax_value,
                    total_price: item.total_price,
                    discount_price: item.discount_price,
                    discount_value: item.discount_value,
                    discount_type: item.discount_type,
                    seller: res.data.name,
                    subtotal: item.subtotal
                };
                vm.listProduct = res.data.invoice_detail;
            }).catch(err => {
                console.log(err)
            });
        },
        handleEdit: function(){
            let vm = this;
            let customer = JSON.parse(localStorage.getItem('name'));
            if(vm.customer.seller == customer.name){
                vm.openEdit = true;
            }else{
                alert("Không thể thao tác trên hóa đơn này!")
            }
        },
        handleAmount: function(item, status){
            let vm = this;
            let findIndex = vm.listProduct.findIndex(row => row._id === item._id);
            if(status){
                vm.listProduct[findIndex].quantity += 1;
            }else{
                if(vm.listProduct[findIndex].quantity > 0){
                    vm.listProduct[findIndex].quantity -= 1;
                }
            };
        },
        handleDelete: function(item){
            let vm = this;
            let findIndex = vm.listProduct.findIndex(row => row._id === item._id);
            if(findIndex > -1){
                vm.listProduct.splice(findIndex, 1);
            }
        },
        handleUpdate: function(){
            let vm = this;
            vm.modalConfirm = true;
            vm.axios({
                method: "PUT",
                url: vm.$root.API_GATE + '/api/invoices/' + vm.customer.id,
                headers: {'auth-token': localStorage.getItem('token')},
                params: {
                    products: vm.listProduct,
                    new_invoice: vm.grandTotal
                }
            }).then(res => {
                if(res.data.error){

                }else{
                    vm.$parent.$refs.Content.$refs.ContentBill.loadInvoiceOfDate();
                    vm.openEdit = false;
                    vm.loadInvoice();
                }
            }).catch(err => {
                console.log(err)
            })
        },
        handlePrint: function(){
            let vm = this;
            window.frames["printf"].document.write(`<body style="@media print{@page{size: 80mm;}}">`)
            window.frames["printf"].document.write(`<div><h1 style="text-align:center;">Hệ thống cửa hàng</h1></div>`);
            window.frames["printf"].document.write(`<div><h3 style="text-align:center;">Soul Master</h3></div>`);
            window.frames["printf"].document.write(`<div><p style="padding-top:3px;">CN1: 123 Nguyễn Văn Khối</p></div>`)
            window.frames["printf"].document.write(`<div><p>CN2: 456 Nguyễn Văn Khối</p></div>`)
            window.frames["printf"].document.write(`
                <div style="padding-bottom:3px;">
                    <h2 style="text-align:center;">Hóa đơn thanh toán</h2>
                    <p style="display:flex;justify-content:space-between;align-items:center;">
                        <span>Hóa đơn: ${vm.customer.code_bill}</span>
                        <span>Ngày: ${(new Date()).toLocaleDateString()}</span>
                    </p>
                    <p>Nhân viên: ${vm.customer.seller}</p>
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
            vm.listProduct.forEach(item => {
                window.frames["printf"].document.write(`
                    <div class="list_item" style="border-bottom:1px dashed black;padding:15px 0;">
                        <div class="item" v-for="item in $parent.$refs.Content.data" :key="item.id" style="display:flex;align-items:center;">
                            <div style="width:40%;">${item.product_name}</div>
                            <div style="width:10%;">${item.quantity}</div>
                            <div style="width:25%;text-align:center;">${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price)}</div>
                            <div style="width:25%;text-align:right;position:relative;">
                                <div style="position:relative;">${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.quantity * item.price)}</div>
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
                        <p>Thuế (${vm.customer.tax_value}%):</p>
                        <p>${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(Number(vm.customer.tax_price))}</p>
                    </div>
                </div>
                <div style="display:flex; align-items:center;justify-content:flex-end;">
                    <div style="width:60%;display:flex;justify-content:space-between;">
                        <p>Chiết khấu(${vm.customer.discount_value + vm.customer.discount_type}):</p>
                        <p>${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(vm.customer.discount_price)}</p>
                    </div>
                </div>
                <div style="display:flex; align-items:center;justify-content:flex-end;">
                    <div style="width:60%;display:flex;justify-content:space-between;">
                        <p>Tổng cộng:</p>
                        <p>${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(vm.customer.total_price)}</p>
                    </div>
                </div>
            `);
            window.frames["printf"].document.write("</body>")
            window.frames["printf"].print();
            window.frames["printf"].document.close();
            vm.modalConfirm = false;
        }
    },
    created: function(){
        this.loadInvoice();
    },
    computed: {
        grandTotal: function(){
            let vm = this;
            let total = 0;
            vm.listProduct.map((item,index) => {
                total += item.price * item.quantity;
            });
            if(vm.customer.tax_value != 0){
                vm.tax = (total * vm.customer.tax_value) / 100;
                vm.customer.tax_price = vm.tax;
            };
            vm.customer.discount_price = ((total + vm.tax) * vm.customer.discount_value) / 100;
            vm.customer.total_price = total + vm.tax - vm.customer.discount_price;
            vm.customer.subtotal = total;
            return vm.customer;
        },
        arrReplace: function(){
            let vm = this;
            let arr = vm.listProduct.slice();
            return arr;
        }
    },
    watch: {
        'search': {
            deep: true,
            handler: function(newval){
                let vm = this;
                clearTimeout(vm.debounce);
                vm.debounce = setTimeout(function(){
                    vm.loadInvoice();
                },500)
            }
        },
        'filters.date'(newval){
            let vm = this;
            clearTimeout(vm.debounce_1);
            vm.debounce_1 = setTimeout(function(){
                let data = new Date(newval);
                vm.filters.date = (data.getMonth() + 1) + '/' + data.getDate() + '/' + data.getFullYear();
                vm.loadInvoice();
            },500)
        },
        'filters.customer': {
            deep: true,
            handler: function(newval){
                let vm = this;
                clearTimeout(vm.debounce_1);
                vm.debounce_1 = setTimeout(function(){
                    vm.loadInvoice();
                },500)
            }
        }
    }  
}
</script>

<style>

</style>