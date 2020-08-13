<template>
    <div class="add-new-role" :class="open ? 'open' : ''">
        <div class="container form" :class="popup ? 'close-popup' : ''">
            <div class="form-modal-header">
                <h3 class="title-add">Create Role</h3>
            </div>
            <div class="form-modal-body">
                <form>
                    <div class="form-group">
                        <label class="control-label">Role name:</label>
                        <input type="text" name="rolename" v-model="formRole.name" id="rolename" placeholder="Enter role name...">
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <p class="title_listpermission">Permissions:</p>
                        <div class="form-permission">
                            <div class="list-checkbox">
                                <div class="checkbox" v-for="(item,index) in listPer" :key="index">
                                    <input type="checkbox" v-model="formRole.permissions" :name="item.name" :value="item.method + ':' + item.route">
                                    <label>{{item.method + ':' + item.route}}</label><br>
                                </div>
                            </div>
                            <div class="button_addrole">
                                <button @click.stop.prevent="addPer()">Create Permission</button>
                            </div>
                        </div>
                        <span class="warning-error"></span>
                    </div>
                </form>
            </div>
            <div class="form-modal-footer">
                <div class="form-group add-button">
                    <button class="cancel-role" @click.stop.prevent="changePopup()">Cancel</button>
                    <button class="add-role" @click.stop.prevent="createRole">Add role</button>
                </div>
            </div>
        </div>
        <addPermission ref="addPermission" @clicked-popup='popup = false'></addPermission>
        <div class="mask" @click.stop.prevent="changePopup()"></div>
    </div>
</template>

<script>
import addPermission from './AddPermission';
export default {
    components: {
        addPermission
    },
    name: "addrole",
    data: function () {
        return {
            open: false,
            popup: false,
            formRole: {
                name: '',
                permissions: []
            },
            newRoles: null,
            listPer: []
        }
    },
    methods: {
        addPer: function () {
            this.$refs.addPermission.open = true;
            this.popup = true;
        },
        changePopup: function () {
            this.open = false;
            this.$emit('clicked-popup')
        },
        createRole: function () {
            let vm = this;
            let new_role = {
                name: vm.formRole.name,
                permissions: vm.formRole.permissions
            }
            vm.axios({
                method: "POST",
                url: vm.$root.API_GATE + '/api/roles/',
                data: new_role,
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            }).then(res => {
                if (typeof res != 'undefined') {
                    vm.$parent.form.role = res.data.data.name;
                };
                vm.changePopup();
                vm.$parent.listRoles();
            }).catch(err => {
                console.log(err)
            })
        },
        listPermissions: function () {
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/reload-permission',
                headers: { 'auth-token': localStorage.getItem('token') }
            }).then(res => {
                let vm = this;
                vm.listPer = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        }
    },
    computed: {

    },
    created: function () {
        this.listPermissions();
    }
}
</script>

<style>

</style>