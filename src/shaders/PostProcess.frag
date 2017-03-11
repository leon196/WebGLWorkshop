
uniform sampler2D u_frameBuffer;
uniform float u_time;
uniform float u_scanlineSpeed;

varying vec4 v_position;
varying vec4 v_color;
varying vec2 v_texCoord;
varying vec3 v_normal;

void main ()
{
  vec2 uv = v_texCoord;

  float should = 0.01 / (sin(uv.y + u_time * u_scanlineSpeed) * 0.5 + 0.5);
  uv.x += sin(uv.y * 1000.) * 0.01 * should;
  // float angle = rand(uv) * PI2;
  // uv.xy += vec2(cos(angle), sin(angle)) * 0.002;
  vec4 color = texture2D(u_frameBuffer, uv);
  gl_FragColor = color;
}