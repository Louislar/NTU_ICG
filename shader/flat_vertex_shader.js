flat_vertex_shader=`
#extension GL_OES_standard_derivatives : enable
attribute vec3 aVertexPosition;
attribute vec3 aFrontColor;
attribute vec3 aVertexNormal;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec4 fragcolor;
varying vec3 mvVertex;

void main(void) {

	mvVertex = (uMVMatrix * vec4(aVertexPosition,1.0)).xyz;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    fragcolor = vec4(aFrontColor.rgb, 1.0);

    
    // useless code, prevent aVertexNormal will return -1 at enableVertexAttribArray()
    // Sooo fxxking annoying to have "OpenGL Warnning!!" popping up in console 
    if(dot(aVertexNormal, aVertexNormal) < 0.0){
        fragcolor = vec4(aFrontColor.rgb, 1.0);
    }
}
`