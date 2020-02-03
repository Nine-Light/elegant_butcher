//生成地图
function mapCreate(mapType) {
    var mapAll = {};
    mapAll.mountain = [];
    isMountain = false;
    if(mapType == 'grassland1') {
        mapAll.grassLand1 = new THREE.PlaneGeometry(mapSize, mapSize);
        skyCreate(mapSize, mapSize, [0, 0, 0])
        textload("grassLand1", file.grassTexture, file.grassNormal, file.grassRoughness, false, 5, [0, 0, 0], [-Math.PI / 2, 0, 0], false);
        modelsLoader(file.bigTree, null, file.bigTreeMtl, null, [0,-30,0], [0,0,0], [120, 120, 120], 'bigTree', false, true )
        modelsLoader(file.chicken, null, file.chickenMtl, "", [260, 0, 5], [0,0,0], [0.02,0.02,0.02], "chicken", false, true);
        mmdModelLoad("mesh", file.stickMan, file.villageA, null, "villageA", "villageA", "villageA", null, null, 1, [250,0,-63], [0,0,0], [10,10,10], null , [1, 0, 0], 200);
        mmdModelLoad("mesh", file.stickMan, file.villageB, null, "villageB", "villageB", "villageB", null, null, 1, [180,0,-21], [0,Math.PI / 2,0], [9,9,9], null , [0, 1, 0], 200);
        mmdModelLoad("mesh", file.stickMan, file.villageC, null, "villageC", "villageC", "villageC", null, null, 1, [254,0,93], [0,Math.PI,0], [9.5,9.5,9.5], null , [1, 1, 0], 200);
        mmdModelLoad("mesh", file.stickMan, file.villageD, null, "villageD", "villageD", "villageD", null, null, 1, [310,0,-19], [0,-Math.PI / 2,0], [8.5,8.5,8.5], null , [0, 0, 0], 200);
        rayTarget = scene.children;
        pointLight.position.y = 150;
        camera.position.x = -200;
        camera.position.z = 100;
        camCons.xMin = -mapSize / 2 + 5;
        camCons.xMax = mapSize / 2 - 5;
        camCons.zMin = -mapSize / 2 + 5;
        camCons.zMax = mapSize / 2 - 5;
        textLoader("\u95e8", 0x555555, 'door', [0, 0, mapSize / 2], [0, Math.PI, 0], file.doorTexture, file.doorNormal, file.doorRoughness, file.doorEmissive, 0.1);
    }else if(mapType == 'grassland2') {
        mapAll.grassLand2 = new THREE.PlaneGeometry(mapSize, mapSize * 3 / 4);
        camera.position.x = 0;
        camera.position.z = 50;
        camCons.xMin = -mapSize / 2 + 5;
        camCons.xMax = mapSize / 2 - 5;
        camCons.zMin = -mapSize / 2 + 5;
        camCons.zMax = mapSize / 2 - 5;
        skyCreate(mapSize, mapSize, [0, 0, 0])
        modelsLoader(file.bigTree, null, file.bigTreeMtl, null, [0,-30, 0], [0,0,0], [120, 120, 120], 'bigTree', false, true );
        mapAll.sea = new THREE.PlaneGeometry(mapSize, mapSize / 4);
        textload("grassLand2", file.grassTexture, file.grassNormal, file.grassRoughness, false, 5, [0, 0, mapSize / 8], [-Math.PI / 2, 0, 0], false);
        waterCreate([0, -mapSize / 2 + mapSize / 8]);
        
        mmdModelLoad('mesh',file.stickMan, file.aqua.vmd.stand, "", "aqua", "aqua", "aquaStand", "", "", 1,[50, 0, -20], [0,0,0], [7.5, 7.5, 7.5], function(){
            var phongMaterials = [];
            for ( var i = 0, il = mesh["aqua"].material.length; i < il; i ++ ) {
                var m = new THREE.MeshPhongMaterial({
                    color: 0x000000,
                    shininess: 0,
                });
                m.copy( mesh["aqua"].material[ i ] );
                // m.needsUpdate = true;
                phongMaterials.push( m );
            }
            mesh["aqua"].material = phongMaterials;
            scene.add( physicsHelper['aqua'] );
            helper["aqua"].enable( 'animation', true);
        }, [0, 0, 1], 1);
        
        modelsLoader(file.house2, null, file.house2Mtl, null, [-mapSize / 3, 0, mapSize / 2 - 120], [0,0,0], [4,4,4],'house', false, true);
        mmdModelLoad("mesh", file.stickMan, file.villageE, null, "villageE", "villageE", "villageE", null, null, 1, [-671, 0, 704], [0,0,0], [10,10,10], null , [1, 1, 1], 200);
        textLoader("\u95e8", 0x555555, 'door', [-mapSize / 2, 0, mapSize / 3], [0, Math.PI / 2, 0], file.doorTexture, file.doorNormal, file.doorRoughness, file.doorEmissive, 0.1);

    }else if(mapType == 'skull') {
        mapAll.skull = new THREE.PlaneGeometry(mapSize / 2,  mapSize / 2);
        camera.position.x = 0;
        camera.position.z = -490;
        camCons.xMin = -mapSize / 4 + 5;
        camCons.xMax = mapSize / 4 - 5;
        camCons.zMin = -mapSize / 4 + 5;
        camCons.zMax = mapSize / 4 - 5;
        textload("skull", file.SkullsTexture, file.SkullsNormal, file.SkullsNormal, file.SkullsEmissive, 15, [0, 0, 0], [-Math.PI / 2, 0, 0], false);
        skyCreate(mapSize / 2, mapSize / 2, [0, mapSize / 4 - 20, 0], true);
        mmdModelLoad('mesh',file.stickMan, file.wanghasang.vmd.stand, "", "wanghasang", "wanghasang", "wanghasangstand", "", "", 1,[0, 0, 0], [0,0,0], [12, 12, 12], function(){
            var phongMaterials = [];
            for ( var i = 0, il = mesh["wanghasang"].material.length; i < il; i ++ ) {
                var m = new THREE.MeshPhongMaterial({
                    color: 0x000000,
                    shininess: 1,
                });
                m.copy( mesh["wanghasang"].material[ i ] );
                // m.needsUpdate = true;
                phongMaterials.push( m );
            }
            mesh["wanghasang"].material = phongMaterials;
            scene.add( physicsHelper['wanghasang'] );
            helper["wanghasang"].enable( 'animation', true);
        }, [0.5, 0, 0.5], 1);
        ambientLight.intensity = 0.4;
        pointLight.position.y = 50
        textLoader("\u95e8", 0x555555, 'door', [0, 0, mapSize / 4], [0, Math.PI, 0], file.doorTexture, file.doorNormal, file.doorRoughness, file.doorEmissive, 0.1);
    }else if(mapType == 'mountain') {
        isMountain = true;
        skyCreate(worldSize, mapSize, [0, 0, -worldSize / 2 + mapSize / 2])
        mapAll.mountain[0] = new THREE.PlaneGeometry(worldSize, mapSize, mapCuts, mapCuts);
        //随机地形生成
        var NoiseGen = new SimplexNoise;
        for ( var i = 0; i < mapAll.mountain[0].vertices.length; i++ ) {
            if(i % (mapCuts + 1) == 0 || i % (mapCuts + 1) == mapCuts || i < mapCuts + 1 || i > mapAll.mountain[0].vertices.length - mapCuts - 1) {
                mouPointPosition.push(mapAll.mountain[0].vertices[i]);
                continue;
            }
            var vertexMoun = mapAll.mountain[0].vertices[i];
            vertexMoun.z = NoiseGen.noise(vertexMoun.x / 10, vertexMoun.y / 10 ) * mountainHigh;
            mouPointPosition.push(mapAll.mountain[0].vertices[i]);
        }
        mapAll.mountain[0].computeFaceNormals();
        mapAll.mountain[0].computeVertexNormals();
        textload("mountain", file.mountainTexture, file.mountainNormalTexture, file.mountainRoughnessTexture, file.mountainEmissiveTexture, mapCuts / 2, [0, worldSize / 2 - mapSize / 2, 0],[-Math.PI / 2, 0, 0],true);
        pointLight.position.z = -worldSize / 2;
        camera.position.z = -worldSize / 2 + mapSize;
        camera.position.x -= 70;
        textLoader("\u95e8", 0x555555, 'door', [0, 0, -worldSize / 2 + mapSize], [0, Math.PI, 0], file.doorTexture, file.doorNormal, file.doorRoughness, file.doorEmissive, 0.1);
        camCons.xMin = -worldSize / 2 + 5;
        camCons.xMax = worldSize / 2 - 5;
        camCons.zMin = -worldSize / 2 + 5;
        camCons.zMax = -worldSize / 2 + mapSize - 5;
        ambientLight.intensity = 0.8;
        pointLight.position.y = 250;
    }else if(mapType == "battlefield") {
        mapAll.battlefield = new THREE.PlaneGeometry(mapSize / 2, mapSize / 2);
        skyCreate(mapSize / 2, mapSize / 2, [0, 0, 0]);
        textload("battlefield", file.wastelandTexture, file.wastelandNormal, file.wastelandRoughness, file.wastelandEmissive, 5, [0, 0, 0], [-Math.PI / 2, 0, 0], false);
        camera.position.x = 0;
        camera.position.z = -490;
        camCons.xMin = -mapSize / 4 + 5;
        camCons.xMax = mapSize / 4 - 5;
        camCons.zMin = -mapSize / 4 + 5;
        camCons.zMax = mapSize / 4 - 5;
        //敌人生成
        for(var i = 0; i < 20; i++) {
            var position = [(Math.random() - 0.5) * mapSize / 4, 0, (Math.random() - 0.5) * mapSize / 4];
            enemyPos.push(position);
            modelsLoader(file.enemy, null, null, 0xc0c0c0, position, [0,0,0], [0.1, 0.1, 0.1], 'enemy' + i, false, false, null, true)
        }
        textLoader("\u95e8", 0x555555, 'door', [0, 0, mapSize / 4], [0, Math.PI, 0], file.doorTexture, file.doorNormal, file.doorRoughness, file.doorEmissive, 0.1);
        textLoader('\u0042\u7ad9\u0020\u9699\u6e38\u5c18', 0x555555, "name", [mapSize / 4, 0, -mapSize / 8], [0, -Math.PI / 2, 0], file.wordTexture1, file.wordNormal1, file.wordRoughness1, file.wordEmissive1, 0.1);
        textLoader("\u004e\u0069\u006e\u0065\u002d\u004c\u0069\u0067\u0068\u0074", 0x555555, 'nice', [-mapSize / 4, 0, mapSize / 4], [0, Math.PI / 2, 0], file.wordTexture1, file.wordNormal1, file.wordRoughness1, file.wordEmissive1, 0.1);
    }
    
    // mapAll.magma = new THREE.PlaneGeometry(mapSize, mapSize);//magma
    

    //天空盒生成
    function skyCreate(h, w, position, isSkull) {
        var skyBox = new THREE.BoxGeometry(h, worldSize, w);
        var skyMaterial = [],
            skyTextureSrc,
            skyTexture;
        if(isSkull) {
            skyTextureSrc = [file.sky2Texture1, file.sky2Texture2, file.sky2Texture5, file.sky2Texture6, file.sky2Texture4, file.sky2Texture3];
        }else {
            skyTextureSrc = [file.skyTexture1, file.skyTexture2, file.skyTexture5, file.skyTexture6, file.skyTexture4, file.skyTexture3];
        }
        for( var i = 0; i < 6; i++ ) {
            skyTexture = new THREE.TextureLoader().load( skyTextureSrc[i] );
            skyMaterial.push(new THREE.MeshBasicMaterial({
                map: skyTexture,
                side: THREE.BackSide,
            }))
            skyTexture.dispose();
        }
        mesh.sky = new THREE.Mesh(skyBox, skyMaterial);
        mesh.sky.position.set(position[0], position[1], position[2]);
        scene.add(mesh.sky);
        skyMaterial.forEach(function(ele){
            ele.map.dispose();
            ele.dispose();
        })
        skyBox.dispose();
    }
    
    
    // textload("magma", file.magmaTexture, file.magmaNormal, file.magmaRoughness, file.magmaEmissive, 5, mapSize / 2 - worldSize / 2 , -mapSize, false);
    // textload("grassLand", file.grassTexture, file.grassNormal, file.grassRoughness, false, 5, mapSize / 2 , -mapSize, false);
    // textload("sea", file.magma, file., file.magmaRoughness, file.magmaEmissive, 10, worldSize / 2 - mapSize / 2, mapSize / 2 - worldSize / 2 , false);
    function textload(meshName, te, nor, rou, emi, repeatNum, position, rotation, key) {
        var texture, normal, roughness, emissive;
        texture = new THREE.TextureLoader().load(te, function(text){
            text.wrapS = text.wrapT = THREE.RepeatWrapping;
            text.repeat.x = text.repeat.y = repeatNum;
        });
        normal = new THREE.TextureLoader().load(nor, function(text){
            text.wrapS = text.wrapT = THREE.RepeatWrapping;
            text.repeat.x = text.repeat.y = repeatNum;
        });
        roughness = new THREE.TextureLoader().load(rou, function(text){
            text.wrapS = text.wrapT = THREE.RepeatWrapping;
            text.repeat.x = text.repeat.y = repeatNum;
        });
        emissive =  emi ? new THREE.TextureLoader().load(emi, function(text){
            text.wrapS = text.wrapT = THREE.RepeatWrapping;
            text.repeat.x = text.repeat.y = repeatNum;
        }): false;
        if(key){
            var meshMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                roughness: 1,
                roughnessMap: roughness,
                reflectivity: 1,
                metalness: 0.8,
                emissiveMap: emissive,
                // wireframe: true,
                map: texture,
                normalMap: normal,
            })
            mesh[meshName] = new Physijs.HeightfieldMesh(mapAll[meshName][0], meshMaterial, 0, mapCuts, mapCuts);
            mesh[meshName].__dirtyRotation = true;
            mesh[meshName].__dirtyPosition = true;
            mesh[meshName].rotation.x = rotation[0];
            mesh[meshName].position.z -= position[1]//worldSize / 2 - mapSize / 2;
            mapAll[meshName][0].dispose();
            meshMaterial.dispose();
            // modelsLoader(file.bigTree, undefined, true, 0xffffff, [0, 0, 0], [0, 0, 0], [100, 100, 100], "bigTree", false, true, function(){
            //     obstacleCreate();
            // });
        }else{
            var meshMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                roughness: 1,
                roughnessMap: roughness,
                reflectivity: 1,
                metalness: 0.8,
                emissiveMap: emissive ? emissive : roughness,
                // wireframe: true,
                map: texture,
                normalMap: normal,
            });
            mesh[meshName] = new THREE.Mesh(mapAll[meshName], meshMaterial);
            mesh[meshName].position.set(position[0], position[1], position[2]);
            mesh[meshName].rotation.set(rotation[0], rotation[1], rotation[2]);
            mesh[meshName].__dirtyRotation = true;
            mesh[meshName].__dirtyPosition = true;
            mapAll[meshName].dispose();
            meshMaterial.dispose();
        }


        texture.dispose();
        normal.dispose();
        roughness.dispose();
        emissive ? emissive.dispose(): "";
        scene.add(mesh[meshName]);
        clearMaterial(mesh[meshName]);
    }

    for(var ele in mapAll){
        if(mapAll[ele] instanceof THREE.Geometry) {
            mapAll[ele].dispose();
        }else {
            mapAll[ele].forEach(function(ele1){
                ele1.dispose();
            })
        }
    }



    function waterCreate(position) {
        var water = new THREE.Water(mapAll.sea, {
            color: 0x880000,
            scale: 2,
            flowDirection: new THREE.Vector2(1,1),
            textureWidth: 1024,
            textureHeight: 1024,
        });
        water.__dirtyRotation = true;
        water.__dirtyPosition = true;
        water.rotation.x = -Math.PI / 2;
        water.position.set(position[0], 0, position[1]);
        mesh["water"] = water;
        scene.add(mesh.water);
        clearMaterial(water);
        mapAll.sea.dispose();
        
    }
    
    renderer.renderLists.dispose();
    
}

