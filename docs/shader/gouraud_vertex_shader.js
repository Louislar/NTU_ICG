gouraud_vertex_shader = `
	attribute vec3 aVertexPosition;
    attribute vec3 aFrontColor;
    attribute vec3 aVertexNormal;

    uniform vec3 lightColor1;
    uniform vec3 lightColor2;
    uniform vec3 lightColor3;
    uniform vec3 lightPosition1;
    uniform vec3 lightPosition2;
    uniform vec3 lightPosition3;

	uniform float ka;
	uniform float kd;
	uniform float ks;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

	varying vec4 fragcolor;    // This value will change later

    void main(void) {
        /*
            HW need three different light source, 
            just calculate their ambient, diffuse, specular separately, then sum up.
        */

        // light position and color of light 
        vec3 lightPosition = vec3(30.0, 20.0, -25.0);
        vec3 lightColor = vec3(1.0, 1.0, 1.0);

        // Model coord to world coord
        // Normal vec will not change after translation, 
        // so no need to use homo coord (4 dim)
        vec3 mvVertex = (uMVMatrix * vec4(aVertexPosition, 1.0)).xyz;
        mat3 normalMVMatrix = mat3(uMVMatrix);
        vec3 mvNormal = normalMVMatrix * aVertexNormal;

        vec3 V = -normalize(mvVertex);
        vec3 N = normalize(mvNormal);
        // vec3 L = normalize(lightPosition - mvVertex);
        vec3 L1 = normalize(lightPosition1 - mvVertex);
        vec3 L2 = normalize(lightPosition2 - mvVertex);
        vec3 L3 = normalize(lightPosition3 - mvVertex);
        // vec3 H = normalize(L+V);
        vec3 H1 = normalize(L1+V);
        vec3 H2 = normalize(L2+V);
        vec3 H3 = normalize(L3+V);

        vec3 ambient = ka * aFrontColor;
        // float cos = max(dot(L, N), 0.0);    // cos might be 0
        float cos1 = max(dot(L1, N), 0.0);    // cos might be 0
        float cos2 = max(dot(L2, N), 0.0);    // cos might be 0
        float cos3 = max(dot(L3, N), 0.0);    // cos might be 0
        // vec3 diffuse = lightColor * kd * aFrontColor * cos;
        vec3 diffuse1 = lightColor1 * kd * aFrontColor * cos1;
        vec3 diffuse2 = lightColor2 * kd * aFrontColor * cos2;
        vec3 diffuse3 = lightColor3 * kd * aFrontColor * cos3;
        // float cosAlpha = max(dot(H, N), 0.0);
        float cosAlpha1 = max(dot(H1, N), 0.0);
        float cosAlpha2 = max(dot(H2, N), 0.0);
        float cosAlpha3 = max(dot(H3, N), 0.0);
        // vec3 specular = lightColor * ks * pow(cosAlpha, 16.0);
        vec3 specular1 = lightColor1 * ks * pow(cosAlpha1, 16.0);
        vec3 specular2 = lightColor2 * ks * pow(cosAlpha2, 16.0);
        vec3 specular3 = lightColor3 * ks * pow(cosAlpha3, 16.0);

        vec3 gouraud = vec3(0.0, 0.0, 0.0);
        // gouraud = ambient + diffuse + specular;
        gouraud = ambient + diffuse1 + diffuse2 + diffuse3 + specular1 + specular2 + specular3;

        // fragcolor = vec4(aFrontColor.rgb, 1.0);
        fragcolor = vec4(gouraud, 1.0);
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);	// vertex position 
    }
`