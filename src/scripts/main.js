
"use strict";
twgl.setDefaults({attribPrefix: "a_"});
var m4 = twgl.m4;
var gl = twgl.getWebGLContext(document.getElementById("c"), { premultipliedAlpha: false, alpha: true });
var meshCube, shaderCube;
var scene, frame;
var ready = false;

var textures = twgl.createTextures(gl, {
	ground1: { src: "images/ground.jpg" },
})

function start ()
{
	meshCube = twgl.createBufferInfoFromArrays(gl, createCube());
	shaderCube = new Shader("Cube");

	scene = new Scene();

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

	} else if (assetsIsLoaded) {
		start();
	}

	requestAnimationFrame(render);
}
requestAnimationFrame(render);