//键鼠控制
function control() {
    //shift
    if(keyNum[16] && !squat) {
        moveSpeedVal = moveSpeed * 2;
    }else if( !squat ){
        moveSpeedVal = moveSpeed;
    }else if( squat) {
        moveSpeedVal = moveSpeed / 2
    }
    if(camera.position.z < mapSize - worldSize / 2 - 1) {

    }
    
    camera.getWorldDirection(moveDirection);
    armsDirection.copy(moveDirection);
    // console.log(armsDirection);
    if(keyNum[87]) {//w
        // pointerControls.moveForward(0.5)
        camera.position.add(moveDirection.multiplyScalar(moveSpeedVal));
        vibration(2, 100);
    }else if(keyNum[83]) {//s
        camera.position.add(moveDirection.multiplyScalar(-moveSpeedVal));
        vibration(2, 100);
    }
    if(keyNum[65]) {//a
        var x = keyNum[83] ? -1 : 1;
        camera.position.add(moveDirection.cross(eY).multiplyScalar(-moveSpeedVal).multiplyScalar(x));
        vibration(2, 100);
    }else if(keyNum[68]) {//d
        var x = keyNum[83] ? -1 : 1;
        camera.position.add(moveDirection.cross(eY).multiplyScalar(moveSpeedVal).multiplyScalar(x));
        vibration(2, 100);
    }

    //space
    if(keyNum[32]) {
        if(jump) {
            jump = false;
            jumpSpeed = 2;
            jumpAcc = -0.1;
            // console.log(111)
        }
    }
    
    jumpCamY = getHeight(camera.position.x, camera.position.z);
    // if(camera.position.z < mapSize - worldSize / 2 - 1) {
    //     console.log(camera.position.y, jumpCamY + peopleHeight)
    // }
    // console.log(jumpCamY)
    if(!jump && camera.position.y < jumpCamY + peopleHeight) {
        jumpSpeed = 0;
        jump = true;
        camera.position.y = jumpCamY + peopleHeight;
        geoContainer.position.y = jumpCamY;
        squat = false;
        squatSwitch = true;
    }else if(!jump && camera.position.y >= jumpCamY + peopleHeight - 1){
        camera.position.y += jumpSpeed;
        geoContainer.position.y = camera.position.y - peopleHeight;
        jumpSpeed += jumpAcc;
    
    }

    //ctrl
    if(squatKey && squat) {
        squatSwitch = false;
        camera.position.y += squatSpeed;
        // geoContainer.position.y += squatSpeed;
        if(camera.position.y >= peopleHeight) {
            squatKey = false;
            camera.position.y = peopleHeight;
            // geoContainer.position.y = 0;
            squat = false;
            squatSwitch = true;
        }
    }else if(squatKey && !squat){
        squatSwitch = false;
        camera.position.y -= squatSpeed;
        // geoContainer.position.y -= squatSpeed;
        if(camera.position.y <= peopleHeight - 15) {
            squatKey = false;
            camera.position.y = peopleHeight - 15;
            // geoContainer.position.y = -15;;
            squat = true;
            squatSwitch = true;
        }
    }


    //更新武器的位置和角度
    if(arms) {
        armsDirection.normalize();
        armsY = armsDirection.dot(eY) * 15 ;
        // console.log(armsY)
        geoContainer.position.x = camera.position.x;
        // arms.position.y = armsY;
        geoContainer.position.y = camera.position.y - peopleHeight;
        geoContainer.position.z = camera.position.z; 
        geoContainer.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)
        arms.position.setY(armsY + peopleHeight - 10)
        // gunVibration(armsY);
    }

    //鼠标控制转向
    if(mouseLock) {
        // console.log('zhong', mouseLock);
        pointerControls.lock();
        if(!fullscreenElement) {
            mouseLock = false;
            pointerControls.unlock();
        }
    }
    nextStage();
}

