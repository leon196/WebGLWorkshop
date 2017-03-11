
precision mediump float;

uniform sampler2D u_texture;
uniform float u_time;
uniform float u_transitionSpeed;

varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

void main ()
{
	vec2 uv = v_texCoord * 0.1;
	vec4 mask = texture2D(u_texture, uv);
	float oscillation = sin(u_time * u_transitionSpeed) * 0.5 + 0.5;
	float treshold = step(oscillation, luminance(mask.rgb));


  vec3 a_normal = normalize(v_normal);
  vec3 surfaceToLight = normalize(v_surfaceToLight);
  vec3 surfaceToView = normalize(v_surfaceToView);
  float lit = dot(a_normal, surfaceToView) * 0.5 + 0.5;

	vec4 colorNormal = vec4(a_normal * 0.5 + 0.5, 1.0);
	vec4 color = mix(vec4(vec3(1)*lit,1), colorNormal, treshold);

  gl_FragColor = color;
}