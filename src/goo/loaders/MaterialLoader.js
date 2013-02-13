/* jshint bitwise: false */
define([
		'goo/util/Promise',
		'goo/util/Ajax',
		'goo/renderer/MeshData',
		'goo/renderer/Shader',
		'goo/renderer/TextureCreator',
		'goo/renderer/Material'
	],
	/** @lends MaterialLoader */
	function(
		Promise,
		Ajax,
		MeshData,
		Shader,
		TextureCreator,
		Material
	) {
	"use strict";

	/*
	 *
	 */
	function MaterialLoader(rootUrl) {
		this._rootUrl = rootUrl || '';
	}

	MaterialLoader.prototype.setRootUrl = function(rootUrl) {
		if(typeof rootUrl === 'undefined' || rootUrl === null) { return this; }
		this._rootUrl = rootUrl;

		return this;
	};

	MaterialLoader.prototype.load = function(sourcePath) {
		var promise = new Promise();
		if(typeof sourcePath === 'undefined' || sourcePath === null) { promise._reject('URL not specified'); }

		var that = this;
		var ajax = new Ajax({
			url: this._rootUrl + sourcePath // It's gotta be a json object!
		})
		.done(function(request) {

			that._parseMaterial(that._handleRequest(request))
				.done(function(data) {
					promise._resolve(data);
				})
				.fail(function(data) {
					promise._reject(data);
				});
		})
		.fail(function(data) {
			promise._reject(data.statusText);
		});

		return promise;
	};

	MaterialLoader.prototype._handleRequest = function(request) {
		var json = null;

		var expected = 'application/json';
		if(request && request.getResponseHeader('Content-Type') === expected)
		{
			try
			{
				json = JSON.parse(request.responseText);
			}
			catch (e)
			{
				console.warn('Couldn\'t load following data to JSON:\n' + request.responseText);
			}
		}
		else
		{
			console.warn('Expected content type to be "' + expected + '", got:\n' + (request ? request.getResponseHeader('Content-Type') : null) );
		}

		return json;
	};

	MaterialLoader.prototype._parseMaterial = function(materialDataSource) {
		var promise = new Promise(),
			promises = {}, // Keep track of promises

			shaderDefinition = {
				attributes : {
					vertexPosition : MeshData.POSITION,
					vertexNormal : MeshData.NORMAL,
					vertexUV0 : MeshData.TEXCOORD0
				},
				uniforms : {
					viewMatrix : Shader.VIEW_MATRIX,
					projectionMatrix : Shader.PROJECTION_MATRIX,
					worldMatrix : Shader.WORLD_MATRIX,
					cameraPosition : Shader.CAMERA,
					lightPosition : Shader.LIGHT0,
					diffuseMap : Shader.TEXTURE0,
					materialAmbient : Shader.AMBIENT,
					materialDiffuse : Shader.DIFFUSE,
					materialSpecular : Shader.SPECULAR,
					materialSpecularPower : Shader.SPECULAR_POWER
				}
			},
			textures = [],
			materialState = {
				ambient  : { r : 0.0, g : 0.0, b : 0.0, a : 1.0 },
				diffuse  : { r : 1.0, g : 1.0, b : 1.0, a : 1.0 },
				emissive : { r : 0.0, g : 0.0, b : 0.0, a : 1.0 },
				specular : { r : 0.0, g : 0.0, b : 0.0, a : 1.0 },
				shininess: 16.0
			};

		if(materialDataSource && Object.keys(materialDataSource).length)
		{
			var value;

			for(var attribute in materialDataSource)
			{
				value = materialDataSource[attribute];

				if(attribute === 'shader')
				{
					promises[attribute] = new Ajax({ url: this._rootUrl + value + '.json' });
				}
				else if(attribute === 'uniforms')
				{

					for(var i in value)
					{
						var that = this;
						if(i === 'diffuseTexture')
						{
							textures.push(new TextureCreator().loadTexture2D(that._rootUrl + value[i]));
						}
						else if(i === 'shininess')
						{
							materialState.shininess = value[i];
						}
						else if(i === 'ambient' || i === 'diffuse' || i === 'emissive' || i === 'specular')
						{
							if(typeof value[i][0] !== 'undefined' || value[i][0] !== null) { materialState[i].r = value[i][0]; }
							if(typeof value[i][1] !== 'undefined' || value[i][1] !== null) { materialState[i].g = value[i][1]; }
							if(typeof value[i][2] !== 'undefined' || value[i][2] !== null) { materialState[i].b = value[i][2]; }
							if(typeof value[i][3] !== 'undefined' || value[i][3] !== null) { materialState[i].a = value[i][3]; }
						}
					}
				}
			}
		}
		else
		{
			promise._reject('Couldn\'t load from source: ' + materialDataSource);
		}

		var that = this;
		Promise.when(promises.shader)
			.done(function(data) {

				that._parseShaderDefinition(that._handleRequest(data[0]))
					.done(function(data) {

						shaderDefinition.vshader = data.vshader;
						shaderDefinition.fshader = data.fshader;

						var material = Material.createMaterial(shaderDefinition);
						
						material.textures = textures;
						material.materialState = materialState;

						promise._resolve(material);
						
					})
					.fail(function(data) {
						promise._reject(data);
					});
			
			})
			.fail(function(data) {
				promise._reject(data);
			});

		return promise;
	};

	MaterialLoader.prototype._parseShaderDefinition = function(shaderDataSource) {
		var promise = new Promise();
		var promises = {};

		if(shaderDataSource && Object.keys(shaderDataSource).length)
		{
			if(shaderDataSource.vs === null || shaderDataSource.fs === null)
			{
				promise._reject('Could not load shader:\n' + shaderDataSource);
			}

			var value;

			for(var attribute in shaderDataSource)
			{
				value = shaderDataSource[attribute];
				
				promises[attribute] = new Ajax( { url : this._rootUrl + value } );
			}
		}
		else
		{
			promise._reject('Couldn\'t load from source: ' + shaderDataSource);
		}

		Promise.when(promises.vs, promises.fs)
			.done(function(data) {
				
				if(data.length === 2 && data[0].responseText && data[1].responseText)
				{
					// We know that we asked for the vertex shader first and fragment second
					var shaderDefinition = {
						vshader : data[0].responseText,
						fshader : data[1].responseText
					};

					promise._resolve(shaderDefinition);
				}
				else
				{

					promise._reject('Shader pair couldn\'t be loaded.');
				}
			})
			.fail(function(data) {
				promise._reject(data);
			});

		return promise;
	};

	return MaterialLoader;
});