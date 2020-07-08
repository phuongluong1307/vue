<template>
    <div class="adjust" :class="open ? 'open' : '' ">
        <div class="box">
            <div class="detail_product">
                <div class="image_product">
                    <img :src="$parent.obj.image" style="width:100px; height:100%;" alt="">
                </div>
                <div class="info_product">
                    <div class="info_item">
                        <h5>{{$parent.obj.name_product}}</h5>
                    </div>
                    <div class="info_item">
                        <p>SKU code:</p>
                    </div>
                    <div class="info_item">
                        <p>Barcode:</p>
                    </div>
                    <div class="info_item">
                        <p>Giá bán: <span>{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format($parent.obj.price)}}</span></p>
                    </div>
                </div>
            </div>
            <div class="promotion">
                <ul class="promotion_1">
                    <li class="promotion_1_1" :class="{active: promotion === 'quantity'}" @click.stop.prevent="handleActive('quantity')">
                        <p>SỐ LƯỢNG</p>
                        <p>{{$parent.obj.quantity}}</p>
                    </li>
                    <li class="promotion_1_1" :class="{active: promotion === 'tax'}" @click.stop.prevent="handleActive('tax')">
                        <p>THUẾ</p>
                        <p>10%</p>
                    </li>
                    <li class="promotion_1_1" :class="{active: promotion === 'discount'}" @click.stop.prevent="handleActive('discount')">
                        <p>GIẢM GIÁ</p>
                        <p>0</p>
                    </li>
                </ul>
            </div>
            <div class="table_number">
                <div class="list_table table_1" :class="{active: promotion === 'quantity'}">
                    <div class="table_1_1">
                        <div class="table_1_1_1">
                            <span>{{quantity}}</span>
                        </div>
                        <div class="table_1_1_2">
                            <Calculator @handleCal="handleCal" @handleMinus="handleMinus"></Calculator>
                        </div>
                    </div>
                </div>
                <div class="list_table table_2" :class="{active: promotion === 'tax'}">
                    <ul>
                        <li>
                            <label class="label_radio">GST 10%
                                <input type="radio" name="radio">
                                <span class="check_tax"></span>
                            </label>
                        </li>
                        <li>
                            <label class="label_radio">GST 10%
                                <input type="radio" name="radio">
                                <span class="check_tax"></span>
                            </label>
                        </li>
                        <li>
                            <label class="label_radio">CSGT 10%
                                <input type="radio" name="radio">
                                <span class="check_tax"></span>
                            </label>
                        </li>
                        <li>
                            <label class="label_radio">SGST 10%
                                <input type="radio" name="radio">
                                <span class="check_tax"></span>
                            </label>
                        </li>
                        <li>
                            <label class="label_radio">VAT 14%
                                <input type="radio" name="radio">
                                <span class="check_tax"></span>
                            </label>
                        </li>
                        <li>
                            <label class="label_radio">VAT 10%
                                <input type="radio" name="radio">
                                <span class="check_tax"></span>
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="list_table table_3" :class="{active: promotion === 'discount'}">
                    <div class="table_3_1">
                        <div class="table_3_1_1">
                            <div class="discount_type">
                                <label class="label_radio" :class="{active: discount === '%'}">%
                                    <input type="radio" name="radio"  v-model="discount" @click.stop.prevent="handleDiscount('%')">
                                    <span class="check_discount"></span>
                                </label>
                                <label class="label_radio" :class="{active: discount === 'VND'}">VND
                                    <input type="radio" name="radio" v-model="discount" @click.stop.prevent="handleDiscount('VND')">
                                    <span class="check_discount"></span>
                                </label>
                            </div>
                            <div class="discount_price">
                                <label>{{number}}</label>
                                <input type="number" id="number_percent" v-model="number" style="display:none;">
                            </div>
                        </div>
                        <div class="table_3_1_2">
                            <Calculator @handleCal="handleCal" @handleMinus="handleMinus"></Calculator>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form_btn">
                <button @click.stop.prevent="handleUpdate">Cập nhật</button>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="open = false"></div>
    </div>
</template>

<script>
import Calculator from './Calculator';
export default {
    name: 'AdjustProduct',
    components: {
        Calculator
    },
    data: function(){
        return {
            open: false,
            promotion: 'quantity',
            name_promotion: 'quantity',
            discount: '%',
            quantity: null,
            number: '0'
        }
    },
    methods: {
        handleActive: function(item){
            let vm = this;
            vm.name_promotion = item
            vm.promotion = vm.name_promotion;
        },
        handleDiscount: function(dc){
            let vm = this;
            if(dc === '%'){
                vm.discount = dc
            }else{
                vm.discount = dc
            }
        },
        handleCal: function(val){
            let vm = this;
            if(vm.promotion === 'quantity'){
                if(vm.quantity == "0"){
                    vm.quantity = vm.quantity.replace("0", '');
                }
                vm.quantity = "" + vm.quantity + val;
            }else if(vm.promotion === 'discount'){
                if(vm.discount == '%'){
                    if(vm.discount === '%'){
                        let input = document.getElementById('number_percent');
                        input.min = "1";
                        input.max = "100";
                    };
                };
                if(vm.number == "0"){
                    vm.number = vm.number.replace("0", '');
                }
                vm.number = "" + vm.number + val;
            }
        },
        handleMinus: function(){
            let vm = this;
            let index = vm.quantity.length;
            if(vm.promotion === 'quantity'){
                vm.quantity = vm.quantity.substring(0, index - 1);
                if(vm.quantity == ""){
                    vm.quantity = "" + 0;
                }
            }else if(vm.promotion === 'discount'){
                let findIndex = vm.number.length;
                vm.number = vm.number.substring(0, findIndex - 1);
                if(vm.number == ''){
                    vm.number = "" + 0;
                }
            }
        },
        handleUpdate: function(){
            let vm = this;
            
        }
    },
    computed: {
        
    },
    created: function(){
        let vm = this;
    },
    watch: {
        
    }
}
</script>

<style>

</style>