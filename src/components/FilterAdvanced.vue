<template>
    <div class="filter_advanced" :class="open ? 'open' : ''">
        <div class="container box">
            <div class="filter_advanced_1">
                <ul class="filter_advanced_1_1">
                    <li class="filter_advanced_1_1_1">
                        <Datepicker class="date_picker" :language="vi" placeholder="Tìm theo ngày" input-class="input_picker"></Datepicker>
                    </li>
                    <li class="filter_advanced_1_1_1">
                        <SelectMulti ref="SelectMulti" title="Tìm theo loại khách hàng" :data="data"></SelectMulti>
                    </li>
                    <li class="filter_advanced_1_1_1">
                        <SelectMulti ref="SelectMulti" title="Tìm theo loại sản phẩm" :data="category"></SelectMulti>
                    </li>
                </ul>
            </div>
            <div class="filter_advanced_2">
                <div class="nope" v-if="!filter">
                    <div class="filter">Vui lòng chọn để tìm kiếm</div>
                    <div class="icons_filter"><i class="fal fa-th-list"></i></div>
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
import {en, vi} from 'vuejs-datepicker/dist/locale';
import SelectMulti from './SelectMulti';
export default {
    components: {
        Datepicker,
        SelectMulti
    },
    name: 'FilterAdvanced',
    data: function(){
        return {
            open: false,
            en: en,
            vi: vi,
            filter: false,
            data: ["Khách lẻ", "Khách A"],
            category: ["Cà phê", "Sinh tố"]
        }
    }
}
</script>

<style>

</style>