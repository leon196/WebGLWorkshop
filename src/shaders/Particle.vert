
precision mediump float;

uniform mat4 u_worldViewProjection;
uniform vec3 u_lightWorldPos;
uniform mat4 u_world;
uniform mat4 u_viewInverse;
uniform mat4 u_worldInverseTranspose;
uniform float u_time;
uniform vec4 u_grassColor;

attribute vec4 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texCoord;
varying vec4 v_color;

void main ()
{
  v_texCoord = a_texcoord;
  v_color = mix(vec4(0,0,0,1), u_grassColor, a_texcoord.y);

  vec4 position = a_position;

  position.xz -= 0.5;
  position.xz *= 8.;

  float isTop = step(0.1, a_texcoord.y);
  vec3 seedOffset = vec3(u_time,0,0);
  vec3 seed1 = position.xyz*12. + seedOffset;
  vec3 seed2 = position.xyz*3. + seedOffset;
  vec2 noisey = vec2(noiseIQ(seed1), noiseIQ(seed2));
  noisey = noisey * 2. - 1.;
  position.xz += isTop * noisey * 0.2;

  float fadeOut = sin(a_position.x * PI) * sin(a_position.z * PI);
  position.y += isTop * fadeOut * 0.8;

  float size = 0.2 * fadeOut;
  vec2 offset = a_texcoord.xy;
  offset *= size;

  position = u_worldViewProjection * position;
  position.xy += offset;
  gl_Position = position;
}