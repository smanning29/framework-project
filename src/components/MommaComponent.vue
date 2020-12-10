<template>
  <div class="MommaComponent">
    <VisualizationCanvas v-bind:user-reset="this.resetCurr" :site-mode="this.lightMode" :num-vertex="this.numVerticies" :sw="this.shapeWidth" :sh="this.shapeHeight" :rand-color="this.randomColor"/>
    <div class="Buttons">
    <Button v-on:click="switchMode()">
     Day / Night
    </Button>
    <ImageButton :img-src="this.imgUrl">

    </ImageButton>
    <Button v-on:click="addVerticies()">
      Add Glass
    </Button>
    <Button v-on:click="randomColorGen()">
      Color
    </Button>
    <Button v-on:click="incHeight()">
      Details
    </Button>
    <Button v-on:click="userReset().then(userReset());">
      Chaos mode
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
      imgUrl: "../assest/light.png",
      randomColor: "rgb(255,255,255)",
    }
  },
  methods: {
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
    incHeight(){ //actually detail
      if(this.shapeHeight< 5){
        this.shapeHeight += 1;
      }
      else if(this.shapeHeight==5){
        this.shapeHeight = 1;
      }
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
