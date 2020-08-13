<template>
    <div class="add-new-page" :class="open ? 'open' : ''">
        <div class="form">
            <div class="form-modal-header">
                <h3 class="title-add">Create Page</h3>
            </div>
            <div class="form-modal-body">
                <form>
                    <div class="form-group">
                        <label class="control-label">Page name</label>
                        <input type="text" v-model="form.name" name="name" id="pagename" placeholder="Enter page name...">
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Url</label>
                        <input type="url" v-model="form.url" name="url" id="urlpage" placeholder="Check...">
                        <span class="warning-error"></span>
                    </div>
                </form>
            </div>
            <div class="form-modal-footer">
                <div class="form-group add-button">
                    <button class="cancel-page" @click.stop.prevent="close_open()">Cancel</button>
                    <button class="add-page" @click.stop.prevent="addPages">Add page</button>
                </div>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="close_open()"></div>
    </div>
</template>

<script>
export default {
    name: "addpage",
    data: function () {
        return {
            open: false,
            form: {
                name: '',
                url: ''
            }
        }
    },
    methods: {
        close_open: function () {
            this.open = false;
            this.$emit('clicked-popup')
        },
        addPages: function () {
            let vm = this;
            let new_page = {
                name: vm.form.name,
                url: vm.form.url,
            }
            vm.axios({
                method: "POST",
                url: vm.$root.API_GATE + '/api/pages/',
                data: new_page,
                headers: { 'auth-token': localStorage.getItem('token') }
            }).then(res => {
                if (typeof res != 'undefined') {
                    vm.$parent.form.default_url = res.data.data.name;
                };
                vm.close_open();
                vm.$parent.listPages();
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>