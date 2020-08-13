<template>
    <div class="album-single" :class="open ? 'open' : '' ">
        <div class="form">
            <div class="form-modal-header">
                <h3 class="title-add">Album</h3>
            </div>
            <div class="form-modal-body">
                <div class="form-group">
                    <label for="new-image">Upload Image:</label>
                    <input type="file" name="image" id="new-image" />
                </div>
                <div class="list-images">
                    <button class="thumb" v-for="(item, index) in album" @click.stop.prevent="handleSelect(index)" :class="selected == index ? 'active' : ''" :key="index">
                        <img :src="item.hinhAnh" :title="item.title" :alt="item.title" class="d-block w-100" />
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
    </div>
</template>

<script>
export default {
    name: "AlbumSingle",
    data: function () {
        return {
            open: false,
            album: [
                { hinhAnh: 'https://product.hstatic.net/1000126467/product/bia-heineken-lon-330ml_e76890bfa11b4b39b9f7d7c6aafc5a2e_grande.jpg', title: 'Ken', status: false },
                { hinhAnh: 'https://product.hstatic.net/1000174127/product/bia-tiger-lon-01_83e4faa81a4a4789828001e8edf24ebe_master.jpg', title: 'Tiger', status: false },
                { hinhAnh: 'https://img.sosanhgia.com/images/500x0/29bc5c95f3aa4c44b8948d3bbb650833/bia-tiger-bac-crystal-lon-300ml.jpeg', title: 'Bia Tiger Crystal', status: false },
                { hinhAnh: 'https://www.phanphoiruoungoai.net/wp-content/uploads/2018/05/bia-lon-beck-ice-330-ml.jpg', title: 'Beck', status: false },
                { hinhAnh: 'https://cdn.tgdd.vn/Products/Images/2282/176455/bhx/bia-budweiser-500ml-202003251430191987.jpg', title: 'Budweiser', status: false },
                { hinhAnh: 'https://img.sosanhgia.com/images/500x0/c171e1fc312544e686f3a832c764d027/bia-sai-gon-sabeco-lon-330ml.jpeg', title: 'Special', status: false },
                { hinhAnh: 'https://cdn.tgdd.vn/Products/Images/2282/84818/bhx/bia-333-lon-330-ml-2-org.jpg', title: '333', status: false },
                { hinhAnh: 'https://bianhapkhau.com.vn/uploads/thung-24-chai-bia-corona-extra-355ml-x-24-4817-8462761-1-product1.jpg', title: 'Corona', status: false }
            ],
            selected: null,
        }
    },
    methods: {
        handleSelect: function (index) {
            this.selected = index;
        },
        handleApply: function () {
            this.open = false;
            this.$emit('handleApply', this.getProduct)
        },
        closePopup: function () {
            this.open = false;
            this.$emit('clicked');
        }
    },
    computed: {
        getProduct: function () {
            let index = this.selected;
            return this.album[index];
        }
    }
}
</script>

<style>

</style>