//走动时振动
function vibration(A, w) {
    jumpCamY = getHeight(camera.position.x, camera.position.z);
    if(jump && !squatKey && !squat) {
        camera.position.setY(Math.sin(Date.now() / w) / A + jumpCamY + peopleHeight);
        geoContainer.position.y = 0;
    }else if(jump && !squatKey && squat) {
        camera.position.setY(Math.sin(Date.now() / w) / A + jumpCamY + peopleHeight - 15);
        geoContainer.position.y = -15;
    }
}
//武器自然振动
// function gunVibration(armsY) {
//     if(jump) {
//         arms.position.setY(Math.sin(Date.now() / 800) / 2 + armsY +  peopleHeight - 10);
//     }else {
        
//     }
// }


//走山路时的相机y值
function getHeight(x, z){
    if(!isMountain) {//camera.position.z >= mapSize - worldSize / 2 - 1
        return 0;
    }else if(isMountain) {
        var pA = mouPointPosition[Math.floor((x + worldSize / 2) / (worldSize / mapCuts) ) + ( Math.floor((z + worldSize / 2) / (mapSize / mapCuts)) * (mapCuts + 1) )],// j + i * (mapCuts + 1)
        pB = mouPointPosition[Math.ceil((x + worldSize / 2) / (worldSize / mapCuts) ) + ( Math.floor((z + worldSize / 2) / (mapSize / mapCuts)) * (mapCuts + 1) )],
        pC = mouPointPosition[Math.floor((x + worldSize / 2) / (worldSize / mapCuts) ) + ( (Math.ceil((z + worldSize / 2) / (mapSize / mapCuts))) * (mapCuts + 1) )],
        pD = mouPointPosition[Math.ceil((x + worldSize / 2) / (worldSize / mapCuts) ) + ( (Math.ceil((z + worldSize / 2) / (mapSize / mapCuts))) * (mapCuts + 1) )];
        var coorX = Math.abs(Math.abs(x) - Math.abs(pA.x)),
            coorZ = Math.abs(Math.abs(z * -1 - (worldSize / 2 - mapSize / 2) ) - Math.abs(pA.y)),
            uZ, vZ;
        if(coorZ / (mapSize / mapCuts) <  1 - coorX / (worldSize /mapCuts)) {
            uZ = pB.z - pA.z;
            vZ = pC.z - pA.z;
            return pA.z + coorX * uZ / (worldSize / mapCuts) + coorZ * vZ / (mapSize / mapCuts);
        }else {
            uZ = pC.z - pD.z;
            vZ = pB.z - pD.z;
            return pD.z + (worldSize / mapCuts - coorX) * uZ  / (worldSize / mapCuts) + (mapSize / mapCuts - coorZ) * vZ / (mapSize / mapCuts);
        }
    }

}

