import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//console.log(GLTFLoader)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Models
const gltfLoader = new GLTFLoader();


gltfLoader.load( 
  './Duck/glTF/Duck.gltf', 
  (gltf) =>
  {
    scene.add(gltf.scene.children[0])
  }
)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement ); //Sirve para rotar la camara

// Habilitar sombras en el renderizador
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Cubo
/*
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const standardMaterial = new THREE.MeshLambertMaterial({color: 0x00ffff});
const cube = new THREE.Mesh( geometry, standardMaterial );
cube.castShadow = true;
scene.add( cube );
*/

// Plano
const geometryPlane = new THREE.PlaneGeometry(5, 5)
const material02 = new THREE.MeshLambertMaterial({color:0x00ffff, side:THREE.DoubleSide})
const plane = new THREE.Mesh(geometryPlane, material02)
plane.receiveShadow = true; 
plane.rotation.x = -Math.PI/2
plane.position.y = -2
scene.add( plane )



// Luz ambiental
const ambientLight = new THREE.AmbientLight( 0x404040, 3)
scene.add( ambientLight )

// Luz direccional
const directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
directionalLight.castShadow = true;  // Habilitar sombra para la luz
scene.add( directionalLight);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
})

camera.position.z = 5;
controls.update(); //Actualizacion de Orbit control

function animate() {
  /*
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  */
  renderer.render( scene, camera );
}