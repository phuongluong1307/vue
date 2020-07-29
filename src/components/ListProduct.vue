<template>
    <div class="list_product" :class="open ? 'open' : ''">
        <div class="box product_box">
            <div class="top">
                <div class="title">Danh sách sản phẩm</div>
            </div>
            <div class="container center">
                <div class="handing">
                    <div class="add_product">
                        <button @click.stop.prevent="openAddProduct">Thêm sản phẩm</button>
                    </div>
                    <div class="filter_product">
                        <input type="text" v-model="search" placeholder="Tìm kiếm sản phẩm">
                    </div>
                </div>
                <table class="table table-bordered">
                    <thead class="thead_table">
                        <tr>
                            <th class="stt">#</th>
                            <th class="name">Tên sản phẩm</th>
                            <th class="price">Giá</th>
                            <th class="delete">Xóa</th>
                            <th class="edit">Sửa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="tr_table" v-for="(item, index) in data" :key="item.id">
                            <td class="stt">{{index + 1}}</td>
                            <td class="name">{{item.product_name}}</td>
                            <td class="price">{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price)}}</td>
                            <td class="delete" @click.stop.prevent="handleDelete(item)"><i class="fal fa-minus-circle"></i></td>
                            <td class="edit" @click.stop.prevent="openEditProduct(item)"><i class="fal fa-edit"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <ModalProduct ref="ModalProduct"></ModalProduct>
        <ModalDelete ref="ModalDelete"></ModalDelete>
    </div>
</template>

<script>
import ModalProduct from './ModalProduct';
import ModalDelete from './ModalDelete';
export default {
    components: {
        ModalProduct,
        ModalDelete
    },
    name: 'ListProduct',
    data(){
        return {
            open: false,
            open_modal: false,
            data: [],
            id_product: '',
            editModal: null,
            productId: '',
            search: '',
            debounce: null
        }
    },
    methods: {
        loadRecords: function(){
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + "/api/products",
                headers: {'auth-token': localStorage.getItem('token')},
                params: {
                    keyword: vm.search
                }
            }).then(res => {
                if(res.data.error === true){
                    console.log(res.data.message)
                }else{
                    vm.data = res.data.data.docs;
                }
            }).catch(err => {
                console.log(err)
            })
        },
        openAddProduct: function(){
            let vm = this;
            vm.editModal = null;
            vm.open_modal = true;
            let new_product = {
                thumbnail: '',
                product_SKU: '',
                product_name: '',
                category: '',
                price: '',
            };
            vm.$refs.ModalProduct.form_product = new_product;
        },
        handleDelete: function(item){
            let vm = this;
            vm.$refs.ModalDelete.open = true;
            vm.id_product = item.id;
        },
        openEditProduct: function(value){
            let vm = this;
            let update_product = {
                id: value.id,
                product_SKU: value.product_SKU,
                product_name: value.product_name,
                price: value.price,
                thumbnail: value.thumbnail
            };
            vm.productId = value.id;
            vm.editModal = value;
            vm.$refs.ModalProduct.$refs.SelectMulti.name = value.category;
            vm.open_modal = true;
            vm.$refs.ModalProduct.form_product = update_product;
        }
    },
    created: function(){
        this.loadRecords();
    },
    watch: {
        search(newval,oldval){
            let vm = this;
            clearTimeout(vm.debounce);
            vm.debounce = setTimeout(function(){
                vm.loadRecords();
            },500)
        }
    }
}
</script>

<style>

</style>