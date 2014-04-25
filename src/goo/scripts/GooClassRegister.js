define([
	'goo/scripts/Scripts',
	'goo/addons/ammo/AmmoComponent',
	'goo/addons/ammo/AmmoSystem',
	'goo/addons/box2d/components/Box2DComponent',
	'goo/addons/box2d/systems/Box2DSystem',
	'goo/addons/cannon/CannonBoxColliderComponent',
	'goo/addons/cannon/CannonDistanceJointComponent',
	'goo/addons/cannon/CannonPlaneColliderComponent',
	'goo/addons/cannon/CannonRigidbodyComponent',
	'goo/addons/cannon/CannonSphereColliderComponent',
	'goo/addons/cannon/CannonSystem',
	'goo/addons/p2/P2Component',
	'goo/addons/p2/P2System',
	'goo/addons/scripts/PolyBoundingScript',
	'goo/addons/terrain/Forrest',
	'goo/addons/terrain/Terrain',
	'goo/addons/terrain/TerrainHandler',
	'goo/addons/terrain/Vegetation',
	'goo/addons/water/FlatWaterRenderer',
	'goo/addons/water/ProjectedGridWaterRenderer',
	'goo/animation/Joint',
	'goo/animation/Skeleton',
	'goo/animation/SkeletonPose',
	'goo/animation/blendtree/BinaryLERPSource',
	'goo/animation/blendtree/ClipSource',
	'goo/animation/blendtree/FrozenClipSource',
	'goo/animation/blendtree/ManagedTransformSource',
	'goo/animation/clip/AbstractAnimationChannel',
	'goo/animation/clip/AnimationClip',
	'goo/animation/clip/AnimationClipInstance',
	'goo/animation/clip/InterpolatedFloatChannel',
	'goo/animation/clip/JointChannel',
	'goo/animation/clip/JointData',
	'goo/animation/clip/TransformChannel',
	'goo/animation/clip/TransformData',
	'goo/animation/clip/TriggerChannel',
	'goo/animation/clip/TriggerData',
	'goo/animation/layer/AnimationLayer',
	'goo/animation/layer/LayerLERPBlender',
	'goo/animation/state/AbstractState',
	'goo/animation/state/AbstractTransitionState',
	'goo/animation/state/FadeTransitionState',
	'goo/animation/state/FrozenTransitionState',
	'goo/animation/state/SteadyState',
	'goo/animation/state/SyncFadeTransitionState',
	'goo/debug/BoundingVolumeMeshBuilder',
	'goo/debug/DebugDrawHelper',
	'goo/debug/Debugger',
	'goo/debug/EntityCounter',
	'goo/debug/FrustumViewer',
	'goo/debug/LightPointer',
	'goo/entities/Entity',
	'goo/entities/EntitySelection',
	'goo/entities/EntityUtils',
	'goo/entities/Selection',
	'goo/entities/SystemBus',
	'goo/entities/World',
	'goo/entities/components/AnimationComponent',
	'goo/entities/components/CSSTransformComponent',
	'goo/entities/components/CameraComponent',
	'goo/entities/components/CameraDebugComponent',
	'goo/entities/components/Component',
	'goo/entities/components/HtmlComponent',
	'goo/entities/components/LightComponent',
	'goo/entities/components/LightDebugComponent',
	'goo/entities/components/MeshDataComponent',
	'goo/entities/components/MeshRendererComponent',
	'goo/entities/components/MovementComponent',
	'goo/entities/components/ParticleComponent',
	'goo/entities/components/PortalComponent',
	'goo/entities/components/ProximityComponent',
	'goo/entities/components/ScriptComponent',
	'goo/entities/components/SoundComponent',
	'goo/entities/components/TextComponent',
	'goo/entities/components/TransformComponent',
	'goo/entities/managers/EntityManager',
	'goo/entities/managers/Manager',
	'goo/entities/systems/AnimationSystem',
	'goo/entities/systems/BoundingUpdateSystem',
	'goo/entities/systems/CSSTransformSystem',
	'goo/entities/systems/CameraDebugSystem',
	'goo/entities/systems/CameraSystem',
	'goo/entities/systems/DebugRenderSystem',
	'goo/entities/systems/GizmoRenderSystem',
	'goo/entities/systems/GridRenderSystem',
	'goo/entities/systems/HtmlSystem',
	'goo/entities/systems/LightDebugSystem',
	'goo/entities/systems/LightingSystem',
	'goo/entities/systems/MovementSystem',
	'goo/entities/systems/ParticlesSystem',
	'goo/entities/systems/PickingSystem',
	'goo/entities/systems/PortalSystem',
	'goo/entities/systems/ProximitySystem',
	'goo/entities/systems/RenderSystem',
	'goo/entities/systems/SoundSystem',
	'goo/entities/systems/System',
	'goo/entities/systems/TextSystem',
	'goo/entities/systems/TransformSystem',
	'goo/loaders/DynamicLoader',
	'goo/math/MathUtils',
	'goo/math/Matrix',
	'goo/math/Matrix2x2',
	'goo/math/Matrix3x3',
	'goo/math/Matrix4x4',
	'goo/math/Plane',
	'goo/math/Quaternion',
	'goo/math/Ray',
	'goo/math/Transform',
	'goo/math/Vector',
	'goo/math/Vector2',
	'goo/math/Vector3',
	'goo/math/Vector4',
	'goo/noise/Noise',
	'goo/noise/ValueNoise',
	'goo/particles/Particle',
	'goo/particles/ParticleEmitter',
	'goo/particles/ParticleInfluence',
	'goo/particles/ParticleLib',
	'goo/particles/ParticleUtils',
	'goo/picking/BoundingTree',
	'goo/picking/PrimitivePickLogic',
	'goo/renderer/BufferData',
	'goo/renderer/BufferUtils',
	'goo/renderer/Camera',
	'goo/renderer/Material',
	'goo/renderer/MeshData',
	'goo/renderer/RenderQueue',
	'goo/renderer/Renderer',
	'goo/renderer/RendererRecord',
	'goo/renderer/Shader',
	'goo/renderer/ShaderCall',
	'goo/renderer/SimplePartitioner',
	'goo/renderer/Texture',
	'goo/renderer/TextureCreator',
	'goo/renderer/Util',
	'goo/renderer/bounds/BoundingBox',
	'goo/renderer/bounds/BoundingSphere',
	'goo/renderer/bounds/BoundingVolume',
	'goo/renderer/light/DirectionalLight',
	'goo/renderer/light/Light',
	'goo/renderer/light/PointLight',
	'goo/renderer/light/SpotLight',
	'goo/renderer/pass/BloomPass',
	'goo/renderer/pass/BlurPass',
	'goo/renderer/pass/Composer',
	'goo/renderer/pass/DOFPass',
	'goo/renderer/pass/DepthPass',
	'goo/renderer/pass/DoGPass',
	'goo/renderer/pass/FullscreenPass',
	'goo/renderer/pass/FullscreenUtil',
	'goo/renderer/pass/MotionBlurPass',
	'goo/renderer/pass/NesPass',
	'goo/renderer/pass/PassLib',
	'goo/renderer/pass/RenderPass',
	'goo/renderer/pass/RenderTarget',
	'goo/renderer/pass/SSAOPass',
	'goo/renderer/shaders/ShaderBuilder',
	'goo/renderer/shaders/ShaderFragment',
	'goo/renderer/shaders/ShaderLib',
	'goo/renderer/shadow/ShadowHandler',
	'goo/scripts/BasicControlScript',
	'goo/scripts/FPCamControlScript',
	'goo/scripts/FlyControlScript',
	'goo/scripts/GroundBoundMovementScript',
	'goo/scripts/HeightMapBoundingScript',
	'goo/scripts/RotationControlScript',
	'goo/scripts/ScriptUtils',
	'goo/scripts/SparseHeightMapBoundingScript',
	'goo/scripts/SplineInterpolator',
	'goo/scripts/WorldFittedTerrainScript',
	'goo/scripts/newwave/FPCamControlScript',
	'goo/scripts/newwave/FlyControlScript',
	'goo/scripts/newwave/MouseLookScript',
	'goo/scripts/newwave/OrbitCamControlScript',
	'goo/scripts/newwave/OrbitNPanControlScript',
	'goo/scripts/newwave/PanCamScript',
	'goo/scripts/newwave/PickAndRotateScript',
	'goo/scripts/newwave/RotationScript',
	'goo/scripts/newwave/WASDScript',
	'goo/shapes/Box',
	'goo/shapes/Cone',
	'goo/shapes/Cylinder',
	'goo/shapes/Disk',
	'goo/shapes/Grid',
	'goo/shapes/ProjectedGrid',
	'goo/shapes/Quad',
	'goo/shapes/ShapeCreator',
	'goo/shapes/SimpleBox',
	'goo/shapes/Sphere',
	'goo/shapes/TerrainSurface',
	'goo/shapes/TextureGrid',
	'goo/shapes/Torus',
	'goo/shapes/debug/CameraDebug',
	'goo/shapes/debug/LightDebug',
	'goo/shapes/debug/MeshRendererDebug',
	'goo/shapes/debug/SkeletonDebug',
	'goo/sound/AudioContext',
	'goo/sound/OscillatorSound',
	'goo/sound/Sound',
	'goo/util/Ajax',
	'goo/util/ArrayUtil',
	'goo/util/CanvasUtils',
	'goo/util/ColorUtil',
	'goo/util/Enum',
	'goo/util/GameUtils',
	'goo/util/MeshBuilder',
	'goo/util/ObjectUtil',
	'goo/util/ParticleSystemUtils',
	'goo/util/PromiseUtil',
	'goo/util/Rc4Random',
	'goo/util/ShapeCreatorMemoized',
	'goo/util/Skybox',
	'goo/util/Snow',
	'goo/util/SoundCreator',
	'goo/util/Stats',
	'goo/util/StringUtil',
	'goo/util/TangentGenerator',
	'goo/util/combine/AtlasNode',
	'goo/util/combine/EntityCombiner',
	'goo/util/combine/Rectangle',
	'goo/util/gizmos/Gizmo',
	'goo/util/gizmos/RotationGizmo',
	'goo/util/gizmos/ScaleGizmo',
	'goo/util/gizmos/TranslationGizmo',
	'goo/util/rsvp'
], function (Scripts) {
	'use strict';

	//! AT: have to duplicate this for now until nicer way is found
	// minifier cannot handle any expressions or statements other than a simple array of strings
	var defines = [
		'goo/scripts/Scripts',
		'goo/addons/ammo/AmmoComponent',
		'goo/addons/ammo/AmmoSystem',
		'goo/addons/box2d/components/Box2DComponent',
		'goo/addons/box2d/systems/Box2DSystem',
		'goo/addons/cannon/CannonBoxColliderComponent',
		'goo/addons/cannon/CannonDistanceJointComponent',
		'goo/addons/cannon/CannonPlaneColliderComponent',
		'goo/addons/cannon/CannonRigidbodyComponent',
		'goo/addons/cannon/CannonSphereColliderComponent',
		'goo/addons/cannon/CannonSystem',
		'goo/addons/p2/P2Component',
		'goo/addons/p2/P2System',
		'goo/addons/scripts/PolyBoundingScript',
		'goo/addons/terrain/Forrest',
		'goo/addons/terrain/Terrain',
		'goo/addons/terrain/TerrainHandler',
		'goo/addons/terrain/Vegetation',
		'goo/addons/water/FlatWaterRenderer',
		'goo/addons/water/ProjectedGridWaterRenderer',
		'goo/animation/Joint',
		'goo/animation/Skeleton',
		'goo/animation/SkeletonPose',
		'goo/animation/blendtree/BinaryLERPSource',
		'goo/animation/blendtree/ClipSource',
		'goo/animation/blendtree/FrozenClipSource',
		'goo/animation/blendtree/ManagedTransformSource',
		'goo/animation/clip/AbstractAnimationChannel',
		'goo/animation/clip/AnimationClip',
		'goo/animation/clip/AnimationClipInstance',
		'goo/animation/clip/InterpolatedFloatChannel',
		'goo/animation/clip/JointChannel',
		'goo/animation/clip/JointData',
		'goo/animation/clip/TransformChannel',
		'goo/animation/clip/TransformData',
		'goo/animation/clip/TriggerChannel',
		'goo/animation/clip/TriggerData',
		'goo/animation/layer/AnimationLayer',
		'goo/animation/layer/LayerLERPBlender',
		'goo/animation/state/AbstractState',
		'goo/animation/state/AbstractTransitionState',
		'goo/animation/state/FadeTransitionState',
		'goo/animation/state/FrozenTransitionState',
		'goo/animation/state/SteadyState',
		'goo/animation/state/SyncFadeTransitionState',
		'goo/debug/BoundingVolumeMeshBuilder',
		'goo/debug/DebugDrawHelper',
		'goo/debug/Debugger',
		'goo/debug/EntityCounter',
		'goo/debug/FrustumViewer',
		'goo/debug/LightPointer',
		'goo/entities/Entity',
		'goo/entities/EntitySelection',
		'goo/entities/EntityUtils',
		'goo/entities/Selection',
		'goo/entities/SystemBus',
		'goo/entities/World',
		'goo/entities/components/AnimationComponent',
		'goo/entities/components/CSSTransformComponent',
		'goo/entities/components/CameraComponent',
		'goo/entities/components/CameraDebugComponent',
		'goo/entities/components/Component',
		'goo/entities/components/HtmlComponent',
		'goo/entities/components/LightComponent',
		'goo/entities/components/LightDebugComponent',
		'goo/entities/components/MeshDataComponent',
		'goo/entities/components/MeshRendererComponent',
		'goo/entities/components/MovementComponent',
		'goo/entities/components/ParticleComponent',
		'goo/entities/components/PortalComponent',
		'goo/entities/components/ProximityComponent',
		'goo/entities/components/ScriptComponent',
		'goo/entities/components/SoundComponent',
		'goo/entities/components/TextComponent',
		'goo/entities/components/TransformComponent',
		'goo/entities/managers/EntityManager',
		'goo/entities/managers/Manager',
		'goo/entities/systems/AnimationSystem',
		'goo/entities/systems/BoundingUpdateSystem',
		'goo/entities/systems/CSSTransformSystem',
		'goo/entities/systems/CameraDebugSystem',
		'goo/entities/systems/CameraSystem',
		'goo/entities/systems/DebugRenderSystem',
		'goo/entities/systems/GizmoRenderSystem',
		'goo/entities/systems/GridRenderSystem',
		'goo/entities/systems/HtmlSystem',
		'goo/entities/systems/LightDebugSystem',
		'goo/entities/systems/LightingSystem',
		'goo/entities/systems/MovementSystem',
		'goo/entities/systems/ParticlesSystem',
		'goo/entities/systems/PickingSystem',
		'goo/entities/systems/PortalSystem',
		'goo/entities/systems/ProximitySystem',
		'goo/entities/systems/RenderSystem',
		'goo/entities/systems/SoundSystem',
		'goo/entities/systems/System',
		'goo/entities/systems/TextSystem',
		'goo/entities/systems/TransformSystem',
		'goo/loaders/DynamicLoader',
		'goo/math/MathUtils',
		'goo/math/Matrix',
		'goo/math/Matrix2x2',
		'goo/math/Matrix3x3',
		'goo/math/Matrix4x4',
		'goo/math/Plane',
		'goo/math/Quaternion',
		'goo/math/Ray',
		'goo/math/Transform',
		'goo/math/Vector',
		'goo/math/Vector2',
		'goo/math/Vector3',
		'goo/math/Vector4',
		'goo/noise/Noise',
		'goo/noise/ValueNoise',
		'goo/particles/Particle',
		'goo/particles/ParticleEmitter',
		'goo/particles/ParticleInfluence',
		'goo/particles/ParticleLib',
		'goo/particles/ParticleUtils',
		'goo/picking/BoundingTree',
		'goo/picking/PrimitivePickLogic',
		'goo/renderer/BufferData',
		'goo/renderer/BufferUtils',
		'goo/renderer/Camera',
		'goo/renderer/Material',
		'goo/renderer/MeshData',
		'goo/renderer/RenderQueue',
		'goo/renderer/Renderer',
		'goo/renderer/RendererRecord',
		'goo/renderer/Shader',
		'goo/renderer/ShaderCall',
		'goo/renderer/SimplePartitioner',
		'goo/renderer/Texture',
		'goo/renderer/TextureCreator',
		'goo/renderer/Util',
		'goo/renderer/bounds/BoundingBox',
		'goo/renderer/bounds/BoundingSphere',
		'goo/renderer/bounds/BoundingVolume',
		'goo/renderer/light/DirectionalLight',
		'goo/renderer/light/Light',
		'goo/renderer/light/PointLight',
		'goo/renderer/light/SpotLight',
		'goo/renderer/pass/BloomPass',
		'goo/renderer/pass/BlurPass',
		'goo/renderer/pass/Composer',
		'goo/renderer/pass/DOFPass',
		'goo/renderer/pass/DepthPass',
		'goo/renderer/pass/DoGPass',
		'goo/renderer/pass/FullscreenPass',
		'goo/renderer/pass/FullscreenUtil',
		'goo/renderer/pass/MotionBlurPass',
		'goo/renderer/pass/NesPass',
		'goo/renderer/pass/PassLib',
		'goo/renderer/pass/RenderPass',
		'goo/renderer/pass/RenderTarget',
		'goo/renderer/pass/SSAOPass',
		'goo/renderer/shaders/ShaderBuilder',
		'goo/renderer/shaders/ShaderFragment',
		'goo/renderer/shaders/ShaderLib',
		'goo/renderer/shadow/ShadowHandler',
		'goo/scripts/BasicControlScript',
		'goo/scripts/FPCamControlScript',
		'goo/scripts/FlyControlScript',
		'goo/scripts/GroundBoundMovementScript',
		'goo/scripts/HeightMapBoundingScript',
		'goo/scripts/RotationControlScript',
		'goo/scripts/ScriptUtils',
		'goo/scripts/SparseHeightMapBoundingScript',
		'goo/scripts/SplineInterpolator',
		'goo/scripts/WorldFittedTerrainScript',
		'goo/scripts/newwave/FPCamControlScript',
		'goo/scripts/newwave/FlyControlScript',
		'goo/scripts/newwave/MouseLookScript',
		'goo/scripts/newwave/OrbitCamControlScript',
		'goo/scripts/newwave/OrbitNPanControlScript',
		'goo/scripts/newwave/PanCamScript',
		'goo/scripts/newwave/PickAndRotateScript',
		'goo/scripts/newwave/RotationScript',
		'goo/scripts/newwave/WASDScript',
		'goo/shapes/Box',
		'goo/shapes/Cone',
		'goo/shapes/Cylinder',
		'goo/shapes/Disk',
		'goo/shapes/Grid',
		'goo/shapes/ProjectedGrid',
		'goo/shapes/Quad',
		'goo/shapes/ShapeCreator',
		'goo/shapes/SimpleBox',
		'goo/shapes/Sphere',
		'goo/shapes/TerrainSurface',
		'goo/shapes/TextureGrid',
		'goo/shapes/Torus',
		'goo/shapes/debug/CameraDebug',
		'goo/shapes/debug/LightDebug',
		'goo/shapes/debug/MeshRendererDebug',
		'goo/shapes/debug/SkeletonDebug',
		'goo/sound/AudioContext',
		'goo/sound/OscillatorSound',
		'goo/sound/Sound',
		'goo/util/Ajax',
		'goo/util/ArrayUtil',
		'goo/util/CanvasUtils',
		'goo/util/ColorUtil',
		'goo/util/Enum',
		'goo/util/GameUtils',
		'goo/util/MeshBuilder',
		'goo/util/ObjectUtil',
		'goo/util/ParticleSystemUtils',
		'goo/util/PromiseUtil',
		'goo/util/Rc4Random',
		'goo/util/ShapeCreatorMemoized',
		'goo/util/Skybox',
		'goo/util/Snow',
		'goo/util/SoundCreator',
		'goo/util/Stats',
		'goo/util/StringUtil',
		'goo/util/TangentGenerator',
		'goo/util/combine/AtlasNode',
		'goo/util/combine/EntityCombiner',
		'goo/util/combine/Rectangle',
		'goo/util/gizmos/Gizmo',
		'goo/util/gizmos/RotationGizmo',
		'goo/util/gizmos/ScaleGizmo',
		'goo/util/gizmos/TranslationGizmo',
		'goo/util/rsvp'
	];

	for (var i = 1; i < defines.length; i++) {
		var name = defines[i].slice(defines[i].lastIndexOf('/') + 1);
		Scripts.addClass(name, arguments[i]);
	}
});