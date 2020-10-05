function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    //Obj vertexShader
    var vertexShaderCode = `
    void main () {
        gl_Position = vec4 (0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 10.0;
    }
    `;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER); //create shader
    gl.shaderSource (vertexShader, vertexShaderCode); //isiin code shadernnya
    gl.compileShader (vertexShader); //compile

    //Obj fragmentShader
    var fragmentShaderCode = `void main () {
        gl_FragColor = vec4 (1.0, 0.0, 0.0, 1.0);
    }
    `;
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); //create
    gl.shaderSource (fragmentShader, fragmentShaderCode); //isi
    gl.compileShader (fragmentShader); // compile

    //Linking Object
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT)

    
    gl.drawArrays(gl.POINTS, 0, 1);
}