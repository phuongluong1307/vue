<template>
    <table class="table table-striped table-user">
        <thead>
            <tr>
                <th style="width:5%;">#</th>
                <th class="table-th" @click.stop.prevent="sortKey('username')"><span><i class="fas fa-sync"></i></span>Username</th>
                <th class="table-th" @click.stop.prevent="sortKey('name')"><span><i class="fas fa-sync"></i></span>Name</th>
                <th class="table-th" @click.stop.prevent="sortKey('role_id')"><span><i class="fas fa-sync"></i></span>Role</th>
                <th class="table-th" @click.stop.prevent="sortKey('default_url')"><span><i class="fas fa-sync"></i></span>Default page</th>
                <th class="table-th" @click.stop.prevent="sortKey('created_at')"><span><i class="fas fa-sync"></i></span>Created at</th>
                <th class="table-th">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in array" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.role.name }}</td>
                <td>{{ item.default_url }}</td>
                <td>{{ item.created_at | mm-dd-yyyy}}</td>
                <td>
                    <ul class="tb_ul">
                        <li class="tb_li">
                            <a href="#" data-toggle="tooltip" title="Delete user!" data-placement="top" class="list__action" @click.stop.prevent="openDeleteModal(item)"><i class="far fa-trash-alt"></i></a>
                        </li>
                        <li class="tb_li">
                            <a href="reset-password.html" data-toggle="tooltip" title="Change email!" data-placement="top" class="list__action"><i class="far fa-envelope"></i></a>
                        </li>
                        <li class="tb_li">
                            <a href="#" data-toggle="tooltip" title="Edit user!" data-placement="top" class="list__action" @click.stop.prevent="method(item)"><i class="fas fa-user-edit"></i></a>
                        </li>
                    </ul>
                </td>
            </tr>
        </tbody>
        <ModalWarningDelete :infoUser="infoUser" ref="ModalWarningDelete"></ModalWarningDelete>
    </table>
</template>

<script>
import ModalWarningDelete from './ModalWarningDelete';
export default {
    components: {
        ModalWarningDelete
    },
    name: "table-user",
    props: {
        method: { type: Function },
        array: { type: Array }
    },
    data: function () {
        return {
            infoUser: null,
            warningEmpty: false,
        }
    },
    methods: {
        sortKey: function (key) {
            if (this.$parent.paginate.sort_by == key) {
                this.$parent.paginate.sort_type = this.$parent.paginate.sort_type == 'desc' ? 'asc' : 'desc';
            } else {
                this.$parent.paginate.sort_by = key;
                this.$parent.paginate.sort_type = 'desc';
            }
            this.$parent.$forceUpdate();
        },
        openDeleteModal: function (item) {
            this.$refs.ModalWarningDelete.open = true;
            this.infoUser = item;
        },
        reloadTable: function () {
            return this.$parent.loadRecords();
        }
    },
    computed: {

    },
    mounted: function () {

    },
    watch: {
        'search_data': {
            deep: true,
            handler: function (newVal, oldVal) {
                let vm = this;
                if (newVal == '') {
                    vm.warningEmpty = true;
                } else {
                    vm.warningEmpty = false
                }
            }
        }
    },
    filters: {
        'mm-dd-yyyy': function(value){
            let data = new Date(value);
            return (data.getMonth() + 1) + '/' + data.getDate() + '/' + data.getFullYear();
        }
    }
}
</script>

<style>

</style>