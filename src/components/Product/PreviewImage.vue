<template>
    <div class="preview-upload" :class="open ? 'open' : ''">
        <div class="form">
            <div class="form-modal-body">
                <div class="title-image">
                    <label>Title:</label>
                    <input type="text" v-model="title" />
                </div>
                <div class="preview">
                    <img v-if="data" :src="data" :alt="data" style="width:200px;height:200px;" />
                </div>
            </div>
            <div class="form-modal-footer">
                <div class="form-group add-button">
                    <button class="cancel-preview" @click.stop.prevent="changePopup">Cancel</button>
                    <button class="upload-preview" @click.stop.prevent="uploadImage">Upload</button>
                </div>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="changePopup()"></div>
    </div>
</template>

<script>
export default {
    name: "PreviewImage",
    props: ['data'],
    data: function () {
        return {
            image: null,
            open: false,
            title: ''
        }
    },
    methods: {
        changePopup: function () {
            this.open = false;
            this.$emit('clicked');
        },
        uploadImage: function () {
            let vm = this;
            vm.$emit('upload');
            let new_image = {
                image: vm.$parent.image,
                title: vm.title
            };
            vm.axios({
                method: "POST",
                url: vm.$root.API_GATE + '/api/product-album/' + vm.$parent.id_album,
                headers: { 'auth-token': localStorage.getItem('token') },
                data: new_image
            }).then(res => {
                vm.changePopup();
                vm.$parent.getListAlbum();
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>