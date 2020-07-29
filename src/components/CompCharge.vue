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
                            <p class="txt_name"><i class="fal fa-user-circle"></i><span>Nguyễn Văn A</span></p>
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
                            <div class="item" v-for="(item, index) in data" :key="index">
                                <div class="delete" @click.stop.prevent="deleteItem(index)">
                                    <i class="fal fa-times"></i>
                                </div>
                                <div class="name">{{item.name_product}}</div>
                                <div class="quantity">
                                    <span>{{item.quantity}}</span>
                                </div>
                                <div class="total">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="left_3">
                    <div class="left_3_1 sub_total">
                        <div class="left_3_1_1 sub_total_1">
                            <p class="sub_total_1_1">Tổng cộng({{$parent.handleQuantity}} sản phẩm)</p>
                            <p class="txt">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format($parent.handleTotal)}}</p>
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
                            <p class="discount_1_1">Giảm giá</p>
                            <p class="txt">0</p> 
                        </div>
                    </div>
                    <div class="left_3_1 grand_total">
                        <div class="left_3_1_1 grand_total_1">
                            <p class="grand_total_1_1">Tổng cộng</p>
                            <p class="txt">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format($parent.handleTotal)}}</p> 
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
                    <button class="delete">Hủy</button>
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
            </div>
        </div>
        <GiftCard ref="GiftCard"></GiftCard>
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
            open_confirm: false
        }
    },
    methods:{
        deleteItem: function(index){
            let vm = this;
            vm.$parent.$refs.SingleBill.deleteItem(index);
        },
        handlePrint: function(){
            let vm = this;
            let print = document.getElementById('print_80').innerHTML;
            let body = document.body.innerHTML;
            document.body.innerHTML = print;
            window.print();
            document.body.innerHTML = body;
        }
    },
    created: function(){
        
    }
}
</script>

<style>

</style>