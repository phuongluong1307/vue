<template>
    <div class="filter_advanced" :class="open ? 'open' : ''">
        <div class="container box">
            <div class="filter_advanced_1">
                <ul class="filter_advanced_1_1">
                    <li class="filter_advanced_1_1_1">
                        <label>Tìm theo ngày:</label>
                        <Datepicker class="date_picker" :language="vi" placeholder="Tìm theo ngày" input-class="input_picker"></Datepicker>
                    </li>
                    <li class="filter_advanced_1_1_1">
                        <label>Tìm theo người bán:</label>
                        <select name="" id="">
                            <option value="1">Khách lẻ</option>
                            <option value="2">Thành viên</option>
                        </select>
                    </li>
                    <li class="filter_advanced_1_1_1">
                        <label>Tìm theo sản phẩm:</label>
                        <select name="" id="">
                            <option value="">Vui lòng chọn sản phẩm</option>
                            <option value="1">Cà phê</option>
                            <option value="2">Sinh tố</option>
                        </select>
                    </li>
                    <li class="filter_advanced_1_1_1">
                        <button @click.stop.prevent="filter = true">Tìm kiếm</button>
                    </li>
                </ul>
            </div>
            <div class="filter_advanced_2">
                <div class="nope" v-if="!filter">
                    Vui lòng chọn để tìm kiếm
                </div>
                <div class="filter_advanced_2_1" v-else>
                    <div class="list_order">
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
            </div>
            <div class="cancel" @click.stop.prevent="open = false">
                <button><i class="fal fa-times"></i></button>
            </div>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {en, vi} from 'vuejs-datepicker/dist/locale'
export default {
    components: {
        Datepicker
    },
    name: 'FilterAdvanced',
    data: function(){
        return {
            open: false,
            en: en,
            vi: vi,
            filter: false
        }
    }
}
</script>

<style>

</style>