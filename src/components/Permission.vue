<template>
    <div class="permission" :class="open ? 'open' : ''">
        <div class="box">
            <div class="top">
                <div class="title">Quản lý quyền truy cập</div>
            </div>
            <div class="center">
                <SelectMulti title="Chọn vai trò" :data="data"></SelectMulti>
                <table class="table table-collapse table_permission">
                    <thead>
                        <tr>
                            <th>Vai trò</th>
                            <th>Get</th>
                            <th>Post</th>
                            <th>Put</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in arr_permission" :key="index">
                            <td>{{item.route}}</td>
                            <td><input type="checkbox" v-model="checkMethod" :value="item.method" name="get"></td>
                            <td><input type="checkbox" v-model="checkMethod" :value="item.method" name="post"></td>
                            <td><input type="checkbox" v-model="checkMethod" :value="item.method" name="put"></td>
                            <td><input type="checkbox" v-model="checkMethod" :value="item.method" name="delete"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="bottom"></div>
        </div>
    </div>
</template>

<script>
import SelectMulti from './SelectMulti';
export default {
    components: {
        SelectMulti
    },
    name: 'Permission',
    data(){
        return {
            open: false,
            data: ["Người dùng", "Quản lý"],
            arr_permission: [],
            checkMethod: []
        }
    },
    methods: {
        getListPermission: async function(){
            let vm = this;
            await vm.axios({
                url: vm.$root.API_GATE + "/reload-permission"
            }).then(res => {
                vm.arr_permission = res.data.data;
            })
        }
    },
    created: function(){
        this.getListPermission();
    }
}
</script>

<style>

</style>