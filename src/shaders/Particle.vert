
precision mediump float;

uniform mat4 u_worldViewProjection;
uniform vec3 u_lightWorldPos;
uniform mat4 u_world;
uniform mat4 u_viewInverse;
uniform mat4 u_worldInverseTranspose;
uniform float u_time;

attribute vec4 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texCoord;
varying vec4 v_color;

void main ()
{
  v_texCoord = a_texcoord;
  v_color = mix(vec4(0,0,0,1), vec4(0,1,0,1), a_texcoord.y);

  vec4 position = a_position;

  position.xz -= 0.5;
  position.xz *= 10.;

  float isTop = step(0.1, a_texcoord.y);
  vec2 noisey = vec2(noiseIQ(position.xyz*12.), noiseIQ(position.xyz*3.));
  noisey = noisey * 2. - 1.;
  position.xz += isTop * noisey * 0.2;

  float size = 1.;
  vec2 offset = a_texcoord.xy;
  offset.x *= 0.1;
  offset *= size;

  position = u_worldViewProjection * position;
  position.xy += offset;
  gl_Position = position;
}