<template>
    <div class="manage__content" :class="open ? 'open' : ''">
        <div class="listUser">
            <div class="list__table">
                <div class="card">
                    <div class="card-header">
                        <h2 class="title-list-user">Manage Users</h2>
                    </div>
                    <div class="card-body">
                        <div class="card-top">
                            <div class="add-user" id="listButton">
                                <button class="button-item button-list-user" @click.stop.prevent="openModal('')">Add User</button>
                                <button class="button-item add-button">Import Excel</button>
                                <button class="button-item button-edit-user">Export Excel</button>
                            </div>
                            <div class="search-user">
                                <input type="search" name="search" v-model="search" placeholder="Search user" @keyup.enter="loadRecords()">
                            </div>
                        </div>
                        <div class="card-table">
                            <div class="card__content">
                                <component :search="search" ref="table" :array="data" :method="openModal" v-bind:is="card_content"></component>
                            </div>
                        </div>
                    </div>
                    <paginate :data="paginate"></paginate>
                </div>
            </div>
            <modaluser ref="modaluser" :dataItem="dataItem" :titleModal="titleModal"></modaluser>
        </div>
    </div>
</template>

<script>
import paginate from './Paginate';
import modaluser from './ModalUser';
import TableUser from './TableUser';
export default {
    components: {
        paginate,
        modaluser,
        TableUser
    },  
    name: "ListUser",
    data: function(){
        return {
            card_content: 'TableUser',
            paginate: {
                current_page: 1,
                number_page: 1,
                sort_by: 'name',
                sort_type: 'desc',
                limit: 10
            },
            data: [],
            search: '',
            titleModal: null,
            dataItem: {},
            totalDocs: [],
            debounce: null,
            open: false
        }
    },
    methods: {
        openModal: function (title) {
            this.dataItem = title;
            let role = title ? title.role_id.name : '';
            let default_url = title ? title.default_url : '';
            var new_form = {
                name: title.name,
                username: title.username,
                password: title.password,
                email: title.email,
                role: role,
                default_url: default_url,
            }
            this.titleModal = title;
            this.$refs.modaluser.open = true;
            this.$refs.modaluser.form = new_form;
            if (this.$refs.modaluser.open) {
                document.querySelector('body').style.overflow = 'hidden';
            }
        },
        loadRecords: function () {
            let vm = this;
            vm.axios.get(vm.$root.API_GATE + '/api/users', {
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                params: {
                    sort_by: vm.paginate.sort_by,
                    sort_type: vm.paginate.sort_type,
                    page: vm.paginate.current_page,
                    limit: vm.paginate.limit,
                    keyword: vm.search
                }
            }).then(function (response) {
                let result = response.data;
                vm.data = result.data.docs;
                if (vm.paginate.number_page != result.data.totalPages) {
                    vm.paginate.number_page = result.data.totalPages;
                }
            });
        },
        getRoleName: function (name) {
            if (typeof name != 'undefined') {
                return name['name']
            }
        }
    },
    computed: {

    },
    mounted: function () {

    },
    created: function () {
        this.loadRecords();
    },
    watch: {
        'search': {
            deep: true,
            handler: function (newval, oldval) {
                let vm = this;
                clearTimeout(vm.debounce);
                vm.debounce = setTimeout(function () {
                    vm.loadRecords();
                }, 500);
            }
        },
        'paginate': {
            deep: true,
            handler: function (newval, oldval) {
                this.loadRecords();
            }
        }
    }
}
</script>

<style>

</style>