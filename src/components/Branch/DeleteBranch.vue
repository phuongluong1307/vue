<template>
    <div class="delete_branch">
        <div class="delete_branch_box">
            <div class="top">
                <div class="title">Xóa chi nhánh</div>
            </div>
            <div class="center">Xác nhận xóa chi nhánh!</div>
            <div class="bottom">
                <button class="bottom_1" @click.stop.prevent="$parent.openDeleteBranch = false">Hủy</button>
                <button class="bottom_2" @click.stop.prevent="deleteBranch">Xác nhận</button>
            </div>
        </div>
        <div class="delete_branch_mask"></div>
    </div>
</template>

<script>
export default {
    name: "DeleteBranch",
    methods: {
        deleteBranch: function(){
            let vm = this;
            vm.$emit('deleteBranch')
        }
    }
}
</script>

<style>

</style>