function getArmsHeight(camRot) {
    // return camRot.x
}


//障碍物生成
function obstacleCreate() {
    // console.log(111);
    // console.log(obstacle);
    mesh.obstacle = new Physijs.BoxMesh(obstacle[0][0], obstacle[0][1] ? obstacle[0][1][0] : new THREE.MeshPhongMaterial({color: 0xffffff}), 0);
    mesh.obstacle.position.set(0, -50, 0);
    mesh.obstacle.scale.set(120, 120, 120);
    // for(var i = 1; i < obstacle.length - 1; i++) {
    //     var child = new 
    // }
    scene.add(mesh.obstacle)
}

//武器切换
function armsSwitching() {

}


//后坐力
function recoil() {

}

function mmdControl() {
    if(mesh.wanghasang){
        var pos = new THREE.Vector3();
        camera.getWorldPosition(pos);
        var eyeMove = new THREE.Vector3();
        eyeMove.copy(pos)
        // console.log(pos);
        // pos.sub(mesh.wanghasang.skeleton.bones[70].getWorldPosition());
        // console.log(pos);
        // console.log(mesh.wanghasang.skeleton.bones[67].rotation.y)
        // rot = mesh.wanghasang.skeleton.bones[67].rotation.x;
        var dir = new THREE.Vector3(),
            whsPos = new THREE.Vector3(),
            posClone = new THREE.Vector3();
        posClone.copy(pos);
        mesh.wanghasang.getWorldDirection(dir);
        mesh.wanghasang.getWorldPosition(whsPos);
        
        if(posClone.sub(whsPos).dot(dir) > 0){
            mesh.wanghasang.skeleton.bones[67].lookAt(pos);
            // console.log(rot);
        }
        // mesh.wanghasang.skeleton.bones[12].lookAt(eyeMove.add(dir));
        // mesh.wanghasang.skeleton.bones[13].lookAt(eyeMove.add(dir));

        
    }
}

