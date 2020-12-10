<template>
  <div class="MommaComponent">
    <VisualizationCanvas v-bind:user-reset="this.resetCurr" :site-mode="this.lightMode" :num-vertex="this.numVerticies" :sw="this.shapeWidth" :sh="this.shapeHeight" :rand-color="this.randomColor"/>
    <div class="Buttons">
      <img class= "imgButton" src="../assets/dark.png" v-if="lightMode==true" v-on:click="switchMode()"/>
      <img class= "imgButton" src="../assets/light.png" v-if="lightMode==false" v-on:click="switchMode()"/>
      <Button v-on:click="addVerticies()">
        Add Glass
      </Button>
      <Button v-on:click="randomColorGen()">
        Color
      </Button>
      <div class="slidercontainer">
        <label for="shapeSlider">Shape</label>
        <input type="range" min="1" max="7" value="3" v-model.number="shapeHeight" id="shapeSlider" class="slider">
      </div>
    </div>
    <div class="logo">
      <a href="https://github.com/smanning29/framework-project" target="_blank">GLASS PLANET</a>
      
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
      shapeHeight: 3,
      updateShape: false,
      imgUrl: "../assest/light.png",
      randomColor: "rgb(255,255,255)",
      heightChange: 1,
    }
  },
  methods: {
    userReset(){
      this.numVerticies = 50;
      this.shapeHeight = 2;
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
    // incHeight(){ //actually detail
      
    //   if(this.shapeHeight % 8 == 0){
    //     this.heightChange *= -1;
    //   }
    //   console.log(this.shapeHeight)
    //   this.shapeHeight += this.heightChange;
    // },
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
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  .imgButton{
    width: 5%;
    height: auto;
    cursor: pointer;
    padding: 2px;
    margin-left: 10px;
    margin-right: 10px;
    margin: 10px;
    align-self: flex-start;
  }

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
    width: 50%;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

  }
 .MommaComponent .Buttons .btn {
  position: relative ;
	margin: 10px;
	font-size: 0.7em;
	font-weight: 600;
	text-transform: uppercase;
}
.MommaComponent .Buttons .slidercontainer{
  margin: 10px;
  padding: 2px;
  display: flex;
  flex-direction: column;
  background-color: rgba(56, 0, 153, 0.45);
  color: #fff;
	border: none;
	border-radius: 3px;
	height: 40px;
	cursor: pointer;
	transition: all 150ms ease-out;
  font-size: 0.7em;
	font-weight: 600;
	text-transform: uppercase;
}
.MommaComponent .logo {
  position: absolute;
    width: 50%;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-family: 'Press Start 2P', cursive;
    color: #fff;
    padding: 20px;
    font-size: 1.5em;
}

a:link, a:visited {
  color: white;
  text-decoration: none;
  display: inline-block;
}

a:hover, a:active {
  color: rgb(56, 0, 153);
}



</style>
