<template>
    <div class="list-product" :class="open ? 'open' : ''">
        <div class="product-box">
            <div class="card">
                <div class="card-header">
                    <h2 class="title-list-product">Product</h2>
                </div>
                <div class="card-body">
                    <div class="card-top">
                        <div class="add-product" id="listButton">
                            <button class="button-item button-add-product" @click.stop.prevent="openAddProduct('')">Add Product</button>
                            <button class="button-item button-import">Import Excel</button>
                            <button class="button-item button-export">Export Excel</button>
                        </div>
                        <div class="search-product">
                            <input type="search" name="search" v-model="search" placeholder="Search product">
                        </div>
                    </div>
                    <div class="card-table">
                        <div class="card__content">
                            <TableProduct :method="openEditProduct" :search="search"></TableProduct>
                        </div>
                    </div>
                </div>
                <PaginateProduct :filter="filter"></PaginateProduct>
            </div>
        </div>
        <ModalProduct ref="ModalProduct" :editModal="editModal"></ModalProduct>
    </div>
</template>

<script>
import ModalProduct from './ModalProduct';
import TableProduct from './TableProduct';
import PaginateProduct from './PaginateProduct';
export default {
    components: {
        ModalProduct,
        TableProduct,
        PaginateProduct
    },
    name: "ListProduct",
    data: function () {
        return {
            search: '',
            editModal: null,
            form_product: {
                thumbnail: '',
                product_SKU: '',
                product_name: '',
                category: '',
                price: '',
                created_at: ''
            },
            dataProduct: [],
            productItem: {},
            filter: {
                sort_by: 'product_name',
                sort_type: 'desc',
                limit: 10,
                current_page: 1,
                number_page: 1,
            },
            debounce: null,
            open: false
        }
    },
    methods: {
        openAddProduct: function () {
            let vm = this;
            vm.$refs.ModalProduct.open = true;
            vm.editModal = null;
            let new_product = {
                thumbnail: '',
                product_SKU: '',
                product_name: '',
                category: '',
                price: '',
                created_at: ''
            }
            vm.$refs.ModalProduct.image = '';
            vm.$refs.ModalProduct.$children[0].number = '';
            vm.$refs.ModalProduct.form_product = new_product;
            vm.$refs.ModalProduct.validSingle = false;
            var body = document.querySelector('body');
            if (vm.$refs.ModalProduct.open) {
                body.style.overflow = 'hidden';
            }
        },
        openEditProduct: function (value) {
            let vm = this;
            vm.productItem = value;
            var new_product = {
                id: value.id,
                product_SKU: value.product_SKU,
                product_name: value.product_name,
                category: value.category,
                create_at: value.create_at,
            };
            vm.$refs.ModalProduct.validSingle = true;
            vm.$refs.ModalProduct.image = value.thumbnail;
            vm.$refs.ModalProduct.$children[0].number = value.price;
            this.editModal = value;
            this.$refs.ModalProduct.open = true;
            this.$refs.ModalProduct.form_product = new_product;
        },
        getListProduct: function () {
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/products/',
                headers: { 'auth-token': localStorage.getItem('token') },
                params: {
                    sort_by: vm.filter.sort_by,
                    sort_type: vm.filter.sort_type,
                    limit: vm.filter.limit,
                    page: vm.filter.current_page,
                    keyword: vm.search
                }
            }).then(res => {
                let result = res.data;
                let data = result.data.docs;
                vm.dataProduct = data;
                if (vm.filter.number_page != result.data.totalPages) {
                    vm.filter.number_page = result.data.totalPages;
                };
            }).catch(err => {
                console.log(err)
            })
        }
    },
    computed: {

    },
    mounted: function () {

    },
    created: function () {
        this.getListProduct();
    },
    watch: {
        'filter': {
            deep: true,
            handler: function (newVal, oldVal) {
                this.getListProduct();
            }
        },
        'search': {
            deep: true,
            handler: function (newVal, oldVal) {
                let vm = this;
                clearTimeout(vm.debounce);
                vm.debounce = setTimeout(function () {
                    vm.getListProduct();
                }, 500)
            }
        }
    }
}
</script>

<style>

</style>