function cameraCons() {
    if(camera.position.x < camCons.xMin){
        camera.position.x = camCons.xMin;
    }
    if(camera.position.x > camCons.xMax){
        camera.position.x = camCons.xMax;
    }
    if(camera.position.z < camCons.zMin){
        camera.position.z = camCons.zMin;
    }
    if(camera.position.z > camCons.zMax){
        camera.position.z = camCons.zMax;
    }
}


function addFire(geom) {
    var fire = new THREE.Fire(geom,{
        diffuse:5.33,
        expansion:-0.25,
        debug:false
    });
    fire.position.y = 0;
    scene.add(fire);
    fire.addSource(1, 1, 1, 1, 0.0, 1);
}



function clearMaterial(mesh) {
    mesh.geometry.dispose();
    if(mesh.material instanceof Array){
        mesh.material.forEach(function(ele){
            ele.dispose();
        })
    }else {
        mesh.material.dispose();
    }
}


function sceneTraverse (obj, fn) {

    if (!obj) return

        fn(obj)

    if (obj.children && obj.children.length > 0) {
        obj.children.forEach(o => {
            sceneTraverse(o, fn)
        })
    }
}


function clearScene() {
    sceneTraverse(scene, o => {
        if (o.geometry) {
            o.geometry.dispose()					                 
        }
        if (o.material) {
            if (o.material.length) {
                for (var i = 0; i < o.material.length; ++i) {
                    if(o.material[i].map){
                        o.material[i].map.dispose();
                    }
                    if(o.material[i].roughnessMap){
                        o.material[i].roughnessMap.dispose();
                    }
                    if(o.material[i].normalMap){
                        o.material[i].normalMap.dispose();
                    }
                    if(o.material[i].emissiveMap){
                        o.material[i].emissiveMap.dispose();
                    }
                    o.material[i].dispose()							
                }
            }
            else {
                if(o.material.map){
                    o.material.map.dispose();
                }
                if(o.material.roughnessMap){
                    o.material.roughnessMap.dispose();
                }
                if(o.material.normaMap){
                    o.material.normaMap.dispose();
                }
                if(o.material.emissiveMap){
                    o.material.emissiveMap.dispose();
                }

                o.material.dispose()						
            }
        }
    })	
    for(var i in mesh) {
        if(i != "push") {
            scene.remove(mesh[i]);
            delete mesh[i];
        }
    }
    for(var i in mmdAnimation) {
        delete mmdAnimation[i];
    }
    for(var i in physicsHelper) {
        delete physicsHelper[i];
    }
    for(var i in ikHelper) {
        delete ikHelper[i];
    }
    mmdModelSpeed = {};
    renderer && renderer.renderLists.dispose()
    renderer && renderer.dispose() 
    // stopRender()
    scene.dispose();
    renderKey = false;
            // remove event listeners
    // renderer.domElement.parentElement.removeChild(renderer.domElement)			
    // console.log(renderer.info);
    intersect = null;
    // scene = null
    // camera = null
    // renderer = null  
}


