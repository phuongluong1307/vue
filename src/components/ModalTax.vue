<template>
    <div class="modal_tax" :class="open ? 'open' : ''">
        <div class="box_tax">
            <div class="center">
                <div class="center_2">
                    <label>{{number}}</label>
                    <input type="number" v-model="number" id="number_percent" style="display:none;">
                </div>
                <Calculator @handleCal="handleCal" @handleMinus="handleMinus"></Calculator>
            </div>
            <div class="bottom">
                <button class="bottom_1" @click.stop.prevent="handleTax">Chọn</button>
            </div>
        </div>
        <div class="mask_tax" @click.stop.prevent="open = false"></div>
    </div>
</template>

<script>
import Calculator from './Calculator';
export default {
    components: {
        Calculator
    },
    name: "ModalTax",
    data: function(){
        return {
            number: '0',
            open: false,
        }
    },
    methods: {
        handleCal: function(val){
            let vm = this;
            if(vm.number == "0"){
                vm.number = vm.number.replace("0", '');
            };
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
        handleTax: function(){
            let vm = this;
            let obj = {
                tax_type: vm.tax_type,
                tax_value: Number(vm.number)
            };
            vm.$emit("handleAddTax", obj);
        }
    }
}
</script>

<style>

</style>