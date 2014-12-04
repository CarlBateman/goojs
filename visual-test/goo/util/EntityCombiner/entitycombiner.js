require([
	'lib/V',
	'goo/renderer/Material',
	'goo/renderer/shaders/ShaderLib',
	'goo/shapes/Box',
	'goo/math/Vector3',
	'goo/util/combine/EntityCombiner'
], function (
	V,
	Material,
	ShaderLib,
	Box,
	Vector3,
	EntityCombiner
) {
	'use strict';

	V.describe('4000 boxes spinning in an entity hierarchy. Leaf boxes have static set to true.\nPress 1 to combine and 2 to uncombine');

	var goo = V.initGoo({
		showStats: true
	});
	var world = goo.world;
	V.addOrbitCamera(new Vector3(40, Math.PI / 3, Math.PI / 5));
	V.addLights();

	var material1 = new Material(ShaderLib.uber);
	var material2 = new Material(ShaderLib.uber);
	material2.uniforms.materialDiffuse = [1.0, 0.0, 0.0, 1.0];

	function createBoxGrid(pos, numBoxes, size, separation) {
		var parentEntity = world.createEntity(pos).addToWorld();
		var box = new Box(size, size, size);
		for (var i = 0; i < numBoxes; i++) {
			for (var j = 0; j < numBoxes; j++) {
				for (var k = 0; k < numBoxes; k++) {
					var position = [size * (i - numBoxes / 2) * separation, size * (j - numBoxes / 2) * separation, size * (k - numBoxes / 2) * separation];
					var material = Math.random() < 0.5 ? material1 : material2;
					var entity = world.createEntity(position, box, material).addToWorld();
					entity.static = true;
					parentEntity.attachChild(entity);
				}
			}
		}
		parentEntity.set(function (entity) {
			entity.setRotation(0, world.time, 0);
		});
		return parentEntity;
	}

	var rootEntity = world.createEntity().addToWorld();
	rootEntity.set(function (entity) {
		entity.setRotation(0, world.time, 0);
	});
	rootEntity.attachChild(createBoxGrid([-5, 0, 5], 10, 0.5, 1.5));
	rootEntity.attachChild(createBoxGrid([5, 0, 5], 10, 0.5, 1.5));
	rootEntity.attachChild(createBoxGrid([-5, 0, -5], 10, 0.5, 1.5));
	rootEntity.attachChild(createBoxGrid([5, 0, -5], 10, 0.5, 1.5));

	var entityCombiner = new EntityCombiner(world, 1, false);

	// console.profile('combine');
	// entityCombiner.combine();
	// console.profileEnd('combine');

	document.addEventListener('keydown', function (evt) {
		switch (evt.keyCode) {
			case 49: // 1
				// console.time('combine');
				console.profile('combine');
				entityCombiner.combine();
				console.profileEnd('combine');
				// console.timeEnd('combine');
				break;
			case 50: // 2
				entityCombiner.uncombine();
				break;
			default:
				break;
		}
	}, false);

});
