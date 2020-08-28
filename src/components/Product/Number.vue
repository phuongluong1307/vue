<template>
    <input v-model="number" type="text" placeholder="Enter price..." @keyup="handleFormatCurrency" />
</template>

<script>
export default {
    name: 'number',
    data: function () {
        return {
            number: '',
            debounce: null
        }
    },
    methods: {
        formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
            try {
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

                const negativeSign = amount < 0 ? "-" : "";

                let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                let j = (i.length > 3) ? i.length % 3 : 0;

                return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
            } catch (e) {
                console.log(e)
            };
        },
        handleFormatCurrency: function(){
            let vm = this;
            vm.number = vm.number.replace(',', '');
            clearTimeout(vm.debounce);
            vm.debounce = setTimeout(function(){
                vm.number = vm.formatMoney(vm.number)
            },500)
        }
    },
    watch:{
        
    }
}
</script>

<style>

</style>