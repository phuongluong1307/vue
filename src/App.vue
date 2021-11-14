<template>
  <div id="app">
    <header>Hello world!</header>
    <p>Hello every body!</p>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data:function(){
    return {

    }
  }
}
</script>

<style>
body{
    padding:0;
    margin:0;
    box-sizing:border-box;
    font-size:15px;
    color:#444;
    position:relative;
}
p{margin:0;}
button:focus{outline:none;}
label{margin-bottom:0;}
input,select{outline:none;}
input:focus,select:focus{border:1px solid #8c9dee;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
