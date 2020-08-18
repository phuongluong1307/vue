<template>
    <div class="login" :class="status_login ? 'open' : ''">
        <div class="box">
            <div class="center">
                <div class="login__wrapper">
                    <h2 class="title">Đăng nhập</h2>
                    <div class="form-group validate__user">
                        <label for="username">Tên đăng nhập</label>
                        <input type="text" id="username" placeholder="Tên đăng nhập..." class="form-control" v-model="form_login.username">
                    </div>
                    <div class="form-group validate__pwd">
                        <label for="password">Mật khẩu</label>
                        <input type="password" id="password" placeholder="Mật khẩu..." class="form-control" v-model="form_login.password">
                    </div>
                    <div class="form-group validate__remember">
                        <div class="remember__me">
                            <input type="checkbox" id="checked" name="checkbox">
                            <label for="checked">Ghi nhớ</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="form-group">
                    <button class="login__button" @click.stop.prevent="handleSubmit">Đăng nhập</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalLogin',
    data: function(){
        return {
            form_login: {
                username: '',
                password: ''
            },
            status_login: false,
            token: '',
            listBranch: null
        }
    },
    methods:{
        handleSubmit: function(){
            let vm = this;
            vm.axios({
                method: 'POST',
                url: vm.$root.API_GATE + '/api/auth',
                data: vm.form_login
            }).then(res => {
                let result = res.data;
                if(res.data.error){

                }else{
                    let user = {
                        id: result.id,
                        name: result.name
                    }
                    localStorage.setItem('auth_token', true)
                    vm.token = result.token;
                    localStorage.setItem('token', vm.token);
                    localStorage.setItem('name', JSON.stringify(user));
                    vm.$parent.auth_token = true;
                    vm.listBranch = res.data.listBranch;
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted: function(){
        
    },
    watch: {
        
    }
}
</script>

<style>

</style>