<template>
    <div class="select_multi">
        <div class="selecter" @click.stop.prevent="select = !select">
            <div class="text">{{name == "" ? title : name}}</div>
            <div class="icon"><i class="fal fa-chevron-down"></i></div>
            <div class="select_box" v-if="select">
                <ul>
                    <li class="select_item" v-for="item in data" :key="item" @click.stop.prevent="handleItem(item)">
                        <a>{{item}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {type: String},
        data:  {type: Array}
    },
    name: 'SelectMulti',
    data: function(){
        return {
            select: false,
            name: ''
        }
    },
    methods: {
        handleItem: function(item){
            let vm = this;
            vm.name = item;
            vm.select = false;
        }
    },
    computed: {
        
    },
    watch: {
        
    }
}
</script>

<style>

</style>