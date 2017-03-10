
precision mediump float;

varying vec2 v_texCoord;
varying vec3 v_normal;

void main() {
	// vec4 color = texture2D(u_fftTexture, v_texCoord);
	vec4 colorNormal = vec4(v_normal * 0.5 + 0.5, 1.0);
  gl_FragColor = colorNormal;
}