<template>
    <div class="add-category" :class="open ? 'open' : ''">
        <div class="form">
            <div class="form-modal-header">
                <h3 class="title-add">Create Category</h3>
            </div>
            <div class="form-modal-body">
                <form>
                    <div class="form-group">
                        <label for="categoryName" class="control-label">Category name:</label>
                        <input type="text" name="categoryName" id="categoryName" placeholder="Enter category name..." v-model="form.category_name">
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <label for="list-category" class="control-label">Category:</label>
                        <select class="select-category" id="list-category" v-model="form.category">
                            <option value='' disabled>Please select one</option>
                            <option value="Smoothie">Smoothie</option>
                            <option value="Coffee">Coffee</option>
                            <option value="SoftDrink">SoftDrink</option>
                            <option value="Tea">Tea</option>
                            <option value="Freeze">Freeze</option>
                        </select>
                        <span class="warning-error"></span>
                    </div>
                </form>
            </div>
            <div class="form-modal-footer">
                <div class="form-group add-button">
                    <button class="cancel-category" @click.stop.prevent="closePopup">Cancel</button>
                    <button class="button-category" @click.stop.prevent="addCategory">Add category</button>
                </div>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="closePopup"></div>
    </div>
</template>

<script>
export default {
    name: "CreateCategory",
    data: function () {
        return {
            open: false,
            form: {
                category_name: '',
                category: ''
            }
        }
    },
    methods: {
        closePopup: function () {
            this.open = false;
            this.$emit('clicked');
        },
        addCategory: function () {
            let vm = this;
            let new_category = {
                category_name: vm.form.category_name,
                category: vm.form.category
            }
            vm.axios({
                method: "POST",
                url: vm.$root.API_GATE + '/api/product-categories/',
                data: new_category,
                headers: { 'auth-token': localStorage.getItem('token') }
            }).then(res => {
                vm.closePopup();
                vm.$parent.form_product.category = res.data.data.category_name;
                vm.$parent.getListCategory();
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>