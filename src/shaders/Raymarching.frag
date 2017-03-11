
uniform sampler2D u_frameBuffer;
uniform float u_time;
uniform float u_scanlineSpeed;
uniform float u_pixel;
uniform vec2 u_resolution;

varying vec4 v_position;
varying vec4 v_color;
varying vec2 v_texCoord;
varying vec3 v_normal;


	vec3 eye = vec3(0, 0, -2);
	vec3 front = vec3(0, 0, 1.0);
	vec3 up = vec3(0, 1.0, 0);
	vec3 right = vec3(1.0, 0, 0);
	float epsilon = 0.001;
const float nearest = 0.3;
const float farest = 100.0;
float rotationSpeed = 0.5;

float shade(vec3 p)
{
    vec3 normal = normalize(p);
    vec3 direction = normalize(eye - p);
    return clamp(dot(normal, direction) * 0.5 + 0.5, 0.0, 1.0);
}

void main ()
{
	vec2 uv = v_texCoord;
	
	vec2 pixel = uv.xy * 2.0 - 1.0;
	pixel.x *= u_resolution.x / u_resolution.y;
	
	vec3 rayDirection = normalize(front + right * pixel.x + up * pixel.y);

	vec4 color = vec4(0, 0.2, 0.4, 1);

	const int maxSteps = 256;
	
	//eye = rotateY(eye, mod(iGlobalTime * rotationSpeed, PI2));
	//eye = rotateX(eye, mod(iGlobalTime * rotationSpeed, PI2));
	
	//lightPosition.x = cos(iGlobalTime) * 4.0;
	//lightPosition.z = sin(iGlobalTime) * 4.0;
	
	//eye.z = -1.0 + cos(iGlobalTime * 0.5) * 0.5;
	
	//vec4 texture = texture(iChannel0, mod(abs(pixel), 1.0));

	float t = 0.0;
	for(int i = 0; i < maxSteps; ++i)
	{
		vec3 p = eye + rayDirection * t;
		
		// Transformations
		p = rotateY(p, mod(u_time * rotationSpeed, PI2));
		//p = rotateX(p, -PI / 2.0);
		p = rotateX(p, mod(u_time * rotationSpeed, PI2));
		//p = opRep(p, vec3(2.0)); 
		
		//vec2 uv = mod(abs(p.xy), 1.0);
		float angle = atan(p.y, p.x);
		vec2 uv = mod(abs(vec2(angle / PI, shade(p))), 1.0);

		color = texture2D(u_frameBuffer, uv);
		float luminance = (color.r + color.g + color.b) / 3.0;

		float sphereNearClip = sdSphere(p, 1.0 + luminance);

		float d = sphereNearClip;
		
		// Distance min or max reached
		if(d < epsilon || t > farest)
		{
			float ratioShadow = 1.0 - float(i) / float(maxSteps);
			//float shade = 1.0 - dot(p, rayDirection);
			float fog = smoothstep(nearest, farest, t);
			//color = mix(color, lightColor, shade(eye + rayDirection * t));
			//color = mix(ambientColor, boatColor, ratioBoat);
			color = mix(vec4(1), color, ratioShadow);
			color = mix(color, vec4(0, 0.2, 0.4, 1)/2., fog); // Sphere color
			break;
		}

		t += d;
	}
	gl_FragColor = color;
}