<template>
    <div class="adjust" :class="open ? 'open' : '' ">
        <div class="box">
            <div class="detail_product">
                <div class="image_product">
                    <img :src="$parent.obj.image" style="width:100px; height:150px;" alt="">
                </div>
                <div class="info_product">
                    <div class="info_item">
                        <h5>{{$parent.obj.name_product}}</h5>
                    </div>
                    <div class="info_item">
                        <p>SKU code:</p>
                    </div>
                    <div class="info_item">
                        <p>Barcode:</p>
                    </div>
                    <div class="info_item">
                        <p>Giá bán: <span>{{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format($parent.obj.price)}}</span></p>
                    </div>
                </div>
            </div>
            <div class="promotion">
                <ul class="promotion_1">
                    <li class="promotion_1_1" :class="{active: promotion === 'quantity'}" @click.stop.prevent="handleActive('quantity')">
                        <p>SỐ LƯỢNG</p>
                        <p>{{$parent.obj.quantity}}</p>
                    </li>
                    <li class="promotion_1_1" :class="{active: promotion === 'tax'}" @click.stop.prevent="handleActive('tax')">
                        <p>THUẾ</p>
                        <p>10%</p>
                    </li>
                    <li class="promotion_1_1" :class="{active: promotion === 'discount'}" @click.stop.prevent="handleActive('discount')">
                        <p>GIẢM GIÁ</p>
                        <p>0</p>
                    </li>
                </ul>
            </div>
            <div class="table_number">
                <div class="list_table table_1" :class="{active: promotion === 'quantity'}">
                    <div class="table_1_1">
                        <div class="table_1_1_1">
                            <span>{{$parent.obj.quantity}}</span>
                        </div>
                        <div class="table_1_1_2">
                            <div class="grid_item" v-for="item in 9" :key="item">
                                <button>{{item}}</button>
                            </div>
                            <div class="grid_item"><button>.</button></div>
                            <div class="grid_item"><button>0</button></div>
                            <div class="grid_item"><button><i class="fas fa-times"></i></button></div>
                        </div>
                    </div>
                </div>
                <div class="list_table table_2" :class="{active: promotion === 'tax'}">

                </div>
                <div class="list_table table_3" :class="{active: promotion === 'discount'}">

                </div>
            </div>
            <div class="form_btn">
                <button>Cập nhật</button>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="open = false"></div>
    </div>
</template>

<script>
export default {
    name: 'AdjustProduct',
    data: function(){
        return {
            open: false,
            promotion: 'quantity',
            name_promotion: 'quantity'
        }
    },
    methods: {
        handleActive: function(item){
            let vm = this;
            vm.name_promotion = item
            vm.promotion = vm.name_promotion;
        }
    },
    created: function(){
    }
}
</script>

<style>

</style>