function dialog(log, logNum){
    // var reg = /\[[\d\D\]*]/g;
    var reg = /\s/,
        newArr = dialogCtt[log][logNum].split(reg),
        timer,
        i = 0;
    dialogDiv.style.display = "block";
    if(newArr.length == 1){
        dianame.style.display = "none";
        // console.log(newArr[0].length)
        typing(newArr[0]);
    }else {
        dianame.innerText = newArr[0];
        dianame.style.display = "inline";
        typing(newArr[1]);
        dialogCon.style.display = "block";
    }

    function typing(str) {
        timer = setTimeout(function(){
            if(i <= str.length){
                dialogCon.innerText = str.slice(0, i);
                i++;
                typing(str);    
            }else {
                clearTimeout(timer);
                i = 0;
                dialogKey = false;
                return;
            }
            
        }, 50);
    }
    // dialogCtt[log][logNum].slice(0, i++);
}


function ray() {
    if(rayTarget) {
        raycaster.setFromCamera(rayMouse, camera);
        intersect = raycaster.intersectObjects(rayTarget);
        // intersect = 
        // raycaster.far = 500;
    }
    
}

function tips(target, str, callback) {
    if(tip && tipKey) {
        if(target) {
            tip.innerText = str;
            // tip.style.display = "block";
            tip.className = "alert-tips";
            if(keyNum[69]){
                tip.className = "close-tips";
                dialogKey3 = true;
                tipKey = false;
                callback ? callback() : "";
                return;
            }
        }else if(str && tip.className == "alert-tips"){
            tip.className = "close-tips";
            return;
        }
    }
    
}

