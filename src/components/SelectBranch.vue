<template>
    <div class="select_branch" :class="open ? 'open' : ''">
        <div class="box" :class="popup ? 'popup' : ''">
            <div class="top">
                <div class="title">List Branch</div>
            </div>
            <div class="center">
                <div class="form-branch">
                    <div class="list-checkbox">
                        <div class="checkbox" v-for="(item, index) in data" :key="index">
                            <input type="checkbox" v-model="listBranch" :name="item.name" :value="item._id">
                            <label>{{item.name}}</label><br>
                        </div>
                    </div>
                </div>
                <span class="warning-error"></span>
            </div>
            <div class="bottom">
                <button class="add_branch" @click.stop.prevent="addBranch">Add</button>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="close_open"></div>
    </div>
</template>

<script>
export default {
    name: "SelectBranch",
    data: function(){
        return {
            open: false,
            popup: false,
            data: [],
            listBranch: [],
            debounce: null
        }
    },
    methods: {
        handleOpenAddBranch: function(){
            let vm = this;
            vm.popup = true;
            vm.$refs.addbranch.open = true;
        },
        loadBranches: function(){
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/branches/',
                headers: {'auth-token': localStorage.getItem('token')}
            }).then(res => {
                if(res.data.error){

                }else{
                    vm.data = res.data.data.docs;
                }
            }).catch(err => {
                console.log(err)
            })
        },
        close_open: function(){
            let vm = this;
            vm.open = false;
            vm.$parent.popup = false;
        },
        addBranch: function(){
            let vm = this;
            vm.$parent.list_branch = vm.listBranch;
            vm.open = false;
            vm.$parent.popup = false;
            vm.listBranch.sort(function(a,b){
                let number_a = a.name;
                let number_b = b.name;
                if(number_a < number_b) return -1;
                if(number_a > number_b) return 1;
                return 0;
            });
        }
    },
    mounted: function(){
        let vm = this;
    },
    created: function(){
        // this.loadBranches();
    },
    watch: {
        'listBranch': {
            deep: true,
            handler: function(newval){
                let vm = this;
                // vm.$parent.list_branch = newval;
            }
        }
    }
}
</script>

<style>

</style>