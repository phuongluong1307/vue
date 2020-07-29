<template>
    <div class="modal_product" :class="$parent.open_modal ? 'open' : ''">
        <div class="box">
            <div class="top">
                <div class="back" @click.stop.prevent="$parent.open_modal = false"><i class="fal fa-arrow-left"></i></div>
                <div class="title">{{$parent.editModal ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}}</div>
            </div>
            <div class="center">
                <form class="form-product">
                    <div class="form-group">
                        <input type="text" v-model="form_product.product_SKU" placeholder="Nhập tên SKU">
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="form_product.product_name" placeholder="Nhập tên sản phẩm">
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <div class="form-price">
                            <input type="number" v-model="form_product.price" placeholder="Nhập giá">
                        </div>
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <div class="form-image">
                            <label for="select-image">{{form_product.thumbnail == "" ? "Chọn hình ảnh" : form_product.thumbnail}}</label>
                            <input type="file" id="select-image" style="display:none;" v-on:change="onFileChange">
                        </div>
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <div class="form-select">
                            <SelectMulti ref="SelectMulti" title="Chọn loại sản phẩm" :data="list_category"></SelectMulti>
                        </div>
                        <span class="warning-error"></span>
                    </div>
                    <div class="warning-error" v-if="notification !== ''">
                        <div class="text-danger">{{notification}}</div>
                    </div>
                </form>
            </div>
            <div class="bottom">
                <button @click.stop.prevent="handleAddProduct">Thêm mới</button>
            </div>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
import SelectMulti from './SelectMulti';
export default {
    components: {
        SelectMulti
    },
    name: 'ModalProduct',
    data(){
        return {
            form_product: {
                product_name : '',
                product_SKU: '',
                thumbnail: '',
                price: '',
                category: ''
            },
            notification: ""
        }
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files;
            this.validSingle = true;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.form_product.thumbnail = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        handleAddProduct: function(){
            let vm = this;
            vm.form_product.category = vm.$refs.SelectMulti.name;
            let new_product = {
                product_name: vm.form_product.product_name,
                product_SKU: vm.form_product.product_SKU,
                price: vm.form_product.price,
                thumbnail: vm.form_product.thumbnail,
                category: vm.form_product.category
            }
            if(vm.$parent.editModal == null){
                vm.axios({
                method: "POST",
                url: vm.$root.API_GATE + "/api/products",
                data: new_product,
                headers: {'auth-token': localStorage.getItem('token')}
                }).then(res => {
                    if(res.data.error === true){
                        vm.notification = res.data.message;
                    }else{
                        vm.$parent.open_modal = false;
                        vm.$parent.loadRecords();
                        vm.form_product.product_name = "";
                        vm.form_product.product_SKU = "";
                        vm.form_product.thumbnail = "";
                        vm.form_product.price = "";
                        vm.$refs.SelectMulti.name = "";
                    }
                }).catch(err => {
                    console.log(err)
                })
            }else{
                vm.axios({
                    method: "PUT",
                    url: vm.$root.API_GATE + "/api/products/" + vm.$parent.productId,
                    data: new_product,
                    headers: {'auth-token': localStorage.getItem('token')}
                }).then(res => {
                    if(res.data.error === true){
                        vm.notification = res.data.message;
                    }else{
                        vm.$parent.open_modal = false;
                        vm.$parent.loadRecords();
                        vm.form_product.product_name = "";
                        vm.form_product.product_SKU = "";
                        vm.form_product.thumbnail = "";
                        vm.form_product.price = "";
                        vm.$refs.SelectMulti.name = "";
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    },
    created: function(){
        
    },
    computed:{
        list_category: function(){
            let vm = this;
            let arr_category = [];
            vm.$root.list_category.map((item) => {
                if(!arr_category.includes(item.category)){
                    arr_category.push(item.category)
                }
            });
            return arr_category;
        }
    }
}
</script>

<style>

</style>