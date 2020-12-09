<template>
  <div class="MommaComponent">
    <VisualizationCanvas v-bind:num-cubes="this.count" v-bind:user-reset="this.resetBool" v-bind:site-mode="this.lightMode" v-bind:num-vertex="this.numVerticies" />
    <div class="Buttons">
    <Button v-on:click="increment()">
      Duplicate
    </Button>
    <Button v-on:click="switchMode()">
      Day / Night
    </Button>
    <Button v-on:click="addVerticies()">
      Add Glass
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
      lightMode: true,
      numVerticies: 50
    }
  },
  methods: {
    increment(){
      this.count++;
      this.cubesInfo[0] = this.count;
    },
    userReset(){
      this.resetBool = true;
    },
    switchMode(){
      if(this.lightMode == true){
        this.lightMode = false;
        console.log("false");
      }
      else{
        this.lightMode = true;
        console.log("true");
      }
    },
    addVerticies(){
        this.numVerticies += 50;
    }
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
