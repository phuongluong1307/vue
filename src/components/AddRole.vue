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
                        <div class="title_check">
                            <div class="title">
                                <p class="title_listpermission">Permissions:</p>
                            </div>
                            <div class="check_input">
                                <input type="checkbox" ref="checkAll" name="permission" id="check_all" @change.stop.prevent="hanleSelectAllRole">
                                <label for="check_all">Chọn tất cả</label>
                            </div>
                        </div>
                        <div class="form-permission">
                            <div class="list_checkbox_1" v-for="(item, index) in getTypePermission" :key="index">
                                <div class="list_checkbox_1_1">
                                    <div class="title">{{item.route}}:</div>
                                    <div class="check_input">
                                        <input type="checkbox" ref="checkList" name="permission" @change.stop.prevent="handleSelectListRole($event,item)">
                                        <label>Chọn</label>
                                    </div>
                                </div>
                                <div class="list-checkbox">
                                    <div class="checkbox" v-for="(row,rowIndex) in item.method" :key="rowIndex">
                                        <input type="checkbox" ref="checkbox_permission" v-model="formRole.permissions" :name="row.name" :value="row.method + ':' + row.route">
                                        <label>{{row.method}}</label><br>
                                    </div>
                                </div>
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
        <div class="mask" @click.stop.prevent="changePopup()"></div>
    </div>
</template>

<script>
export default {
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
            listPer: [],
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
        },
        handleSelectListRole: function(e,item){
            let vm = this;
            let arr = item.method;
            if(e.path[0].checked){
                for(let i = 0; i < arr.length;i++){
                    let j = arr[i].method + ':' + arr[i].route;
                    if(!vm.formRole.permissions.includes(j)){
                        vm.formRole.permissions.push(j);
                    };
                };
            }else{
                for(let i = 0; i < arr.length;i++){
                    let url = arr[i].method + ':' + arr[i].route;
                    let findIndex = vm.formRole.permissions.findIndex(row => row == url);
                    if(findIndex > -1){
                        vm.formRole.permissions.splice(findIndex, 1);
                    }
                };
            } 
        },
        hanleSelectAllRole: function(){
            let vm = this;
            let list_role = vm.$refs.checkbox_permission;
            if(vm.$refs.checkAll.checked){
                list_role.map(item => {
                    item.checked = true;
                    if(!vm.formRole.permissions.includes(item.defaultValue)){
                        vm.formRole.permissions.push(item.defaultValue)
                    };
                });
            }else{
                vm.formRole.permissions = [];
            };
        }
    },
    computed: {
        listRoute: function(){
            let vm = this;
            let listRoute = [];
            vm.listPer.map((item,index) => {
                let route = item.route.replace('/api/', '');
                if(!listRoute.includes(route)){
                    listRoute.push(route);
                };
            });
            return listRoute;
        },
        getTypePermission: function(){
            let vm = this;
            let arr = null;
            let arrMethod = [];
            vm.listRoute.map(item => {
                arr = vm.listPer.filter(row => row.route.replace('/api/', '') == item);
                arrMethod.push({
                    method: arr,
                    route: item
                });
            });
            return arrMethod;
        }
    },
    created: function () {
        // this.listPermissions();
    }
}
</script>

<style>

</style>