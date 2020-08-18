<template>
    <div class="modal_excel">
        <div class="modal_excel_box">
            <div class="top">
                <div class="title">Thêm dữ liệu từ excel</div>
                <div class="cancel_modal">
                    <button @click.stop.prevent="$parent.openExcel = false"><i class="fal fa-times"></i></button>
                </div>
            </div>
            <div class="center">
                <div class="center_1">
                    <div class="center_1_1" :class="{active: step == 1, finished: step > 1}">1</div>
                    <div class="center_1_1" :class="{active: step == 2, finished: step > 2}">2</div>
                    <div class="center_1_1" :class="{active: step == 3}">3</div>
                </div>
                <div class="center_2">
                    <div class="center_2_1" v-show="step == 1">
                        <div class="center_2_1_1">Cần chuẩn bị file excel theo mẫu như sau</div>
                        <div class="center_2_1_2">
                            <div class="center_2_1_2_1">Hình Ảnh</div>
                            <div class="center_2_1_2_1">Tên SP</div>
                            <div class="center_2_1_2_1">Mã SP</div>
                            <div class="center_2_1_2_1">Giá</div>
                            <div class="center_2_1_2_1">Loại SP</div>
                        </div>
                        <div class="center_2_1_3">
                            <div class="center_2_1_3_1">
                                <div class="center_2_1_3_1_1 txt">
                                    <p>Kéo và thả vào</p>
                                </div>
                                <div class="center_2_1_3_1_1 upload_file">
                                    <label for="upload_excel">Tải file từ máy</label>
                                    <input type="file" name="file" id="upload_excel" accept=".xls, .xlsx" style="display:none;" @change.stop.prevent="handleChange">
                                </div>
                                <div class="center_2_1_3_1_1 download_file">
                                    <a @click.stop.prevent="handleDownload">Tải file mẫu</a>
                                </div>
                            </div>
                            <div v-if="name_file_upload != null" class="center_2_1_3_2">
                                <span>Tên file</span>
                                <span>"{{name_file_upload}}"</span>
                            </div>
                        </div>
                    </div>
                    <div class="center_2_1" v-show="step == 2">
                        <table class="table table-bordered center_2_1_1">
                            <thead>
                                <tr style="text-align:center;">
                                    <th>Hình Ảnh</th>
                                    <th>Tên SP</th>
                                    <th>Mã SP</th>
                                    <th>Giá</th>
                                    <th>Loại SP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in json_excel" :key="index">
                                    <td>{{item.HìnhẢnh}}</td>
                                    <td>{{item.TênSP}}</td>
                                    <td>{{item.MãSP}}</td>
                                    <td>{{item.Giá}}</td>
                                    <td>{{item.LoạiSP}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="center_2_1" v-show="step == 3">
                        <table class="table table-bordered center_2_1_1">
                            <thead>
                                <tr style="text-align:center;">
                                    <th>Hình Ảnh</th>
                                    <th>Tên SP</th>
                                    <th>Mã SP</th>
                                    <th>Giá</th>
                                    <th>Loại SP</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in list_product" :key="index">
                                    <td>{{item.thumbnail}}</td>
                                    <td>{{item.product_name}}</td>
                                    <td>{{item.product_SKU}}</td>
                                    <td>{{item.price}}</td>
                                    <td>{{item.category}}</td>
                                    <td>{{item.option}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <button class="bottom_1" @click.stop.prevent="preStep">{{step == 1 ? "Thoát" : "Quay lại"}}</button>
                <button class="bottom_2" @click.stop.prevent="nextStep" :disabled="name_file_upload == null">{{step == 3 ? "Hoàn tất" : "Tiếp tục"}}</button>
            </div>
        </div>
        <div class="modal_excel_mask"></div>
    </div>
</template>

<script>
import XLSX from 'xlsx';
export default {
    name: "ModalExcel",
    props: ['data'],
    data: function(){
        return {
            step: 1,
            selectedFile: null,
            json_excel: [],
            name_file_upload: null,
            list_product: [],
            sampleFile: []
        }
    },
    methods: {
        preStep: function(){
            let vm = this;
            if(vm.step > 1){
                vm.step--;
            }else{
                vm.$parent.openExcel = false;
            }
        },
        nextStep: function(){
            let vm = this;
            let form = {
                data: vm.json_excel
            };
            if(vm.step == 2){
                vm.axios({
                    method: "POST",
                    url: vm.$root.API_GATE + '/api/products/',
                    headers: {'auth-token': localStorage.getItem('token')},
                    data: form
                }).then(res => {
                    if(res.data.error){

                    }else{
                        vm.list_product = res.data.data;
                    }
                }).catch(err => {
                    console.log(err)
                })
            };
            if(vm.step < 3){
                vm.step++;
            }else{
                vm.$parent.openExcel = false;
                vm.$parent.getListProduct();
            };
        },
        handleChange: function(event){
            let vm = this;
            var selectedFile = event.target.files[0];
            vm.name_file_upload = selectedFile.name;
            var reader = new FileReader();
            reader.onload = function(event) {
                var data = event.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                workbook.SheetNames.forEach(function(sheetName) {
                
                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    var json_object = JSON.stringify(XL_row_object);
                    vm.json_excel = JSON.parse(json_object);
                })
            };

            reader.onerror = function(event) {
                console.error("File could not be read! Code " + event.target.error.code);
            };

            reader.readAsBinaryString(selectedFile);
        },
        handleDownload: function(){
            let vm = this;
            let data = vm.sampleFile;
            if(data == '') return;
            vm.JSONToCSVConvertor(data,"", true);
        },
        JSONToCSVConvertor: function(JSONData, ReportTitle, ShowLabel) {
            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
            
            var CSV = '';    
            //Set Report title in first row or line
            
            // CSV += ReportTitle + '\r\n\n';

            //This condition will generate the Label/Header
            if (ShowLabel) {
                var row = "";
                
                //This loop will extract the label from 1st index of on array
                for (var index in arrData[0]) {
                    
                    //Now convert each value to string and comma-seprated
                    row += index + ',';
                }

                row = row.slice(0, -1);
                
                //append Label row with line break
                CSV += row + '\r\n';
            }
            
            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                var row = "";
                
                //2nd loop will extract each column and convert it in string comma-seprated
                for (var index in arrData[i]) {
                    row += '"' + arrData[i][index] + '",';
                }

                row.slice(0, row.length - 1);
                
                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV == '') {        
                alert("Invalid data");
                return;
            }

            var encodedUri = encodeURI(CSV);

            //Generate a file name
            var fileName = "File mẫu";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g,"_");
            
            //Initialize file format you want csv or xls
            var uri = 'data:text/xls;charset=UTF-8,\uFEFF' + encodedUri;
            
            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension    
            
            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");    
            link.href = uri;
            
            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".xls";
            
            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    },
    computed: {
        handleJsonExcel: function(){
            let vm = this;
            let arr = [];
            if(vm.json_excel.length > 0){
                vm.json_excel.map((item,index) => {
                    let value = Object.values(item);
                    value.map(row => {
                        console.log(row)
                        // arr.push(obj);
                    })  
                })
            };
            return arr;
        }
    },
    created: function(){
        let vm = this;
        vm.sampleFile = vm.data;
    }
}
</script>

<style>

</style>