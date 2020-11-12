<template>
  <div id="app">
    <canvas id="myCanvas"></canvas>
  </div>
</template>

<script>
import store from './store'
import * as THREE from 'three';


export default {
  name: 'App',
  components: {
  },
  store,
  methods: {
    init: function(){
      var container = document.getElementById('#myCanvas');
      this.camera = new THREE.PerspectiveCamera(75, container.clientWidth/container.clientHeight, 1, 1000);
      this.camera.position.z = 1;
      this.scene = new THREE.Scene();
      let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      let material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);


    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
