<template>
    <div class="modal-product" :class="open ? 'open' : ''">
        <div class="form-modal-product" :class="close_popup ? 'close-popup' : ''">
            <div class="form-modal-header">
                <h3 class="title-modal">{{editModal ? 'Edit Product' : 'Add Product'}}</h3>
            </div>
            <div class="form-modal-body">   
                <form class="form-product">
                    <div class="form-group">
                        <label class="control-label">Barcode_id</label>
                        <input type="text" v-model="form_product.barcode_id" placeholder="Enter barcode..." id="barcode" />
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Product SKU</label>
                        <input type="text" v-model="form_product.product_SKU" placeholder="Enter product SKU..." id="product-SKU" />
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Product Name</label>
                        <input type="text" v-model="form_product.product_name" placeholder="Enter product name..." id="product-name" />
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <label for="category" class="control-label">Category</label>
                        <div class="form-select">
                            <select v-model="form_product.category" id="category">
                                <option value='' disabled>Please select one!</option>
                                <option v-for="(item,index) in listCategory" :key="index" :value="item.category_name">{{item.category_name}}</option>
                            </select>
                            <button @click.stop.prevent="openCategory">Create New</button>
                        </div>
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <label for="price" class="control-label">Price</label>
                        <div class="form-price">
                            <number ref="number"></number>
                        </div>
                        <span class="warning-error"></span>
                    </div>
                </form>
                <div class="list-album-multi">
                    <div class="form-group form-image single-image">
                        <div class="select-single-image">
                            <div class="select-image">
                                <label>Primary Image:</label>
                                <label for="primary-image" class="control-label">Upload Image</label>
                                <button @click.stop.prevent="openAlbumSingle">Album</button>
                                <input type="file" v-on:change="onFileChange" name="primary" id="primary-image" style="display:none" />
                            </div>
                        </div>
                        <div class="form-file">
                            <div class="preview-primary-image" style="display:flex;width:30%;height:100px;border:1px solid #e1e1e1;margin:auto;">
                                <div v-if="validSingle">
                                    <button class="close-preview-image" @click.stop.prevent="closePreviewImage"><i class="fas fa-times"></i></button>
                                    <img v-if="validBase64" :src="image" style="height:100%;width:100%;"/>
                                    <img v-else :src="$root.API_GATE + image" style="height:100%;width:100%;"/>
                                </div>
                            </div>
                        </div>
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group form-image">
                        <div class="form-file">
                            <label>More Image:</label>
                            <label for="more-image" class="control-label">Upload Image</label>
                            <input type="file" name="more-primary" id="more-image" @change.stop.prevent="changeListFiles" style="display:none;" />
                            <button @click.stop.prevent="openAlbumMulti">Album</button>
                        </div>
                        <span class="warning-error"></span>
                    </div>
                    <div v-if="listProduct == ''" class="text-center text-danger p-3">Please select an image file!</div>
                    <div class="image-primary" id="list-image">
                        <div v-for="(item, index) in getItemProduct" :key="index" class="list-item-image">
                            <img :src="item.image" :alt="item.title" style="max-width:100%;max-height:50px;" />
                            <button class="close-image" @click.stop.prevent="deleteImage(index)"><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="txt_error text-danger" v-if="warningError">{{txtError}}</div>
            <div class="form-modal-footer">
                <div class="form-group form-button">
                    <div class="right_button">
                        <button class="cancel-product" @click.stop.prevent="closeModal">Cancel</button>
                        <button class="submit-product" @click.stop.prevent="addProduct">{{editModal ? 'Update' : 'Add'}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="closeModal" style="position: absolute;left:0px;bottom:0px;top:0px;right:0px;z-index: 1;background: rgba(0,0,0,0.4);"></div>
        <CreateCategory ref="category" @clicked="close_popup = false"></CreateCategory>
        <AlbumSingle ref="albumsingle" @clicked="close_popup = false" v-on:handleApply="handleApply"></AlbumSingle>
        <AlbumMulti ref="albummulti" @clicked="close_popup = false" v-on:pushAlbumMulti="handleMulti"></AlbumMulti>
    </div> 
</template>

<script>
import CreateCategory from './CreateCategory';
import AlbumSingle from './AlbumSingle';
import AlbumMulti from './AlbumMulti';
import number from './Number';
export default {
    components: {
        CreateCategory,
        AlbumSingle,
        AlbumMulti,
        number,
    },
    name: "ModalProduct",
    props: ['editModal'],
    data: function () {
        return {
            open: false,
            form_product: {
                barcode_id: '',
                thumbnail: '',
                product_SKU: '',
                product_name: '',
                category: '',
                create_at: ''
            },
            image: '',
            price: '',
            validSingle: false,
            close_popup: false,
            listProduct: [],
            duplicate: false,
            warningError: false,
            txtError: '',
            listCategory: this.$root.list_category,
            validBase64: false
        }
    },
    methods: {
        closeModal: function () {
            let vm = this;
            vm.open = false;
            vm.warningError = false;
            var body = document.querySelector('body');
            body.removeAttribute('style');
        },
        openAlbumSingle: function () {
            this.$refs.albumsingle.open = true;
            this.close_popup = true;
        },
        openAlbumMulti: function () {
            this.$refs.albummulti.open = true;
            this.close_popup = true;
        },
        openCategory: function () {
            this.$refs.category.open = true;
            this.close_popup = true;
        },
        onFileChange(e) {
            var files = e.target.files;
            this.false = true;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        changeListFiles: function () {
            var vm = this;
            var files = document.querySelector('#more-image').files;

            function readAndPreview(file) {
                if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                    let reader = new FileReader();

                    reader.addEventListener("load", function () {
                        let new_product = {
                            id: Math.random(),
                            hinhAnh: this.result,
                            title: this.result,
                            status: false
                        }
                        vm.listProduct.push(new_product);
                    }, false);
                    reader.readAsDataURL(file);
                }
            };
            if (files) {
                [].forEach.call(files, readAndPreview);
            }
        },
        handleApply: function (value) {
            this.image = value.hinhAnh;
            this.validSingle = true;
            this.close_popup = false;
        },
        handleMulti: function (value) {
            var vm = this;
            value.map((row) => {
                if (!vm.listProduct.includes(row)) {
                    vm.duplicate = true;
                    return vm.listProduct.push(row);
                } else {
                    vm.duplicate = false;
                }
            })
            if (!vm.duplicate) {
                alert('Hình ảnh đã tồn tại!');
                vm.close_popup = true;
                vm.$refs.albummulti.open = true;
            } else {
                vm.close_popup = false;
                vm.$refs.albummulti.open = false;
            }
        },
        deleteImage: function (index) {
            var vm = this;
            vm.listProduct.splice(index, 1);
        },
        closePreviewImage: function () {
            var vm = this;
            vm.image = '';
            vm.validSingle = false;
        },
        addProduct: function () {
            let vm = this;
            vm.price = vm.$refs.number.number;
            let new_product = {
                barcode_id: vm.form_product.barcode_id,
                product_name: vm.form_product.product_name,
                product_SKU: vm.form_product.product_SKU,
                thumbnail: vm.image,
                price: vm.price,
                category: vm.form_product.category
            }
            if (vm.$parent.editModal == null) {
                vm.axios({
                    method: "POST",
                    url: vm.$root.API_GATE + '/api/products/',
                    headers: { 'auth-token': localStorage.getItem('token') },
                    data: new_product
                }).then(res => {
                    let result = res.data;
                    if (result.error === true) {
                        vm.warningError = true;
                        vm.txtError = result.message;
                    } else {
                        vm.closeModal();
                        vm.$parent.getListProduct();
                        vm.$parent.$parent.$refs.Content.$refs.ContentMenu.loadProduct();
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                vm.axios({
                    method: "PUT",
                    url: vm.$root.API_GATE + '/api/products/' + vm.$parent.productItem.id,
                    headers: { 'auth-token': localStorage.getItem('token') },
                    data: new_product
                }).then(res => {
                    let result = res.data;
                    if (result.error === true) {
                        vm.warningError = true;
                        vm.txtError = result.message;
                    } else {
                        vm.closeModal();
                        vm.$parent.getListProduct();
                        vm.$parent.$parent.$refs.Content.$refs.ContentMenu.loadProduct();
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        loadCategory: function(){
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/product-categories/',
                headers: {'auth-token': localStorage.getItem('token')}
            }).then(res => {
                let result = res.data;
                if(result.error){

                }else{
                vm.listCategory = result.data;
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    computed: {
        getItemProduct: function () {
            var vm = this;
            let array = [];
            vm.listProduct.forEach(function (item) {
                if (!array.includes(item)) {
                    array.push(item);
                    vm.duplicate = false;
                } else {
                    vm.duplicate = true;
                }
            });
            return array;
        }
    },
    created: function () {
        this.loadCategory();
    },
    watch: {
        'form_product.barcode_id': {
            deep: true,
            handler: function(newval){
                let vm = this;
                if(vm.form_product.barcode_id != ''){
                    vm.form_product.barcode_id = newval.split(' ').join('');
                }
            }
        },
        'image': {
            deep: true,
            handler: function(newval){
                let vm = this;
                let find = newval.indexOf(';base64,');
                if(newval !=''){
                    vm.validSingle = true;
                }
                if(find > -1){
                    vm.validBase64 = true;
                }else{
                    vm.validBase64 = false;
                }
            }
        }
    }
}
</script>

<style>

</style>