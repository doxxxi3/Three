import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.1/three.module.min.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'

//for more modern version of orbit control user importmap https://stackoverflow.com/questions/75250424/threejs-orbitcontrol-import-version-from-cdn

let camera3D, scene, renderer, cube;
let controls;


function init3D() {
    scene = new THREE.Scene();
    camera3D = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1,1,1,1,1,16);
    const material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xADD8E6});
    
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = -1;
    scene.add(cube);

    const geometryy= new THREE.CylinderGeometry(0.5,0.5,1,12,16);
    const materiall = new THREE.MeshBasicMaterial({ color: 0xffc0cb});

    let cylinder = new THREE.Mesh(geometryy, materiall);
    cylinder.position.x = 1;
    scene.add(cylinder);

    const geometryyy = new THREE.BoxGeometry(5,0.1,3);
    const materialll = new THREE.MeshBasicMaterial({ color: 0x808080});
    
    cube = new THREE.Mesh(geometryyy, materialll);
    cube.position.x = 0;
    cube.position.y = -1;
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xFF0000, 30);
    light.position.set(0, 2, 0);
    const lightHelper = new THREE.DirectionalLightHelper(light);
    light.lookAt(0, 2, 0);
    scene.add(light);

    let bgGeometery = new THREE.SphereGeometry(100, 60, 40);
    // let bgGeometery = new THREE.CylinderGeometry(725, 725, 1000, 10, 10, true)
    bgGeometery.scale(-1, 1, 1);
    // has to be power of 2 like (4096 x 2048) or(8192x4096).  i think it goes upside down because texture is not right size
    let panotexture = new THREE.TextureLoader().load("images/sky2.jpg");
    panotexture.wrapS = THREE.RepeatWrapping;
    panotexture.repeat.set(2,1);
    // var material = new THREE.MeshBasicMaterial({ map: panotexture, transparent: true,   alphaTest: 0.02,opacity: 0.3});
    let backMaterial = new THREE.MeshBasicMaterial({ map: panotexture });

    let back = new THREE.Mesh(bgGeometery, backMaterial);
    scene.add(back);



    controls = new OrbitControls(camera3D, renderer.domElement);
    camera3D.position.z = 2;
    animate();
}

function animate() {
    controls.update();  //orbit controls
    renderer.render(scene, camera3D);
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    camera3D.aspect = window.innerWidth / window.innerHeight;
    camera3D.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init3D();