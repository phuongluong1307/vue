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
                            <button class="button-item button-import" @click.stop.prevent="openExcel = true">Import Excel</button>
                            <button class="button-item button-print-barcode" @click.stop.prevent="modalConfirm = true">Print Barcode</button>
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
            <div class="modal_confirm" v-if="modalConfirm">
                <div class="modal_confirm_box">
                    <div class="top">Bảng in</div>
                    <div class="center">Xác nhận in hóa đơn!</div>
                    <div class="bottom">
                        <button class="bottom_1" @click.stop.prevent="handlePrint">In</button>
                        <button class="bottom_2" @click.stop.prevent="modalConfirm = false">Hủy</button>
                    </div>
                </div>
                <div class="modal_confirm_mask"></div>
            </div>
        </div>
        <ModalProduct ref="ModalProduct" :editModal="editModal"></ModalProduct>
        <ModalExcel ref="ModalExcel" :data="data" v-if="openExcel"></ModalExcel>
        <iframe frameborder="0" id="print_barcode" name="print_barcode" style="display:none;"></iframe>
        <div v-for="(item,index) in dataProduct" :key="index" style="display:none;" ref="listBarcode">
            <SvgBarcode v-model="item.barcode_id" :title="item.product_name"></SvgBarcode>
        </div>
    </div>
</template>

<script>
import ModalProduct from './ModalProduct';
import TableProduct from './TableProduct';
import PaginateProduct from './PaginateProduct';
import ModalExcel from '../Excel/ModalExcel';
import SvgBarcode from './SvgBarcode';
export default {
    components: {
        ModalProduct,
        TableProduct,
        PaginateProduct,
        ModalExcel,
        SvgBarcode
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
            open: false,
            openExcel: false,
            modalConfirm: false,
            test: ["test", "sdasda", "asdasdas"],
            data: [
                {"HìnhẢnh": "https://znews-photo.zadn.vn/w210/Uploaded/mdf_reovdl/2020_05_07/corona_117.jpg", "TênSP": "Trà đào", "MãSP": "Trà đào", "Giá": 15000,"LoạiSP": "tea"},
                {"HìnhẢnh": "https://znews-photo.zadn.vn/w210/Uploaded/mdf_reovdl/2020_05_07/corona_117.jpg", "TênSP": "Trà vải", "MãSP": "Trà đào", "Giá": 15000,"LoạiSP": "tea"},
                {"HìnhẢnh": "https://znews-photo.zadn.vn/w210/Uploaded/mdf_reovdl/2020_05_07/corona_117.jpg", "TênSP": "Trà sữa", "MãSP": "Trà đào", "Giá": 15000,"LoạiSP": "tea"},
                {"HìnhẢnh": "https://znews-photo.zadn.vn/w210/Uploaded/mdf_reovdl/2020_05_07/corona_117.jpg", "TênSP": "Trà tắc", "MãSP": "Trà đào", "Giá": 15000,"LoạiSP": "tea"},
                {"HìnhẢnh": "https://znews-photo.zadn.vn/w210/Uploaded/mdf_reovdl/2020_05_07/corona_117.jpg", "TênSP": "Trà đá", "MãSP": "Trà đào", "Giá": 15000,"LoạiSP": "tea"},
                {"HìnhẢnh": "https://znews-photo.zadn.vn/w210/Uploaded/mdf_reovdl/2020_05_07/corona_117.jpg", "TênSP": "Trà đào", "MãSP": "Trà đào", "Giá": 15000,"LoạiSP": "tea"},
                {"HìnhẢnh": "https://znews-photo.zadn.vn/w210/Uploaded/mdf_reovdl/2020_05_07/corona_117.jpg", "TênSP": "Trà đào", "MãSP": "Trà đào", "Giá": 15000,"LoạiSP": "tea"},
                {"HìnhẢnh": "https://znews-photo.zadn.vn/w210/Uploaded/mdf_reovdl/2020_05_07/corona_117.jpg", "TênSP": "Trà đào", "MãSP": "Trà đào", "Giá": 15000,"LoạiSP": "tea"},
            ]
        }
    },
    methods: {
        openAddProduct: function () {
            let vm = this;
            vm.$refs.ModalProduct.open = true;
            vm.$refs.ModalProduct.loadCategory();
            vm.editModal = null;
            let new_product = {
                barcode_id: '',
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
                barcode_id: value.barcode_id ? value.barcode_id : '',
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
            vm.$refs.ModalProduct.loadCategory();
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
        },
        handlePrint: function(){
            let vm = this;
            window.frames['print_barcode'].document.write('<div style="display:grid;grid-template-columns:repeat(3,1fr);">')
            vm.$refs.listBarcode.map(item => {
                window.frames['print_barcode'].document.write(`${item.innerHTML}`)
            });
            window.frames['print_barcode'].document.write('</div>')
            window.frames['print_barcode'].print();
            window.frames['print_barcode'].document.close();
        }
    },
    computed: {

    },
    mounted: function () {
        
    },
    created: function () {
        // this.getListProduct();
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