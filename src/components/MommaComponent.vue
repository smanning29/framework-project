<template>
  <div class="MommaComponent">
    <VisualizationCanvas v-bind:user-reset="this.resetCurr" :site-mode="this.lightMode" :num-vertex="this.numVerticies" :sw="this.shapeWidth" :sh="this.shapeHeight" :rand-color="this.randomColor"/>
    <div class="Buttons">
    <Button v-on:click="switchMode()">
      Day / Night
    </Button>
    <Button v-on:click="addVerticies()">
      Add Glass
    </Button>
    <Button v-on:click="incWidth()">
      Width
    </Button>
    <Button v-on:click="incHeight(); randomColorGen()">
      Details
    </Button>
    <Button v-on:click="userReset().then(userReset());">
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
      resetCurr: null,
      resetPrev: null,
      cubesInfo: [],
      lightMode: true,
      numVerticies: 50,
      shapeWidth: 5,
      shapeHeight: 1,
      updateShape: false,
      randomColor: null,
    }
  },
  methods: {
    increment(){
      this.count++;
      this.cubesInfo[0] = this.count;
    },
    userReset(){
      this.resetCurr = true;
    },
    userUnReset(){
      this.resetCurr = false;
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
    },
    incWidth(){
      this.shapeWidth += 1;
      this.updateShape = true;
    },
    incHeight(){
      this.shapeHeight += 1;
      this.updateShape = true;
    },
    randomColorGen(){
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      this.randomColor = "rgb(" + r + "," + g + "," + b + ")";
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
