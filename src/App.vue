<template>
    <div id="app">
      <MommaComponent/>
    </div>
    
</template>

<script>
// import * as Three from 'three'
import MommaComponent from './components/MommaComponent.vue'

export default {
  name: 'app',
  components: {
    MommaComponent
  }
 }
</script>

<style>
body{
  margin: 0;
}
* {
	box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  margin: 0;
  overflow: hidden;

}

</style>
