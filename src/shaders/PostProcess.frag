
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

  // Polar coordinate
  // uv -= 0.5;
  // float angle = (atan(uv.y, uv.x) / PI) * 0.5 + 0.5;
  // float radius = length(uv);
  // uv = vec2(angle, radius);

  // Slices
  // float lod = 32.;
  // uv.x += (noiseIQ(64. * floor(uv.yyy * lod) / lod) * 2. - 1.) * u_time;

  // Wobble
  // vec2 center = uv - vec2(0.5);
  // float angle = sin(length(center) * 10. + u_time);
  // uv.xy += vec2(cos(angle), sin(angle)) * 0.3;

  // Dot Matrix
  vec2 uvPixel = floor(uv * u_pixel) / u_pixel;
  vec2 uvLocal = (v_texCoord - uvPixel) * u_pixel;

  uvLocal -= 0.5;
  // uvLocal -= 0.5;

  // BAD TV
  // uv.y += u_time * 0.3;
  // float seed = u_time + uv.y * 30.;
  // float seed2 = u_time * 4. + uv.y * 30.;
  // float should = step(0.0, sin(seed));
  // uv.x += should * sin(seed) * 0.1 * noiseIQ(vec3(seed2,0,0));
  // uv = mod(abs(uv), 1.0);

  // float should = 0.01 / (sin(uv.y + u_time * u_scanlineSpeed) * 0.5 + 0.5);
  // uv.x += sin(uv.y * 1000.) * 0.01 * should;
  // float angle = rand(uv) * PI2;
  // uv.xy += vec2(cos(angle), sin(angle)) * 0.002;
  vec4 color = texture2D(u_frameBuffer, uvPixel);

  color.rgb *= step(length(uvLocal), 0.5);
  color.rgb = floor(color.rgb * u_pixel) / u_pixel;

  gl_FragColor = color;
}