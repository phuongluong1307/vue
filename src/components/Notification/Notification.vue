<template>
    <div class="notification" :class="open ? 'open' : ''">
        <div>{{txt}}</div>
    </div>
</template>

<script>
export default {
    name: "Notification",
    data(){
        return {
            txt: '',
            open: false,
            debounce: null,
            socket: null
        }
    },
    mounted: function(){
        let vm = this;
        const socket = vm.$root.socket;
        socket.on('new user login', function(data){
            vm.open = true;
            vm.txt = data + " vừa đăng nhập.";
            clearTimeout(vm.debounce);
            vm.debounce = setTimeout(function(){
                vm.open = false;
            },2000);
        });
        socket.on('data user disconnect', function(data){
            vm.open = true;
            vm.txt = data + " vừa đăng xuất.";
            clearTimeout(vm.debounce);
            vm.debounce = setTimeout(function(){
                vm.open = false;
            },2000);
        })
    },
}
</script>

<style>

</style>