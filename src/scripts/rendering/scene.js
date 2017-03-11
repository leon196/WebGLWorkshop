
var Scene = function ()
{
	this.projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 10000);
	this.eye = [0, 6, -10];
	this.target = [0, 1, 0];
	this.up = [0, 1, 0];

	this.camera = m4.lookAt(this.eye, this.target, this.up);
	this.view = m4.inverse(this.camera);
	this.viewProjection = m4.multiply(this.projection, this.view);
	this.world = m4.rotationY(0);

	this.uniforms = {
		u_time: 0,
		u_transitionSpeed: 1.0,
		u_scanlineSpeed: 0.1,
		u_grassColor: [ 0.14, 0.51, 0.33, 1.0 ],
	};

	this.clear = function ()
	{
		gl.enable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);
		gl.clearColor(0,0,0,1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

	this.update = function (time)
	{
		this.eye = rotateY(this.eye, -mouse.delta.x * 0.01);

		this.camera = m4.lookAt(this.eye, this.target, this.up);
		this.view = m4.inverse(this.camera);
		this.viewProjection = m4.multiply(this.projection, this.view);
		this.world = m4.rotationY(0);

		this.uniforms.u_viewInverse = this.camera;
		this.uniforms.u_world = this.world;
		this.uniforms.u_worldInverseTranspose = m4.transpose(m4.inverse(this.world));
		this.uniforms.u_worldViewProjection = m4.multiply(this.viewProjection, this.world);
		this.uniforms.u_time = time;
	}

	this.draw = function (geometry, shader, drawType)
	{
		drawType = drawType || gl.TRIANGLES;
		var programInfo = shader.programInfo;
		gl.useProgram(programInfo.program);
		twgl.setBuffersAndAttributes(gl, programInfo, geometry);
		twgl.setUniforms(programInfo, this.uniforms);
		gl.drawElements(drawType, geometry.numElements, gl.UNSIGNED_SHORT, 0);
	}
}