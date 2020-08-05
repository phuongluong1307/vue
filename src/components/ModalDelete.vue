<template>
    <div class="modal_delete" :class="open ? 'open' : ''" v-if="open">
        <div class="box">
            <div class="top">
                <div class="title">Xóa</div>
            </div>
            <div class="center">
                <div class="warning">Bạn chắc chắn muốn xóa!</div>
            </div>
            <div class="bottom">
                <button class="button_delete" @click.stop.prevent="handleDelete">Xóa</button>
                <button class="button_cancel" @click.stop.prevent="open = false">Hủy</button>
            </div>
        </div>
        <div class="mask_modal-delete"></div>
    </div>
</template>

<script>
export default {
    name: 'ModalDelete',
    data: function(){
        return {
            open: false
        }
    },
    methods: {
        handleDelete: function(){
            let vm = this;
            vm.axios({
                method: "DELETE",
                url: vm.$root.API_GATE + '/api/products/' + vm.$parent.id_product,
                headers: {'auth-token': localStorage.getItem('token')}
            }).then(res => {
                if(res.data.error){

                }else{
                    vm.$parent.loadRecords();
                    vm.open = false;
                    vm.$parent.$parent.$refs.Content.$refs.ContentMenu.loadProduct();
                }
            }).catch(err => {
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>