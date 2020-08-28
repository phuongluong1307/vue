<template>
    <div class="modal_discount">
        <div class="box">
            <div class="top">
                <h4 class="title">Thêm giảm giá</h4>
                <div class="grand_total">
                    <div class="grand_total_1">Trước giảm giá</div>
                    <div class="grand_total_2">
                        <label>{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format($parent.handleTotal)}}</label>
                        <input type="number" style="display:none;">
                    </div>
                </div>
                <div class="grand_total grand_discount">
                    <div class="grand_discount_1">Sau giảm giá</div>
                    <div class="grand_discount_2">
                        <label>{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(grandDiscount)}}</label>
                        <input type="number" style="display:none;">
                    </div>
                </div>
            </div>
            <div class="center">
                <div class="center_1">
                    <div class="discount_type">
                        <label class="label_radio" :class="discount=='%' ? 'active' : ''">%
                            <input type="radio" name="radio" v-model="discount" @click.stop.prevent="handleDiscount('%')">
                            <span class="check_discount"></span>
                        </label>
                        <label class="label_radio" :class="discount=='VND' ? 'active' : ''">VND
                            <input type="radio" name="radio" v-model="discount" @click.stop.prevent="handleDiscount('VND')">
                            <span class="check_discount"></span>
                        </label>
                    </div>
                    <div class="discount_price">
                        <label>{{number}}</label>
                        <input type="number" v-model="number" id="number_percent" style="display:none;">
                    </div>
                </div>
                <div class="center_2">
                    <Calculator @handleCal="handleCal" @handleMinus="handleMinus"></Calculator>
                </div>
            </div>
            <div class="bottom">
                <button @click.stop.prevent="handleAddDiscount">Thêm</button>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="$parent.openModalDiscount = false"></div>
    </div>
</template>

<script>
import Calculator from './Calculator';
export default {
    components: {
        Calculator
    },
    name: 'ModalDiscount',
    data: function(){
        return {
            discount: '%',
            number: '0'
        }
    },
    methods: {
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
            if(vm.discount == '%'){
                if(vm.discount === '%'){
                    
                };
            };
            if(vm.number == "0"){
                vm.number = vm.number.replace("0", '');
            }
            vm.number = "" + vm.number + val;
        },
        handleMinus: function(){
            let vm = this;
            let findIndex = vm.number.length;
            vm.number = vm.number.substring(0, findIndex - 1);
            if(vm.number == ''){
                vm.number = "" + 0;
            }
        },
        handleAddDiscount: function(){
            let vm = this;
            let obj = {
                discount_value: vm.number,
                discount_type: vm.discount
            }
            vm.$emit("handleAddDiscount", obj)
        }
    },
    computed: {
        grandDiscount: function(){
            let vm = this;
            let total = vm.$parent.handleTotal;
            if(vm.discount == '%'){
                total = total - ((total * vm.number) / 100);
            }else{
                total = total - vm.number;
            };
            return total;
        }
    }
}
</script>

<style>

</style>