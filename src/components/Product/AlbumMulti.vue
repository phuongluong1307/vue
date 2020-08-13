<template>
    <div class="album-multi" :class="open ? 'open' : '' ">
        <div class="form" :class="close_popup ? 'close-popup' : ''">
            <div class="form-modal-header">
                <h3 class="title-add">Album</h3>
            </div>
            <div class="form-modal-body">
                <div class="form-group">
                    <label>Upload Image:</label>
                    <input type="file" name="image" id="new-image" @change.stop.prevent="handleInput"/>
                </div>
                <div class="list-images">
                    <button class="thumb" v-for="(item, index) in album" :key="index" v-on:click="handleMultiImage(item)" :class="listProduct.indexOf(item.id)>-1 ? 'active' : ''">
                        <img :src="item.image" :title="item.title" :alt="item.title" class="d-block w-100" />
                    </button>
                </div>
            </div>
            <div class="form-modal-footer">
                <div class="form-group add-button">
                    <button class="cancel-apply" @click.stop.prevent="closePopup">Cancel</button>
                    <button class="apply-image" @click.stop.prevent="handleApply">Apply</button>
                </div>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="closePopup"></div>
        <PreviewImage ref="previewImage" @clicked="close_popup = false" @upload="handleUpload" :data="image"></PreviewImage>
    </div>
</template>

<script>
import PreviewImage from './PreviewImage';
export default {
    components: {
        PreviewImage
    },
    name: "AlbumMulti",
    data: function () {
        return {
            open: false,
            album: [],
            listProduct: [],
            image: '',
            close_popup: false,
            id_album: ''
        }
    },
    methods: {
        handleMultiImage(item) {
            let vm = this;
            let index = vm.listProduct.indexOf(item.id);
            if (index > -1) {
                // vm.listProduct = vm.listProduct.splice(index,1);
                /** viết này là listProduct trả ra id bị xóa */
                vm.listProduct.splice(index, 1);
                /** viết này là listProduct trả ra mảng mới đã xóa id bị xóa ra */
            } else {
                vm.listProduct.push(item.id);
            }

            /** cach 1 */
            // let index = vm.listProduct.indexOf(item.id);
            // if(index>-1){
            //     vm.listProduct.splice(index,1);
            // }else{
            //     vm.listProduct.push(item.id);
            // }

            /** cach 2 */
            // if(vm.listProduct.indexOf(item.id)>-1){
            //     vm.listProduct = vm.listProduct.filter(function(row){
            //         return row!=item.id;
            //     });
            // }else{
            //     vm.listProduct.push(item.id);
            // }
        },
        handleApply: function () {
            let vm = this;
            let return_data = vm.album.filter(function (item) {
                return vm.listProduct.indexOf(item.id) > -1;
            });
            vm.$emit('pushAlbumMulti', return_data);
        },
        handleInput(e) {
            var files = e.target.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
            this.$refs.previewImage.open = true;
            this.close_popup = true;
        },
        createImage(file) {
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        closePopup: function () {
            this.open = false;
            this.$emit('clicked');
        },
        handleUpload: function () {
            var vm = this;
            let new_image = {
                hinhAnh: vm.image,
                title: vm.image,
                status: false
            };
            vm.album.push(new_image);
            this.$refs.previewImage.open = false;
            this.close_popup = false;
        },
        getListAlbum: function () {
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/product-album/',
                headers: { 'auth-token': localStorage.getItem('token') }
            }).then(res => {
                let result = res.data;
                result.data.map(item => {
                    if (item.album_name === 'Product') {
                        vm.album = item.album;
                        vm.id_album = item._id
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        }
    },
    computed: {

    },
    created: function () {
        this.getListAlbum();
    }
}
</script>

<style>

</style>