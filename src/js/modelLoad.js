//obj模型加载器
function modelsLoader(src,texture, mtl, meshColor,position, rotation, scale, name, isArms, isObs,callback, isEnemy) {    
    if(texture) {
        var meshTexture = new THREE.TextureLoader().load(texture, function(text) {
            loader(text)
            text.dispose();
        })
    }else if(mtl){
        loader(null, true)
    }else {
        loader()
    }

    function loader(text, isMtl) {
        if(isMtl){
            var mtlLoader = new THREE.MTLLoader().load(mtl, function(te){
                var objLoader = new THREE.OBJLoader()
                objLoader.setMaterials( te );
                objLoader.load(src, function(m) {
                    if(name == 'treeLeaf'){
                        var geoTree = m.children[0].geometry,
                            matTree = m.children[1].material,
                            meshTree;
                        geoTree.scale(5, 5, 5);

                        var newTree, treeArray = [],
                            x, z;
                        for(var i = 0; i < treeNum; i++) {
                            // if(newTree) {
                            //     newTree.dispose();
                            // }
                            newTree = geoTree.clone();
                            x = (Math.random() - 0.5) * (worldSize - mapSize) / 2;
                            z = (Math.random() - 0.5) * mapSize / 2;
                            newTree.translate(x, 0, z);
                            treeArray.push(newTree);
                            newTree.dispose()
                        }

                        geoTree.dispose();
                        // console.log(THREE.BufferGeometryUtils)
                        geoTree = THREE.BufferGeometryUtils.mergeBufferGeometries(treeArray)
                        meshTree = new THREE.Mesh(geoTree, matTree);
                        meshTree.position.x += mapSize / 2;
                        scene.add(meshTree);
                        
                    } else{
                        load(m);
                    }


                });
            })
        }else{
            var objLoader = new THREE.OBJLoader().load(src, function(m) {
                load(m);
            });
        }
        function load(m) {
            // console.log(isObs);
            if(isObs){
                if(m instanceof THREE.Mesh){
                    mesh[name] = m
                }else {
                    mesh[name] = m.children[0];
                }
                mesh[name].rotation.z += rotation[2];
                mesh[name].rotation.x += rotation[0];
                mesh[name].rotation.y += rotation[1];
                mesh[name].position.set(position[0], position[1], position[2]);
                mesh[name].scale.set(scale[0], scale[1], scale[2]);
                scene.add(mesh[name]);
                // obstacle.push([m.children[0].children[0].geometry, m.children[0].children[0].material]);
                // callback ? callback() : "";
                return;
            }

            if(isEnemy) {
                mesh[name] = m.children[0];
            }else {
                mesh[name] = m;
            }
            mesh[name].rotation.z += rotation[2];
            mesh[name].rotation.x += rotation[0];
            mesh[name].rotation.y += rotation[1];
            mesh[name].position.set(position[0], position[1], position[2]);
            mesh[name].scale.set(scale[0], scale[1], scale[2]);
            
            mesh[name].traverse(function(n) {
                if(n instanceof THREE.Mesh) {
                    n.material = new THREE.MeshPhysicalMaterial({
                        color: meshColor,
                        map: text ? text : "", 
                    })
                    n.material.dispose();
                }
            })
            if(isEnemy) {
                mesh[name].isEnemy = true;
                mesh[name].speed = Math.random();
                mesh[name].alive = true;
                if(name == "enemy3") {
                    mesh[name].hasGold = true;
                }
                enemy.push(mesh[name]);
            }
            scene.add(mesh[name]);
            if(isArms){
                geoContainer.add(mesh[name]);
                armsArr.push(mesh[name])
            }
            if(!arms) {//如果手里没武器，就把这个模型扔给arms
                arms = mesh[name];
            }

            // callback();
            
        }
        
    }
}

