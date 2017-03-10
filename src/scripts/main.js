
"use strict";
twgl.setDefaults({attribPrefix: "a_"});
var m4 = twgl.m4;
var gl = twgl.getWebGLContext(document.getElementById("c"), { premultipliedAlpha: false, alpha: true });
var meshCube, shaderCube, meshParticle, shaderParticle;
var scene, frame, audio, textures;
var	textElement = document.getElementById("debug");
var ready = false;

loadAssets([
	"shaders/Cube.frag",
	"shaders/Cube.vert",
	"shaders/Particle.frag",
	"shaders/Particle.vert",
	"shaders/utils.glsl",
]);

function start ()
{
	meshCube = twgl.createBufferInfoFromArrays(gl, createCube());
	shaderCube = new Shader("Cube");
	meshParticle = twgl.createBufferInfoFromArrays(gl, createGridParticles(100, 1));
	shaderParticle = new Shader("Particle");
	scene = new Scene();
	audio = new AudioAnalyser();

	textures = twgl.createTextures(gl, {
		ground1: { src: "images/ground.jpg" },
		fft: {
	    mag: gl.NEAREST,
	    min: gl.LINEAR,
	    format: gl.LUMINANCE,
	    src: audio.dataArray,
	    width: 1,
		}
	})
	scene.uniforms.u_fftTexture = textures.fft;

	ready = true;
}

function render (time)
{
	time *= 0.001;
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	if (ready)
	{
		mouse.update();
		scene.update(time);

		scene.clear();
		scene.draw(meshCube, shaderCube);
		scene.draw(meshParticle, shaderParticle);

		// audio.analyser.getByteFrequencyData(audio.dataArray);
		// textures.fft.src = audio.dataArray;

	} else if (assetsIsLoaded) {
		start();
	}

	requestAnimationFrame(render);
}
requestAnimationFrame(render);