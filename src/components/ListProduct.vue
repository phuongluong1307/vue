<template>
    <div class="list_product" :class="open ? 'open' : ''">
        <div class="container box product_box">
            <div class="top">
                <div class="back" @click.stop.prevent="open = false"><i class="fal fa-arrow-left"></i></div>
                <div class="title">Danh sách sản phẩm</div>
            </div>
            <div class="center">
                <div class="handing">
                    <div class="add_product">
                        <button @click.stop.prevent="open_modal = true">Thêm sản phẩm</button>
                    </div>
                    <div class="filter_product">
                        <input type="text" placeholder="Tìm kiếm sản phẩm">
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
                            <td class="price">{{item.price}}</td>
                            <td class="delete"><i class="fal fa-minus-circle"></i></td>
                            <td class="edit"><i class="fal fa-edit"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="bottom">
                <div class="intro">Copyright: phuongluong@2020</div>
            </div>
        </div>
        <ModalProduct ref="ModalProduct"></ModalProduct>
    </div>
</template>

<script>
import ModalProduct from './ModalProduct';
export default {
    components: {
        ModalProduct
    },
    name: 'ListProduct',
    data(){
        return {
            open: false,
            open_modal: false,
            data: []
        }
    },
    methods: {
        loadRecords: function(){
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + "/api/products"
            }).then(res => {
                if(res.data.error === true){
                    console.log(res.data.message)
                }else{
                    vm.data = res.data.data;
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created: function(){
        this.loadRecords();
    }
}
</script>

<style>

</style>