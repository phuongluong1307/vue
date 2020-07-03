<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
