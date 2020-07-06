<template>
    <div class="calculator">
        <div class="grid_item" v-for="item in 9" :key="item">
            <button @click.stop.prevent="handleCal(item)">{{item}}</button>
        </div>
        <div class="grid_item"><button>.</button></div>
        <div class="grid_item" @click.stop.prevent="handleCal(0)"><button>0</button></div>
        <div class="grid_item" @click.stop.prevent="handleMinus"><button><i class="fas fa-times"></i></button></div>
    </div>
</template>

<script>
export default {
    name: 'Calculator',
    data: function(){
        return {
            
        }
    },
    methods: {
        handleCal: function(item){
            let vm = this;
            vm.$emit('handleCal', item)
        },
        handleMinus: function(){
            let vm = this;
            vm.$emit('handleMinus')
        }
    },
    watch: {
        
    }
}
</script>

<style>

</style>