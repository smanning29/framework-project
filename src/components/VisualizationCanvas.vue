<template>
  <div id="VisualizationCanvas">
      
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MathUtils } from "three/src/math/MathUtils.js";
import { Sky } from '../assets/Sky.js';


// import { GUI } from "../node_modules/three/examples/jsm/libs/dat.gui.module.js";
// import { EffectComposer } from "../node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "../node_modules/three/examples/jsm/postprocessing/RenderPass.js";
// import { AfterimagePass } from "../node_modules/three/examples/jsm/postprocessing/AfterimagePass.js";


export default {
    props: {
        cubeProps: Array,
        numCubes: Number,
        userReset: Boolean,
        siteMode: Boolean,
        numVertex: Number,
    },
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
        lastX: 0,
        lastY: 0,
        lastZ: 0,
        currLoop: 1,
        meshStars: null,
        fragmentShader: ` `,
        vertexShader: ` `,
        fragmentShaderGlass: ` `,
        vertexShaderGlass: ` `,
        currMode: true,
        currNumVertex: 50,
        effectController: null,
        sky: null,
        sun: null,
        uniforms: null,

    }),
    mounted() {
        this.init();
    },
    methods:{
        init(){
            this.userReset = false;
            let width = window.innerWidth,
                height = window.innerHeight;
			//Scene
			this.scene = new THREE.Scene();
			this.scene.background = new THREE.Color(0x171137);
			this.scene.fog = new THREE.Fog(0xffffff, 0, 750);
			//Camera
			this.camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
			this.camera.position.z = 1;
            
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
			let hemiLightHelper = new THREE.HemisphereLightHelper(this.hemisphereLight, 10);
			this.scene.add(hemiLightHelper);
			this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
			this.directionalLight.color.setHSL(0.1, 1, 0.95);
			this.directionalLight.position.set(-1, 1.75, 1);
			this.directionalLight.position.multiplyScalar(70);
			// this.scene.add(this.directionalLight);
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

            // Setting hover handler
            //this.mouseCoords = new THREE.Vector2();

            //setting up material and shaders for stars
            this.vertexShader = `
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform float time;
            attribute vec3 position;
            attribute float size;
            void main(){
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                gl_PointSize = 2.0 + size * abs(sin( time / size ));
            }`;
            this.fragmentShader = `
            void main(){
                gl_FragColor = vec4(247,233,156,0.9);
            }`;

            this.materialMesh = new THREE.RawShaderMaterial({
                uniforms: { time: { type: "f", value: 0.0 } },
                vertexShader: this.vertexShader,
                fragmentShader: this.fragmentShader,
            });

            //setup shader for glass cube
            this.vertexShaderGlass = `
           precision mediump float;
			precision mediump int;

			uniform mat4 modelViewMatrix; // optional
			uniform mat4 projectionMatrix; // optional

			attribute vec3 position;
			attribute vec4 color;

			varying vec3 vPosition;
			varying vec4 vColor;

			void main()	{

				vPosition = position;
				vColor = color;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}`;
            this.fragmentShaderGlass = `
           	precision mediump float;
			precision mediump int;

			uniform float time;

			varying vec3 vPosition;
			varying vec4 vColor;

			void main()	{

				vec4 color = vec4( vColor );
				color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

				gl_FragColor = color;

            }`;
            this.initAddToScene();
            // this.scene.add(mesh);
            
            // this.addControls();
            // this.renderLoop();
            this.renderLoop();
        },
        initAddToScene(){
            this.numVertex = 50;
            this.glassCube();
            this.addControls();
            //this.bgStars();
            this.initSky();
           
        },

        initSky() {
                
				// Add Sky
				this.sky = new Sky();
				this.sky.scale.setScalar( 450000 );
                this.scene.add( this.sky );
                
                this.effectController = {
					turbidity: 10,
					rayleigh: 3,
					mieCoefficient: 0.005,
					mieDirectionalG: 0.7,
					inclination: 0.49, // elevation / inclination
					azimuth: 0.25, // Facing front,
					exposure: this.renderer.toneMappingExposure
                };
                
                this.uniforms = this.sky.material.uniforms;
				this.uniforms[ "turbidity" ].value = this.effectController.turbidity;
				this.uniforms[ "rayleigh" ].value = this.effectController.rayleigh;
				this.uniforms[ "mieCoefficient" ].value = this.effectController.mieCoefficient;
				this.uniforms[ "mieDirectionalG" ].value = this.effectController.mieDirectionalG;

                this.initSun();
            },
            
        initSun(){
            
                this.sun = new THREE.Vector3();
                this.sun.name = "siteSun";
                const theta = Math.PI * ( this.effectController.inclination - 0.5 );
				const phi = 2 * Math.PI * ( this.effectController.azimuth - 0.5 );
                this.sun.x = Math.cos( phi );
				this.sun.y = Math.sin( phi ) * Math.sin( theta );
				this.sun.z = Math.sin( phi ) * Math.cos( theta );

				this.uniforms[ "sunPosition" ].value.copy( this.sun );
        },     


        renderLoop(){
            requestAnimationFrame(this.renderLoop);
            this.materialMesh.uniforms.time.value += 0.5;

            this.cubes.forEach((cube, ndx) => {
            const speed = .01 + ndx * 0.1;
			cube.rotation.x += speed;
			cube.rotation.y += speed;
            });

            //rotate glass
            // const time = performance.now();

            // const object = this.scene.getObjectByName("glass");

            // object.rotation.y = time * 0.0005;
            // object.material.uniforms.time.value = time * 0.005;


            this.renderer.render(this.scene, this.camera)
            this.orbitControls.update();
            this.processClick();
            this.cubeLoop();
            this.resetScene();
            this.changeSiteMode();
            this.glassCube()
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
        cubeLoop(){
            if(this.currLoop == this.numCubes){
                var geometry = new THREE.BoxGeometry(0.2,0.2,0.2);
                var material = new THREE.MeshNormalMaterial();
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = (this.lastX);
                mesh.position.y = (this.lastY);
                mesh.position.z = (this.lastZ);
                this.scene.add(mesh);
                this.lastX = this.lastX + 1;
                console.log(this.lastX);
                this.currLoop++;
            }
        },

        bgStars(){
            this.geometryMesh = new THREE.BufferGeometry();
            let position = [];
            let size = [];
            //quadrant 1
            for (var i = 0; i < 50; i++) {
                position.push(Math.random() * 100); // X
                position.push(Math.random() * 60); // Y
                position.push(Math.random() * 10); // Z
                size.push(Math.random() * 15); // Z
            }

            
            this.materialMesh.fragmentShader = this.fragmentShader;
            this.geometryMesh.setAttribute("position", new THREE.BufferAttribute(new Float32Array(position), 3));
            this.geometryMesh.setAttribute("size", new THREE.BufferAttribute(new Float32Array(size), 1));
            this.meshStars = new THREE.Points(this.geometryMesh, this.materialMesh);
            this.meshStars.name = "backgroundStars";
            this.meshStars.position.set(-50, -40, -30);
            this.scene.add(this.meshStars);
            
        },
        glassCube(){
            if(this.currNumVertex == this.numVertex){
                const vertexCount = this.numVertex;

                const geometryGlass = new THREE.BufferGeometry();

                const positions = [];
                const colors = [];

                for ( let i = 0; i < vertexCount; i ++ ) {

                    // adding x,y,z
                    positions.push( Math.random() - 0.5 );
                    positions.push( Math.random() - 0.5 );
                    positions.push( Math.random() - 0.5 );

                    // adding r,g,b,a
                    colors.push( Math.random() * 255 );
                    colors.push( Math.random() * 255 );
                    colors.push( Math.random() * 255 );
                    colors.push( Math.random() * 255 );

                }

                const positionAttribute = new THREE.Float32BufferAttribute( positions, 3 );
                const colorAttribute = new THREE.Uint8BufferAttribute( colors, 4 );

                colorAttribute.normalized = true; // this will map the buffer values to 0.0f - +1.0f in the shader

                geometryGlass.setAttribute( 'position', positionAttribute );
                geometryGlass.setAttribute( 'color', colorAttribute );

                // material

                const materialGlass = new THREE.RawShaderMaterial( {

                    uniforms: {
                        time: { value: 1.0 }
                    },
                    vertexShader: this.vertexShaderGlass,
                    fragmentShader: this.fragmentShaderGlass,
                    side: THREE.DoubleSide,
                    transparent: true

                } );

                const meshGlass = new THREE.Mesh( geometryGlass, materialGlass );
                meshGlass.name = "glass";
                this.scene.add( meshGlass );
                this.currNumVertex += 50;
            }
        },
        changeSiteMode(){
        if(this.currMode == this.siteMode){
            this.scene.remove(this.scene.getObjectByName("siteSun"));
            if(this.siteMode == true){
                //light mode
                console.log('light mode');
                this.effectController.azimuth = 0.25;
                this.initSun();
                this.scene.remove(this.scene.getObjectByName("backgroundStars"));
                 
            }
            else {
                //dark mode
                console.log('dark mode');
                this.effectController.azimuth = -1.25;
                this.initSun();
                this.bgStars();
            }

                  if(this.currMode == true){
                        this.currMode = false;
                    }
                    else{
                        this.currMode = true;
                    }
        }
        },

        resetScene(){
            if(this.userReset == true){
                //try to fix user reset first
                while(this.scene.children.length > 0){ 
                     this.scene.remove(this.scene.children[0]); 
                }

                if (this.scene.children.length == 0) {
                    this.userReset = false;
                    this.currNumVertex = 50;
                    this.initAddToScene();
                    //seperate init into two functions, one with things needed to add to scene, and one with nessesary things
                }
            }
        }
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
