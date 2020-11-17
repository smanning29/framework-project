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
//   data() {
//     return {
//       camera: null,
//       scene: null,
//       renderer: null,
//       mesh: null
//     }
//   },
//   methods: {
//     init: function() {
//         let container = document.getElementById('container');
//         console.log(container);

//         this.camera = new Three.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 10000);
//         this.camera.position.z = 5;

//         //resize window
//         window.addEventListener("resize", () => {
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//         this.camera.aspect = window.innerWidth / window.innerHeight;

//         this.camera.updateProjectionMatrix();
//       });

//         this.scene = new Three.Scene();

//         let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
//         let material = new Three.MeshNormalMaterial();

//         this.mesh = new Three.Mesh(geometry, material);
//         this.scene.add(this.mesh);

//         this.renderer = new Three.WebGLRenderer({antialias: true});
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//         container.appendChild(this.renderer.domElement);

//     },
//     animate: function() {
//         requestAnimationFrame(this.animate);
//         this.mesh.rotation.x += 0.01;
//         this.mesh.rotation.y += 0.02;
//         this.renderer.render(this.scene, this.camera);
//     },
//     secondCube: function(size) {
//       let geometry = new Three.BoxGeometry(size, size, size);
//       const material = new Three.MeshNormalMaterial();
//       this.mesh = new Three.Mesh(geometry, material);
//       this.scene.add(this.mesh);
//     }
//   },
//   mounted() {
//       this.init();
//       this.animate();
//   }
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
