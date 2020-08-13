<template>
    <table class="table table-striped table-product">
        <thead>
            <tr>
                <th>#</th>
                <th style="width:100px;">Thumbnail</th>
                <th>Product SKU</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Create_at</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in $parent.dataProduct" :key="index" class="tr-product">
                <td>{{index + 1}}</td>
                <td>
                    <div class="tr_image" style="height:40px;width:100%;position:relative;overflow:hidden;">
                        <img :src="$root.API_GATE + item.thumbnail" style="width:100%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);" />
                    </div>
                </td>
                <td>{{item.product_SKU}}</td>
                <td>{{item.product_name}}</td>
                <td>{{item.category}}</td>
                <td>{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price)}}</td>
                <td>{{item.created_at | mm-dd-yyyy}}</td>
                <td>
                    <ul class="tb_ul">
                        <li class="tb_li">
                            <a href="#" data-toggle="tooltip" title="Delete product!" data-placement="top" class="list__action" @click.stop.prevent="openWarning(item)"><i class="far fa-trash-alt"></i></a>
                        </li>
                        <li class="tb_li">
                            <a href="#" data-toggle="tooltip" title="Edit product!" data-placement="top" class="list__action" @click.stop.prevent="method(item)"><i class="fas fa-edit"></i></a>
                        </li>
                    </ul>
                </td>
            </tr>
        </tbody>
        <ModalProductWarning ref="ModalProductWarning"></ModalProductWarning>
    </table>
</template>

<script>
import ModalProductWarning from './ModalProductWarning';
export default {
    components: {
        ModalProductWarning
    },
    name: "TableProduct",
    props: {
        method: { type: Function },
    },
    data: function () {
        return {
            dataProduct: [],
            productItem: null
        }
    },
    methods: {
        openWarning: function (value) {
            this.$refs.ModalProductWarning.open = true;
            this.productItem = value;
        },
        listProduct: function () {
            return this.$parent.getListProduct();
        }
    },
    filters: {
        'mm-dd-yyyy': function(value){
            let data = new Date(value);
            return (data.getMonth() + 1) + '/' + data.getDate() + '/' + data.getFullYear();
        }
    }
}
</script>

<style>

</style>