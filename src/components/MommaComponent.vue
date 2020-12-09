<template>
  <div class="MommaComponent">
    <VisualizationCanvas v-bind:num-cubes="this.count"/>
    <div class="Buttons">
    <Button v-on:click="increment()">
      Duplicate
    </Button>
    <Button>
      Create Random!
    </Button>
    <Button>
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
      cubesInfo: []
    }
  },
  methods: {
    increment(){
      this.count++;
      this.cubesInfo[0] = this.count;
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
