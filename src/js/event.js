var event = {
    0: function() {
        if(intersect[0] && intersect[0].object == mesh.chicken) {
            intersect[0].object.material.emissive.r = 1;
            emissiveKey.chicken = true;
        }else {
            mesh.chicken.material.emissive.r = 0;
            emissiveKey.chicken = false;
        }
        tips(mesh.chicken.material.emissive.r, "按E进行窃听")
    },
    2: function() {
        if(intersect[0] && intersect[0].object.isEnemy) {
            if(shoot && intersect[0].object != mesh.gold && shootKey2) {
                shootKey2 = false;
                intersect[0].object.alive = false;
            }
        }
        if(intersect[0] && enemy.length == 0) {
            if(intersect[0].object == mesh.gold) {
                intersect[0].object.material.emissive.r = 1;
                
            }else if(mesh.gold) {
                mesh.gold.material.emissive.r = 0;
            }
            if(mesh.gold) {
                tips(mesh.gold.material.emissive, "按E拾起", function(){
                    mesh.gold.geometry.dispose();
                    mesh.gold.material.dispose();
                    scene.remove(mesh.gold);
                    delete mesh.gold;
                })
            }
        }
        
        // console.log([], enemy)
        // worker.postMessage([camera.position, enemy]);
        // worker.onmessage = function(e) {
        //     // console.log(e.data);
        //     enemy.forEach(function(ele, index){
        //         ele.position = e.data[index].position;
        //     })

        if(mesh.gold && mesh.gold.position.y > 5) {
            mesh.gold.position.y += mesh.gold.speed;
            mesh.gold.speed += mesh.gold.acc;
        }
        enemy.forEach(function(ele, index){
            if(!ele.alive) {
                if(ele.hasGold) {
                    var goldGeo = new THREE.DodecahedronGeometry(5),
                        goldMaterial = new THREE.MeshPhysicalMaterial({color: 0xffcc33});
                    mesh.gold = new THREE.Mesh(goldGeo, goldMaterial);
                    mesh.gold.position.set(ele.position.x, 25, ele.position.z);
                    mesh.gold.speed = 5;
                    mesh.gold.acc = -0.2;
                    scene.add(mesh.gold);
                    goldGeo.dispose();
                    goldMaterial.dispose();

                }
                ele.geometry.dispose();
                // ele.material
                scene.remove(ele);
                enemy.splice(index, 1);
                return;
            }

            var position = ele.position.clone(),
                position2 = position.clone();
            // console.log(position2.distanceTo(camera.position));
            if(position2.distanceTo(camera.position) <= 40 && parseInt(hp.style.width) >= 10) {
                hp.style.width = parseInt(hp.style.width) - 1 + "px";
                if(parseInt(hp.style.width) <= 300) {
                    hp.style.background = "rgba(250,90,90,0.5)"
                }
            }
            // console.log(position );
            position.multiplyScalar(-1).add(camera.position).normalize().multiplyScalar(ele.speed * 2);
            ele.position.add(position);
            ele.position.setY(Math.sin(Date.now() / 2) / 100);
            // ele.position.y = 10;
        })
        // }

    },
    4: function() {
        if(intersect[0] && mesh.aqua && intersect[0].object == mesh.aqua) {
            selectAqua = true;
        }else if( intersect[0]){
            selectAqua = false;
        }
        if(mesh.aqua) {
            tips(selectAqua, "按E进行对话");
        }
    },
    5: function() {
        if(mesh.aqua && mesh.aqua.position.z > -mapSize / 4 + 50) {
            mesh.aqua.rotation.y = Math.PI;
            var position = mesh.aqua.position.clone();
            position.multiplyScalar(-1).add(camera.position).normalize();//.multiplyScalar(3);
            mesh.aqua.position.add(position);
            mesh.aqua.position.y = 0;
            
        }else if(mesh.aqua){
            mesh.aqua.position.z--;
            if(mesh.aqua.position.z < -mapSize / 4) {
                mesh.aqua.position.y--;
            }
            if(mesh.aqua.position.y <= -200) {
                if(mesh.aqua) {
                    helper.aqua.enable("animation", false);
                    helper.aqua.remove(mesh.aqua);
                    delete helper.aqua;
                    clearMaterial(mesh.aqua);
                    scene.remove(mesh.aqua);
                    delete mesh.aqua;
                }
                
            }
        }else {
            if(mesh.water.material.uniforms.color.value.g < 1) {
                if( mesh.water.material.uniforms.color.value.b < 1) {
                    mesh.water.material.uniforms.color.value.b += 0.01;
                }else if(mesh.water.material.uniforms.color.value.r < 1){
                    mesh.water.material.uniforms.color.value.r += 0.01;
                }else {
                    mesh.water.material.uniforms.color.value.g += 0.01;
                }
                
            }else {
                dialogKey3 = true;
            } 
        }
        
    },
    6: function() {
        if(intersect[0] && mesh.villageE && intersect[0].object == mesh.villageE) {
            selectVill = true;
        }else if( intersect[0]){
            selectVill = false;
        }
        if(mesh.villageE) {
            tips(selectVill, "按E进行对话");
        }
    },
    8: function() {
        if(intersect[0] && mesh.wanghasang && intersect[0].object == mesh.wanghasang) {
            selectHS = true;
        }else if( intersect[0]){
            selectHS = false;
        }
        if(mesh.wanghasang) {
            tips(selectHS, "按E进行对话");
        }
    }

}


var mmdAnimate = {
    2: {
        2: function() {
            helper.villageA.enable("animation", true);
        },
        3: function() {
            helper.villageA.enable("animation", false);
            helper.villageA.remove(mesh.villageA);
            delete helper.villageA;
            helper.villageB.enable("animation", true);
        },
        4:  function() {
            helper.villageB.enable("animation", false);
            helper.villageB.remove(mesh.villageB);
            delete helper.villageB;
            helper.villageC.enable("animation", true);
        },
        5:  function() {
            helper.villageC.enable("animation", false);
            helper.villageC.remove(mesh.villageC);
            delete helper.villageC;
            helper.villageD.enable("animation", true);
        },
        6: function() {
            helper.villageD.enable("animation", false);
            helper.villageD.remove(mesh.villageD);
        },
        9: function(){
            mmdModelLoad("vmd", null, file.villageD2, null, "villageD", null, "villageD", null, mesh.villageD, 1, null, null, null, function(){
                helper.villageD.add(mesh.villageD, {
                    animation: mmdAnimation["villageD"],
                    physics: false
                });
                helper.villageD.enable("animation", true);
            }, null, 200);
        },
        10: function() {
            helper.villageD.enable("animation", false);
            helper.villageD.remove(mesh.villageD);
            delete helper.villageD;
        }


    },
    4: {
        9: function() {
            helper.aqua.enable("animation", false);
            helper.aqua.remove(mesh.aqua);
            mmdModelLoad("vmd", null, file.aqua.vmd.walk, null, "aqua", null, "aqua", null, mesh.aqua, 1, null, null, null, function(){
                helper.aqua.add(mesh.aqua, {
                    animation: mmdAnimation["aqua"],
                    physics: false
                });
                helper.aqua.enable("animation", true);
            }, null, 1);
        }
    },
    6: {
        4: function() {
            helper.villageE.enable("animation", true);
        },
        6: function() {
            helper.villageE.enable("animation", false);
            helper.villageE.remove(mesh.villageE);
            delete helper.villageE;
        }
    }

}