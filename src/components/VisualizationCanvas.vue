<template>
  <div id="VisualizationCanvas">
      
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MathUtils } from "three/src/math/MathUtils.js"

// import { GUI } from "../node_modules/three/examples/jsm/libs/dat.gui.module.js";
// import { EffectComposer } from "../node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "../node_modules/three/examples/jsm/postprocessing/RenderPass.js";
// import { AfterimagePass } from "../node_modules/three/examples/jsm/postprocessing/AfterimagePass.js";


export default {
    props: [
        
    ],
    data: () => ({
        scene: null,
        camera: null,
        renderer: null,
        orbitControls: null,
        controls: null,
        mouseCoords: null,
        down: false,
        clickRequest: false,
        directionalLight: null,
        ambientLight: null,
		hemisphereLight: null,
        cubes:[],
        cubeMaterial: null,
        materialMesh: null, //can delete later
    }),
    mounted() {
        this.init();
        this.renderCube();
    },
    methods:{
        init(){
            let width = window.innerWidth,
                height = window.innerHeight;
                
			//Scene
			this.scene = new THREE.Scene();
			this.scene.background = new THREE.Color(0xbbd6ff);
			this.scene.fog = new THREE.Fog(0xffffff, 0, 750);
			//Camera
			this.camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
			// this.camera.position.y = this.cameraY + 2000;
			// this.camera.position.x = -500;
			this.camera.position.z = 1;
			// var helper = new THREE.CameraHelper(this.camera);
            // this.scene.add(helper);
            
			//Renderer
			this.renderer = new THREE.WebGLRenderer({ antialias: true });
			this.renderer.setSize(width, height);
			this.renderer.shadowMap.enabled = true;
			// this.renderer.shadowMap.type = THREE.BasicShadowMap;
            document.getElementById("VisualizationCanvas").appendChild(this.renderer.domElement);

            // Ambient Light
			this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
			this.scene.add(this.ambientLight);
			// LIGHTS
			this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
			this.hemisphereLight.color.setHSL(0.6, 1, 0.6);
			this.hemisphereLight.groundColor.setHex(0x87775d);
			this.hemisphereLight.position.set(0, 5, 0);
			this.scene.add(this.hemisphereLight);
			// let hemiLightHelper = new THREE.HemisphereLightHelper(this.hemisphereLight, 10);
			// this.scene.add(hemiLightHelper);
			this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
			this.directionalLight.color.setHSL(0.1, 1, 0.95);
			this.directionalLight.position.set(-1, 1.75, 1);
			this.directionalLight.position.multiplyScalar(70);
			this.scene.add(this.directionalLight);
			this.directionalLight.castShadow = true;
			this.directionalLight.shadow.mapSize.width = 2048;
			this.directionalLight.shadow.mapSize.height = 2048;
			var d = 200;
			this.directionalLight.shadow.camera.left = -d;
			this.directionalLight.shadow.camera.right = d;
			this.directionalLight.shadow.camera.top = d;
			this.directionalLight.shadow.camera.bottom = -d;
            this.directionalLight.shadow.camera.far = 350;
            
            //Resize handler
            window.addEventListener("resize", this.resizeHandler);

            //createCube
            // let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            // this.material = new THREE.MeshNormalMaterial();
            // this.cubes.push(new THREE.Mesh(geometry, this.material));
            // this.scene.add(this.cubes[0]);

            // Setting hover handler
            //this.mouseCoords = new THREE.Vector2();
            
            //Extra Particles to make it look good for milestone 2 can delete later
            let vertexShader = `
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform float time;
            attribute vec3 position;
            attribute float size;
            void main(){
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                gl_PointSize = 2.0 + size * abs(sin( time / size ));
            }`;
            let fragmentShader = `
            void main(){
                gl_FragColor = vec4(0.5);
            }`;
            this.materialMesh = new THREE.RawShaderMaterial({
                uniforms: { time: { type: "f", value: 0.0 } },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
            });
            this.geometryMesh = new THREE.BufferGeometry();
            let position = [];
            let size = [];
            for (var i = 0; i < 50; i++) {
                position.push(Math.random() * 100); // X
                position.push(Math.random() * 60); // Y
                position.push(Math.random() * 10); // Z
                size.push(Math.random() * 15); // Z
            }
            this.geometryMesh.setAttribute("position", new THREE.BufferAttribute(new Float32Array(position), 3));
            this.geometryMesh.setAttribute("size", new THREE.BufferAttribute(new Float32Array(size), 1));
            let mesh = new THREE.Points(this.geometryMesh, this.materialMesh);
            mesh.position.set(-50, -40, -30);
            this.scene.add(mesh);
            
            //this.scene.add(this.cubes[0]);
            this.addControls();
            this.renderLoop();
        },

        renderLoop(){
            requestAnimationFrame(this.renderLoop);
            this.materialMesh.uniforms.time.value += 0.5;
            this.cubes.forEach((cube, ndx) => {
            const speed = .01 + ndx * 0.1;
			cube.rotation.x += speed;
			cube.rotation.y += speed;
            });

            this.renderer.render(this.scene, this.camera)

            this.orbitControls.update();
            this.processClick();
        },

		resizeHandler() {
			let width = window.innerWidth,
			height = window.innerHeight;
			this.renderer.setSize(width, height);
			this.camera.aspect = width / height;
			this.camera.updateProjectionMatrix();
        },
        addControls() {
            this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
            this.orbitControls.update();
        },
		setMouseVector(event) {
				this.mouseCoords.x = (event.clientX / window.innerWidth) * 2 - 1;
				this.mouseCoords.y = -(event.clientY / window.innerHeight) * 2 + 1;

		},
        processClick() {
            if ( this.down == true ) {
                // Creates a cube
                const boxSize = MathUtils.randFloat(0.4,4.0)
                const boxZPos = MathUtils.randInt(-10,10)
                const box = new THREE.Mesh( new THREE.boxGeometry( boxSize, boxSize, boxSize ), this.material );
                box.position.set(this.mouseCoords.x,this.mouseCoords.y,boxZPos)
                this.cubes.push(box);
                this.scene.add(box);
                this.down = false;
                console.log("click processed");
            }
        },
        renderCube(){
            let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            this.material = new THREE.MeshNormalMaterial();
            this.cubes.push(new THREE.Mesh(geometry, this.material));
            this.scene.add(this.cubes[0]);
        },



    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
#VisualizationCanvas{
  width: 100%;
  height: 100%;

}


</style>
