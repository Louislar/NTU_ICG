// How to get face's normal in fragment shader
// ref: https://stackoverflow.com/questions/40101023/flat-shading-in-webgl

// Remember to add "gl.getExtension('OES_standard_derivatives');" in main js scripts, 
// when using "#extension GL_OES_standard_derivatives : enable" in shader program 
// ref: https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives

flat_fragment_shader = `
#extension GL_OES_standard_derivatives : enable
precision mediump float;

varying vec4 fragcolor;	// interpolate front color 
varying vec3 mvVertex;	// interpolate vertex position 
						// I want "constant" normal 

uniform vec3 lightColor1;
uniform vec3 lightColor2;
uniform vec3 lightColor3;
uniform vec3 lightPosition1;
uniform vec3 lightPosition2;
uniform vec3 lightPosition3;

uniform float ka;
uniform float kd;
uniform float ks;

void main(void) {
	// Constant normal on the whole surface 
	vec3 gradX = dFdx(mvVertex);                     
   	vec3 gradY = dFdy(mvVertex);
   	vec3 Normal = normalize(cross(gradX,gradY)); 

	// ambient light 
	vec3 ambient = ka * vec3(fragcolor);

	// directions
	vec3 V = -normalize(mvVertex);
    vec3 N = normalize(Normal);
    vec3 L1 = normalize(lightPosition1 - mvVertex);
    vec3 L2 = normalize(lightPosition2 - mvVertex);
    vec3 L3 = normalize(lightPosition3 - mvVertex);
    vec3 H1 = normalize(L1+V);
    vec3 H2 = normalize(L2+V);
    vec3 H3 = normalize(L3+V);

    float cos1 = max(dot(L1, N), 0.0);    // cos might be 0
    float cos2 = max(dot(L2, N), 0.0);    // cos might be 0
    float cos3 = max(dot(L3, N), 0.0);    // cos might be 0

    float cosAlpha1 = max(dot(H1, N), 0.0);
    float cosAlpha2 = max(dot(H2, N), 0.0);
    float cosAlpha3 = max(dot(H3, N), 0.0);

	// diffuse reflection 
	vec3 diffuse1 = lightColor1 * kd * vec3(fragcolor) * cos1;
    vec3 diffuse2 = lightColor2 * kd * vec3(fragcolor) * cos2;
    vec3 diffuse3 = lightColor3 * kd * vec3(fragcolor) * cos3;

	// specular reflection 
	vec3 specular1 = lightColor1 * ks * pow(cosAlpha1, 16.0);
    vec3 specular2 = lightColor2 * ks * pow(cosAlpha2, 16.0);
    vec3 specular3 = lightColor3 * ks * pow(cosAlpha3, 16.0);

    vec3 flat_r = vec3(0.0, 0.0, 0.0);
    flat_r = ambient + diffuse1 + diffuse2 + diffuse3 + specular1 + specular2 + specular3;

    gl_FragColor = vec4(flat_r, 1.0);	// final pixel color (this will be calculated by vertex shader first)
}
`