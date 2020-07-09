<template>
    <div class="order" :class="{open: open, 'menu-bar-opened':$parent.open_menu_bar}">
        <div class="bar">
            <div class="btn_bars">
                <button @click.stop.prevent="$parent.open_menu_bar = true"><i class="fal fa-bars"></i></button>
            </div>
            <div class="name_store">Đơn đặt hàng</div>
        </div>
        <div class="content">
            <div class="content_left">
                <div class="search">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Tìm kiếm">
                </div>
                <div class="list_order">
                    <div class="item active">
                        <div class="code_bill">
                            <p>#123456</p>
                            <p>123</p>
                        </div>
                        <div class="time_bill">
                            <p>{{(new Date()).toLocaleDateString()}}</p>
                            <p>Nguyễn Văn Tèo</p>
                        </div>
                        <div class="invoice">
                            <p>Hóa đơn: #123456</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="code_bill">
                            <p>#123456</p>
                            <p>123</p>
                        </div>
                        <div class="time_bill">
                            <p>{{(new Date()).toLocaleDateString()}}</p>
                            <p>Nguyễn Văn Tèo</p>
                        </div>
                        <div class="invoice">
                            <p>Hóa đơn: #123456</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="code_bill">
                            <p>#123456</p>
                            <p>123</p>
                        </div>
                        <div class="time_bill">
                            <p>{{(new Date()).toLocaleDateString()}}</p>
                            <p>Nguyễn Văn Tèo</p>
                        </div>
                        <div class="invoice">
                            <p>Hóa đơn: #123456</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content_right">
                <div class="top">
                    <div class="top_1 top_1_1">
                        <p>#123456</p>
                        <p>Nguyễn Văn Tèo</p>
                    </div>
                    <div class="top_1 top_1_2">
                        <p>{{(new Date()).toLocaleDateString()}}</p>
                        <p>asdasda@gmail.com</p>
                    </div>
                    <div class="top_1 top_1_3">
                        <p>Hóa đơn: #123456</p>
                        <p>(028) 1234567</p>
                    </div>
                    <div class="top_1 top_1_4">
                        <p>Nhân viên: Tí</p>
                    </div>
                    <div class="top_1 top_1_5">
                        <p>Ghi chú: ....</p>
                    </div>
                    <div class="list_button">
                        <button>In hóa đơn</button>
                        <button>Trả hàng</button>
                        <button>Chỉnh sửa</button>
                    </div>
                </div>
                <div class="center">
                    <div class="list_item">
                        <div class="item" v-for="item in $parent.$refs.Content.data" :key="item.id">
                            <div class="image">
                                <img :src="item.image">
                            </div>
                            <div class="item_1 name">
                                <p>{{item.name_product}}</p>
                            </div>
                            <div class="item_1 tax">
                                <p>10%</p>
                            </div>
                            <div class="item_1 price">
                                <span>{{item.price}}</span>
                                <span>x</span>
                                <span>{{item.quantity}}</span>
                            </div>
                            <div class="item_1 total">
                                {{item.price * item.quantity}}
                            </div>
                        </div>
                    </div>
                    <div class="payments">
                        <div class="payments_left">
                            <div class="payments_left_1">
                                <h6>Payments</h6>
                            </div>
                        </div>
                        <div class="payments_right">
                            <div class="payments_right_1 sub_total">
                                <p>Tổng phụ</p>
                                <p>...</p>
                            </div>
                            <div class="payments_right_1 tax">
                                <p>Thuế</p>
                                <p>...</p>
                            </div>
                            <div class="payments_right_1 discount">
                                <p>Khuyến mãi</p>
                                <p>...</p>
                            </div>
                            <div class="payments_right_1 grand_total">
                                <p>Tổng cộng</p>
                                <p>...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CompOrder',
    data: function(){
        return {
            open: false
        }
    }
}
</script>

<style>

</style>