//文字加载
function textLoader(words, textColor, name, position, rotation, te, nor, rou, emi, repeatNum) {

    var texture = new THREE.TextureLoader().load(te, function(text){
        text.wrapS = text.wrapT = THREE.RepeatWrapping;
        text.repeat.x = text.repeat.y = repeatNum;
    });
    var normal = new THREE.TextureLoader().load(nor, function(text){
        text.wrapS = text.wrapT = THREE.RepeatWrapping;
        text.repeat.x = text.repeat.y = repeatNum;
    });
    var roughness = rou ? new THREE.TextureLoader().load(rou, function(text){
        text.wrapS = text.wrapT = THREE.RepeatWrapping;
        text.repeat.x = text.repeat.y = repeatNum;
    }) : false;
    var emissive =  emi ? new THREE.TextureLoader().load(emi, function(text){
        text.wrapS = text.wrapT = THREE.RepeatWrapping;
        text.repeat.x = text.repeat.y = repeatNum;
    }) : false;
    loader(texture, normal, roughness, emissive);
    texture.dispose();
    normal.dispose();
    roughness ? roughness.dispose(): "";
    emissive ? emissive.dispose(): "";

    function loader(text, nor, rou, emi) {
        var meshLoader = new THREE.FontLoader();
        meshLoader.load(file.font, function ( font ) { 
            var textGeo = new THREE.TextGeometry(words, {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 5,
                bevelSize: 2,
                bevelOffset: 0,
                bevelSegments: 5
            } ),
            textMater = new THREE.MeshPhysicalMaterial({
                color: textColor,
                map: text, 
                normalMap: nor,
                roughness: 1,
                roughnessMap: rou ? rou : "",
                reflectivity: 1,
                metalness: 0.8,
                emissiveMap: emi ? emi : "",
                // wireframe: true,
            });
            mesh[name] = new THREE.Mesh(textGeo, textMater);
            mesh[name].position.x = position[0];
            mesh[name].position.y = position[1];
            mesh[name].position.z = position[2];
            mesh[name].rotation.x = rotation[0];
            mesh[name].rotation.y = rotation[1];
            mesh[name].rotation.z = rotation[2];
            scene.add(mesh[name]);
            textGeo.dispose();
            textMater.dispose();
        } );
    }
    
}


//mmd加载器
function mmdModelLoad(type, modelfile, vmdfile, vpdfile, helperName, meshName,vmdName, vpdName, mmdMesh, speed, position, rotation, scale, callback, color, duration){
    if(type == 'mesh') {
        helper[helperName] = new THREE.MMDAnimationHelper({
            afterGlow: 2.0
        })

        loader.loadWithAnimation(modelfile, vmdfile, function(mmd){
            mesh[meshName] = mmd.mesh;
            mmdAnimation[vmdName] = mmd.animation;
            if(color) {
                mesh[meshName].material[0].color.r = color[0];
                mesh[meshName].material[0].color.g = color[1];
                mesh[meshName].material[0].color.b = color[2];
            }
            mmdModelSpeed[meshName] = speed;
            mesh[meshName].position.set(position[0], position[1], position[2]);
            mesh[meshName].rotation.set(rotation[0], rotation[1], rotation[2]);
            mesh[meshName].scale.set(scale[0], scale[1], scale[2]);
            scene.add(mesh[meshName]);
            setTimeout(function(){
                helper[helperName].add(mesh[meshName], {
                    animation: mmdAnimation[vmdName],
                    physics: true
                })
                ikHelper[helperName] = helper[helperName].objects.get(mesh[meshName]).ikSolver.createHelper();
                ikHelper[helperName].visible = false;
                scene.add(ikHelper[helperName]);
                helper[helperName].enable('ik', true);
                physicsHelper[helperName] = helper[helperName].objects.get( mesh[meshName] ).physics.createHelper();
                physicsHelper[helperName].visible = false;
                scene.add( physicsHelper[helperName] );
                helper[helperName].enable( 'physics', false);
                helper[helperName].enable( 'animation', false);
                mmdAnimation[vmdName].duration = duration;
                callback ? callback(): "";
            }, 1000)
            
        })

       
    }else if(type == 'vpd') {
        loader.loadVPD(vpdfile, false, function(vpd){
            mmdVpd[vpdName] = vpd;
            callback ? callback(): "";
        })
    }else if(type == 'vmd') {
        loader.loadAnimation(vmdfile, mmdMesh, function(vmd){
            mmdAnimation[vmdName] = vmd;
            mmdAnimation[vmdName].duration = duration;
            callback ? callback(): "";
        })
    }else if(type == "pmd") {
        loader.load(modelfile, function(model){
            mesh[meshName] = model;
            if(color){
                var newMaterial = new THREE.MeshPhongMaterial({
                    color: color
                })
                if(mesh[meshName].material instanceof Array) {
                    mesh[meshName].material.forEach(function(ele){
                        ele.dispose();
                    })
                }else {
                    mesh[meshName].material.dispose();
                }
                // console.log(mesh[meshName].material);
                mesh[meshName].material = newMaterial;
                newMaterial.dispose();
            }
            scene.add(model);
        })
    }
}