function nextStage() {
    if(stageNum == 0) {
        if(camera.position.z >= mapSize / 2 - 10 && camera.position.x <= -25 && camera.position.x >= -85) {
            clearScene();
            stageNum++;
            creatScene();
            // scene.add(pointLight);
            // scene.add(ambientLight);
            mapCreate("battlefield");
            // scene.add(geoContainer)
            eve++;
            raycaster.far = 1000;
            rayTarget = scene.children;
            // auLoader.load("./src/bgm/Estampie - Sine Nomine.mp3", function(buffer){
            //     bgm.stop();
            //     bgm.setBuffer(buffer);
            //     bgm.play();
            // })
        }
    }else if( stageNum == 1 ) {
        if(camera.position.z >= mapSize / 4 - 10 && camera.position.x <= -25 && camera.position.x >= -85) {
            clearScene();
            stageNum++;
            creatScene();
            mapCreate("grassland2");
            eve++;
            raycaster.far = 200;
            rayTarget = scene.children;
            // auLoader.load("./src/bgm/Eluveitie - Hope.mp3", function(buffer){
            //     bgm.stop();
            //     bgm.setBuffer(buffer);
            //     bgm.play();
            // })
        }
    }else if (stageNum == 2) {
        if(camera.position.x <= -mapSize / 2 + 10 && camera.position.z <= 640 && camera.position.z >= 580) {
            clearScene();
            stageNum++;
            creatScene();
            mapCreate("skull");
            eve++;
            raycaster.far = 200;
            rayTarget = scene.children;
            // auLoader.load("./src/bgm/川井憲次 - 因果流転.flac", function(buffer){
            //     bgm.stop();
            //     bgm.setBuffer(buffer);
            //     bgm.play();
            // })


            //王哈桑语音
            // auLoader.load("./src/bgm/wanghasang.mp3", function(buffer){
            //     soundHS.setBuffer(buffer);
            // })
        }
    }else if (stageNum == 3) {
        if(camera.position.z >= mapSize / 4 - 10 && camera.position.x <= -25 && camera.position.x >= -85) {
            clearScene();
            stageNum++;
            creatScene();
            mapCreate("mountain");
            eve++;
            raycaster.far = 200;
            rayTarget = scene.children;
            // auLoader.load("./src/bgm/Tartalo Music - Haelorian Athe.mp3", function(buffer){
            //     bgm.stop();
            //     bgm.setBuffer(buffer);
            //     bgm.play();
            // })
        }
    }
}


function creatScene() {
    // scene = new Physijs.Scene();
    // scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
    // scene.addEventListener(
        // 'update',
        // function() {
            // scene.simulate( undefined, 1 );
        // }
    // );
    
    // camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, peopleHeight, 0);

    // renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.clearColor = 0x000000;
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.BasicShadowMap;
    // document.getElementById("container").appendChild(renderer.domElement);
    // pointerControls = new THREE.PointerLockControls(camera, renderer.domElement);  
    // animate();
    renderKey = true;
    // scene.simulate();
}



function bgmBegin() {
    bgm.play();
}

