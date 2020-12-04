<template>
  <div class="MommaComponent">
    <VisualizationCanvas v-bind:num-cubes="this.count" v-bind:user-reset="this.resetBool"/>
    <div class="Buttons">
    <Button v-on:click="increment()">
      Visualize!
    </Button>
    <Button>
      Create Random!
    </Button>
    <Button v-on:click="userReset()">
      Reset
    </Button>
    </div>

  </div>
</template>

<script>
import VisualizationCanvas from "./VisualizationCanvas.vue"


export default {
  components:{
      VisualizationCanvas,
  },
  data: function() {
    return {
      count: 1,
      resetBool: false,
      resetState: 0,
      cubesInfo: [],
    }
  },
  methods: {
    increment(){
      this.count++;
      this.cubesInfo[0] = this.count;
    },
    userReset(){
      this.resetBool = true;
      // if (this.resetBool && this.resetState == 0) {
      //   this.resetBool = false;
      //   this.resetState = 1;
      // }
      // if( !this.resetBool && this.resetState == 1){
      //   this.resetState = 0;
      // }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .MommaComponent {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* Firefox */
  }
  .MommaComponent .Buttons{
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

  }
 .MommaComponent .Buttons .btn {
  position: relative ;
	margin: 2px;
	font-size: 0.7em;
	font-weight: 600;
	text-transform: uppercase;
}


</style>
