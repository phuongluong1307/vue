<template>
    <div class="create-branch" :class="open ? 'open' : ''">
        <div class="form">
            <div class="form-modal-header">
                <h3 class="title-add">Create branch</h3>
            </div>
            <div class="form-modal-body">
                <form>
                    <div class="form-group">
                        <label for="branch" class="control-label">Branch name</label>
                        <input type="text" v-model="form.name" name="name" id="branch"
                            placeholder="Enter branch...">
                        <span class="warning-error"></span>
                    </div>
                </form>
            </div>
            <div class="form-modal-footer">
                <div class="form-group add-button">
                    <button class="cancel-branch" @click.stop.prevent="close_open()">Cancel</button>
                    <button class="add-branch" @click.stop.prevent="addBranch">Add branch</button>
                </div>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="close_open"></div>
    </div>
</template>

<script>
export default {
    name: "addbranch",
    data(){
        return {
            open: false,
            form: {
                name: ''
            }
        }
    },
    methods: {
        addBranch: function(){
            let vm = this;
            vm.axios({
                method: "POST",
                url: vm.$root.API_GATE + '/api/branches/',
                headers: {'auth-token': localStorage.getItem('token')},
                data: vm.form
            }).then(res => {
                if(res.data.error){

                }else{
                    vm.close_open();
                }
            }).catch(err => {
                console.log(err)
            })
        },
        close_open: function(){
            let vm = this;
            vm.$parent.popup = false;
            vm.open = false;
        }
    }
}
</script>

<style>

</style>