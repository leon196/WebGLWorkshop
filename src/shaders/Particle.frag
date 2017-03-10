
precision mediump float;

varying vec2 v_texCoord;
varying vec4 v_color;

void main() {
	// vec4 color = texture2D(u_fftTexture, v_texCoord);
  gl_FragColor = v_color;
}