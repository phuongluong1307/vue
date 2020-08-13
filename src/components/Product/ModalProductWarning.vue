<template>
    <div class="modal-delete" :class="open ? 'open' : ''">
        <div class="warning-delete">
            <div class="modal-header">
                <div class="title-modal">
                    <h5>Delete</h5>
                </div>
            </div>
            <div class="modal-body">
                <div class="warning" style="text-align: left; font-weight:bold;">Are you sure?</div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary cancel-delete" @click.stop.prevent="open = false">Cancel</button>
                <button class="btn btn-danger" @click.stop.prevent="handleDelete">Delete</button>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="open = false" style="position: absolute; left: 0px; bottom: 0px; top: 0px; right: 0px; z-index: 1; background: rgba(0, 0, 0, 0.4);"></div>
    </div>
</template>

<script>
export default {
    name: "ModalProductWarning",
    data: function () {
        return {
            open: false
        }
    },
    methods: {
        handleDelete: function () {
            let vm = this;
            let product = this.$parent.productItem;
            vm.axios({
                method: 'DELETE',
                url: vm.$root.API_GATE + '/api/products/' + product.id,
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            }).then(res => {
                vm.open = false;
                vm.$parent.listProduct();
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>