<template>
    <div class="create-permission" :class="open ? 'open' : ''">
        <div class="form">
            <div class="form-modal-header">
                <h3 class="title-add">Create Premission</h3>
            </div>
            <div class="form-modal-body">
                <form>
                    <div class="form-group">
                        <label for="permission" class="control-label">Permission name</label>
                        <input type="text" v-model="form.name" name="name" id="permission"
                            placeholder="Enter permission...">
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <label for="key" class="control-label">Key</label>
                        <input type="url" v-model="form.key" name="key" id="key" placeholder="Key...">
                        <span class="warning-error"></span>
                    </div>
                </form>
            </div>
            <div class="form-modal-footer">
                <div class="form-group add-button">
                    <button class="cancel-perrmission" @click.stop.prevent="close_open()">Cancel</button>
                    <button class="add-permission" @click.stop.prevent="addPermissions">Add permission</button>
                </div>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="close_open()"></div>
    </div>
</template>

<script>
export default {
    name: "addPermission",
    data: function () {
        return {
            open: false,
            form: {
                name: '',
                key: ''
            }
        }
    },
    methods: {
        close_open: function () {
            this.open = false;
            this.$emit('clicked-popup')
        },
        addPermissions: function () {
            let vm = this;
            let new_per = {
                name: vm.form.name,
                key: vm.form.key
            }
            vm.axios({
                method: "POST",
                url: vm.$root.API_GATE + '/api/permissions/',
                data: new_per,
                headers: { 'auth-token': localStorage.getItem('token') }
            }).then(res => {
                vm.close_open();
                vm.$parent.listPermissions();
            }).catch(err => {
                console.log(err)
            })
        }
    },
}
</script>

<style>

</style>