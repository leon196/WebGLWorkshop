
uniform sampler2D u_frameBuffer;
uniform float u_time;
uniform float u_scanlineSpeed;
uniform float u_pixel;

varying vec4 v_position;
varying vec4 v_color;
varying vec2 v_texCoord;
varying vec3 v_normal;

void main ()
{
  vec2 uv = v_texCoord;

  // uv -= 0.5;
  // float angle = (atan(uv.y, uv.x) / PI) * 0.5 + 0.5;
  // float radius = length(uv);
  // uv = vec2(angle, radius);

  uv = floor(uv * u_pixel) / u_pixel;

  // float should = 0.01 / (sin(uv.y + u_time * u_scanlineSpeed) * 0.5 + 0.5);
  // uv.x += sin(uv.y * 1000.) * 0.01 * should;
  // float angle = rand(uv) * PI2;
  // uv.xy += vec2(cos(angle), sin(angle)) * 0.002;
  vec4 color = texture2D(u_frameBuffer, uv);
  gl_FragColor = color;
}