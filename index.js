import * as THREE from 'three';
import {GLTFLoader} from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";


const canvas =document.querySelector('.webgl');
let scene, camera, renderer, cube;

renderer =new THREE.WebGLRenderer({
     antialias: true
})
const sizes={
    width: window.innerWidth,
   height: window.innerHeight
   }
scene = new THREE.Scene();

const Gltfloader = new GLTFLoader();
// const objLoader = new OBJLoader();

const glbUrls = [
  'models/cars/McLaren.glb',
  'models/cars/huracan.glb',
  'models/cars/dodge.glb',
  'models/cars/SAMG.glb',
  'models/cars/infinity.glb',
  'models/cars/corvetStingray.glb',
  'models/cars/rc-13.glb',
  'models/cars/lynkanHypersport.glb',
  'models/cars/Koenigsegg.glb',
  'models/cars/SLSAMG.glb',
  'models/cars/BugattiChiron.glb'

];
const headings = [
  'McLaren',
  'Lamborghini Huracan',
  'Dodge',
  'Mercedes S Class AMG',
  'Infinity G-60',
  'Corvet Stingray',
  'RC-13',
  'Lynkan Hypersport',
  'Koenigsegg',
  'Mercedes SLS AMG',
  'Bugatti Chiron'
];

let currentModelIndex = 0;
const heading = document.getElementById('my-heading');
let headingIndex=0;


const loadModel = (index) => {
  const loader = new GLTFLoader();
  loader.load(glbUrls[index], (glb) => {
    cube = glb.scene;
    // cube.position.set(0,0,0);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);
  });
};
loadModel(currentModelIndex);

// loader.load('models/cars/McLaren.glb', function(glb){
//      cube =glb.scene;
//     cube.scale.set(10,10,10);
//     cube.castShadow = true;
// cube.receiveShadow = true;
//     scene.add(cube);
// });
let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light.position.set(-100, 100, 100);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.bias = -0.001;
light.shadow.mapSize.width = 4096;
light.shadow.mapSize.height = 4096;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500.0;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500.0;
light.shadow.camera.left = 50;
light.shadow.camera.right = -50;
light.shadow.camera.top = 50;
light.shadow.camera.bottom = -50;
scene.add(light);


camera= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,60000);
camera.position.z=1;

// var cameraHolder = new THREE.Object3D();
// cameraHolder.position.set(0, 10, 20);
// cameraHolder.add(camera);
// scene.add(cameraHolder);

let controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener('change', renderer);

// const Texloader= new THREE.CubeTextureLoader();
// const texture= Texloader.load([
//         'city/posx.jpg',
//         'city/negx.jpg',
//         'city/posy.jpg',
//         'city/negy.jpg',
//         'city/posz.jpg',
//         'city/negz.jpg'
// ]);
// texture.encoding = THREE.sRGBEncoding;
// scene.background = texture;
let materialArray=[];
let texture_gx = new THREE.TextureLoader().load('city/negx.jpg');
let texture_gy = new THREE.TextureLoader().load('city/negy.jpg');
let texture_gz = new THREE.TextureLoader().load('city/negz.jpg');
let texture_sx = new THREE.TextureLoader().load('city/posx.jpg');
let texture_sy = new THREE.TextureLoader().load('city/posy.jpg');
let texture_sz = new THREE.TextureLoader().load('city/posz.jpg');

materialArray.push(new THREE.MeshBasicMaterial({map: texture_sx}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_gx}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_sy}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_gy}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_sz}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_gz}));

for(let i=0;i<6;i++)
materialArray[i].side = THREE.BackSide;

let skyboxGeo= new THREE.BoxGeometry(10000,10000,10000);
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);
// var Texmaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
// var TexGeometry = new THREE. SphereGeometry(500, 60, 40);
// var TexMesh = new THREE.Mesh(TexGeometry, Texmaterial);
// scene.add(TexMesh);

renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
renderer.gammaFactor = 2.2;
renderer.setClearColor(0xffffff); 
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);


const groundGeometry = new THREE.PlaneGeometry(10,10,5);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 0.5, transparent:true});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1;
ground.receiveShadow = true;
ground.castShadow= false;
scene.add(ground);




const mouse = new THREE.Vector2();
const windowHalf = new THREE.Vector2(sizes.width / 2, sizes.height / 2);

function onDocumentMouseMove(event) {
  mouse.x = (event.clientX - windowHalf.x) / 100; 
  mouse.y = (event.clientY - windowHalf.y) / 100;
}

document.addEventListener('mousemove', onDocumentMouseMove, false);


window.addEventListener('wheel', handleScroll);

function handleScroll(event) {
  const delta = event.deltaY;
  if (delta > 0) {
    camera.position.z += 0.1;
  } else {
    camera.position.z -= 0.1;
  }
}

function animate(){
    requestAnimationFrame(animate);
    // scene.rotation.x += mouse.y * 0.01;
    // scene.rotation.y += mouse.x * 0.001;

    // cameraHolder.position.copy(cube.position);
    // cameraHolder.position.z+=10;
    // cameraHolder.lookAt(cube.position);

    renderer.render(scene,camera);
}

const changeModelButtonright = document.getElementById('changeModelButtonright');

changeModelButtonright.addEventListener('click', () => {
  scene.remove(cube);
  currentModelIndex = (currentModelIndex + 1) % glbUrls.length;
  loadModel(currentModelIndex);

  headingIndex=(headingIndex+1) % headings.length;
  const nextHeading=headings[headingIndex];
  heading.textContent= nextHeading;
});

const changeModelButtonleft = document.getElementById('changeModelButtonleft');

changeModelButtonleft.addEventListener('click', () => {
  scene.remove(cube);
  currentModelIndex = (currentModelIndex - 1 + glbUrls.length) % glbUrls.length;

  headingIndex = (headingIndex - 1 + headings.length) % headings.length;
  const nextHeading=headings[headingIndex];
  heading.textContent= nextHeading;

  loadModel(currentModelIndex);  
});

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 38) { // Up arrow key pressed
    cube.position.z -= 1; // move model 1 unit up
    renderer.render(scene, camera); // render the scene
  }
  else if (event.keyCode === 40) { // Up arrow key pressed
    cube.position.z += 1; // move model 1 unit up
    // cube.position.y -= 0.5;
    renderer.render(scene, camera); // render the scene
  }
  else if (event.keyCode === 37) { // Up arrow key pressed
    cube.rotation.y += 1;
    cube.position.x -= 1; // move model 1 unit up
    renderer.render(scene, camera); // render the scene
  }
  else if (event.keyCode === 39) { // Up arrow key pressed
    cube.rotation.y -= 1;
    cube.position.x += 1; // move model 1 unit up
    renderer.render(scene, camera); // render the scene
  }
});

animate();