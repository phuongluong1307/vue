<template>
    <div>
        <img ref="webcam">
    </div>
</template>

<script>
export default {
    name: 'CompStream',
    data(){
        return {
            image: ''
        }
    },
    created: function(){
        this.canvas = this.$refs.canvas;
    },
    mounted: function(){
        let vm = this;
        const socket = vm.$root.socket;
        // socket.on('user stream webcam', function(image){
        //     let imageSRC = vm.$refs.webcam;
        //     imageSRC.src = image;
        // })
    },
    watch: {
        // 'image': {
        //     deep: true,
        //     handler: function(newval){
        //         let vm = this;
        //         let canvas = vm.$refs.canvas;
        //         let ctx = canvas.getContext('2d');
        //         canvas.setAttribute('width', 320);
        //         canvas.setAttribute('height', 320);
        //         ctx.drawImage(vm.image, 0, 0, canvas.width, canvas.height);
        //     }
        // }
    }
}
</script>

<style>

</style>