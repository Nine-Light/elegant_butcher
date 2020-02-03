/**  @author Nine-Light  (B站账号：隙游尘)
 *   文件说明
 *   (1) data.js 用来存储所有的全局变量。
 *   (2) file.js 存储外部文件地址。如模型、纹理、音乐
 *   (3) fun.js  存放各种功能性函数
 *   (4) modelLoad.js 各种模型加载函数(obj、mmd、文字)
 *   (5) animate.js 存放animate函数，放一些需要实时更新的东西
 *   (6) elegant_butcher.js 存放初始化函数
 *   (7) time_axis.js 时间轴，用来执行不同地图下event.js中的各种事件，以及显示对话。
 *       通过log和logNum来控制对话。用eve来控制event。
 *   (8) event.js 存放各种事件与模型动画切换，用一个对象来存储。
 *   (9) script.js 剧本。

 *   使用说明
 *   (1) 如果你需要使用游戏中的材质、obj与mtl，请查阅游戏目录下的“素材地址整理.md”文件，
 *       并按照我提供的说明，前往原地址下载。
 *   (2) 如果你需要使用我制作的火柴人模型(stickman.pmx)，不需要向我申请，请随意使用:)
 *       当然，在你展示你的作品时，还请列出我的昵称“隙游尘”。
 
*/ 
Ammo().then( function ( AmmoLib ) {
    Ammo = AmmoLib;
    Physijs.scripts.worker = './src/js/tools/physijs_worker.js';
    Physijs.scripts.ammo = 'physijs_ammo/ammo.js';
    init();
} );

function init() {
    hp.style.width = "600px";

    scene = new Physijs.Scene();
    scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
    scene.addEventListener(
        'update',
        function() {
            scene.simulate( undefined, 1 );
        }
    );
    // console.log(111)

    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, peopleHeight, 0);
    camera.add(listener);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.clearColor = 0x000000;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.getElementById("container").appendChild(renderer.domElement);

    pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 600, 0 );
    scene.add(pointLight);


    ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);


    //音效加载
    auLoader.load("./src/bgm/gun.mp3", function(buffer){
        soundGun.setBuffer(buffer);
    })
    //bgm加载
    // bgmBtn.addEventListener("click", bgmBegin, false);
    // auLoader.load("./src/bgm/Eluveitie - The Liminal Passage.mp3", function(buffer){
    //     bgm.setBuffer(buffer);
    //     bgm.setLoop(true);
    //     bgmBtn.click();
    //     bgmBtn.removeEventListener("click", bgmBegin);
    // })

    // auLoader.load("./src/bgm/Eluveitie - The Liminal Passage.mp3", function(buffer){
    //     soundHS.setBuffer(buffer);
    //     bgm.setLoop(true);
    //     bgmBtn.click();
    //     bgmBtn.removeEventListener("click", bgmBegin);
    // })
    

    //地图生成
    mapCreate("grassland1");
    
    //模型配置
    scene.add(geoContainer)
    modelsLoader(file.desertEagle, null, file.desertEagleMtl,  0x222222, [5, peopleHeight - 10 , -15], [0, 0, Math.PI],[1, 1, 1],  "desertEagle", true);
    

    //阴影设置
    // pointLight.castShadow = true;
    // mesh.map.castShadow = true;
    // mesh.map.receiveShadow = true;

    //键盘事件监听器
    window.addEventListener("resize",function() {//屏幕大小自适应
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    },false)
    document.addEventListener("keydown", function(e) {
        //console.log(e.which);//空格32  shift 16   ctrl17
        keyNum[e.which] = true;
        if(e.which == 69 && !dialogKey) {
            dialogKey = true;
            dialogKey2 = true;
        }
        if(e.which == 17) {
            if(squatSwitch) {
                squatKey = true;
            }
        }
    },false)
    document.addEventListener("keyup", function(e) {
        keyNum[e.which] = false;
    },false)
    document.addEventListener("mousedown", function() {
        if(!mouseLock) {
            mouseLock = true;
            document.getElementById('container').requestFullscreen();
        }
        if(fullscreenElement) {
            shoot = true;
            gunBtn.click();
        }

    },false)
    document.addEventListener("mouseup", function() {
        shoot = false;
        shootKey2 = true;
    }, false)

    gunBtn.addEventListener("click", function() {
        if(soundGun.isPlaying) {
            soundGun.stop();
            soundGun.play();
        }else {
            soundGun.play();
        }
    })

    //controls
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    pointerControls = new THREE.PointerLockControls(camera, renderer.domElement);    
    animate();
    scene.simulate();
}