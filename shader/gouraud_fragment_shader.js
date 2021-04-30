gouraud_fragment_shader = ` 
precision mediump float;

varying vec4 fragcolor;

void main(void) {
    gl_FragColor = fragcolor;	// final pixel color (this will be calculated by vertex shader first)
}
`