<template>
  <section class="content" :class="$parent.open_menu_bar ? 'menu-bar-opened' : ''">
    <ContentMenu ref="ContentMenu" @handleData="handleData"></ContentMenu>
    <ContentBill ref="ContentBill" ></ContentBill>
  </section>
</template>

<script>
import ContentMenu from "./ContentChild/ContentMenu";
import ContentBill from "./ContentChild/ContentBill";
export default {
  components: {
    ContentMenu,
    ContentBill
  },
  name: "Content",
  data: function(){
    return {
      data: []
    }
  },
  methods: {
    handleData: function(e){
      let vm = this;
      let index = vm.data.findIndex(item => item.id === e.id);
      if(index !== -1){
        vm.data[index].quantity += 1;
      }else{
        vm.data.push(e)
      };
    }
  },
  watch: {
    
  }
};
</script>

<style>

</style>