require([
	'goo/renderer/Material',
	'goo/renderer/shaders/ShaderLib',
	'goo/renderer/Camera',
	'goo/shapes/Sphere',
	'goo/entities/components/CameraComponent',
	'goo/scripts/OrbitCamControlScript',
	'goo/entities/components/ScriptComponent',
	'goo/math/Vector3',
	'goo/entities/components/CameraDebugComponent',
	'goo/entities/SystemBus',
	'../../lib/V'
], function (
	Material,
	ShaderLib,
	Camera,
	Sphere,
	CameraComponent,
	OrbitCamControlScript,
	ScriptComponent,
	Vector3,
	CameraDebugComponent,
	SystemBus,
	V
	) {
	'use strict';

	var cameraState = {
		spin: true,
		angle: 0,
		mainCameraId: 1
	};

	function setMainCamera(id, cameraEntities) {
		var mainCamera = cameraEntities[id].getComponent('CameraComponent').camera;
		SystemBus.emit('goo.setCurrentCamera', {
			camera: mainCamera,
			entity: cameraEntities[id]
		});
	}

	function frustumViewerDemo() {
		// add spheres to have the cameras view them
		V.addColoredSpheres();

		// add light
		V.addLights();

		document.body.addEventListener('keypress', function(e) {
			switch(e.keyCode) {
				case 49:
					if (cameraState.mainCameraId === 1) {
						setMainCamera(0, [camera1Entity, camera2Entity]);
						cameraState.mainCameraId = 0;
					}
					break;
				case 50:
					if (cameraState.mainCameraId === 0) {
						setMainCamera(1, [camera1Entity, camera2Entity]);
						cameraState.mainCameraId = 1;
					}
					break;
				case 51:
					cameraState.spin = !cameraState.spin;
					break;
				case 52:
					if (camera1Entity.hasComponent('CameraDebugComponent')) {
						camera1Entity.clearComponent('CameraDebugComponent');
					} else {
						camera1Entity.set(new CameraDebugComponent());
					}
					break;
				default:
					console.log('Keys 1, 2 switch main camera\nkey 3 starts/stops the spinning of camera 1\nkey 4 adds/removes camera debug component on camera 1');
			}
		});

		// camera 1 - spinning
		var camera1Entity = world.createEntity(new Camera(), [0, 0, 3]).lookAt(new Vector3(0, 0, 0)).addToWorld();

		camera1Entity.set(new ScriptComponent({
			run: function (entity) {
				if (cameraState.spin) {
					cameraState.angle += 0.01;
					entity.setRotation([cameraState.angle, 0, 0]);
				}
			}
		}));

		// camera 2 - with orbit cam control script
		var camera2Entity = world.createEntity(new Camera(), [0, 0, 3]).lookAt(new Vector3(0, 0, 0)).addToWorld();

		var scripts = new ScriptComponent();
		scripts.scripts.push(new OrbitCamControlScript({
			domElement: goo.renderer.domElement,
			spherical: new Vector3(25, Math.PI / 4, 0)
		}));
		camera2Entity.set(scripts);

		// attach camera debug components
		camera1Entity.set(new CameraDebugComponent());
		camera2Entity.set(new CameraDebugComponent());
	}

	var goo = V.initGoo();
	var world = goo.world;

	frustumViewerDemo();
});
