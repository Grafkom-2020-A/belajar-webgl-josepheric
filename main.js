function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");



     // Definisi verteks-verteks pada segitiga
  /**
   * A (-0.5, 0.5); B (-0.5, -0.5); C (0.5, -0.5) D (0.5,0.5)-->ClipCoordinates
   */
    var vertices = [-0.5, 0.5, //titikA
         -0.5, -0.5,  //B
         0.5, -0.5,    //C
         0.5,0.5 //D
         
        ]; 
    
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); //ngasih tau buffer GPU kita mau pake positionbuffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); //setelah selesai bindnya diputus

    
    var vertexShaderCode = document.getElementById("vertexShaderCode").text;
    //Obj vertexShader
    // var vertexShaderCode = `
    // void main () {
    //     gl_Position = vec4 (0.0, 0.0, 0.0, 1.0);
    //     gl_PointSize = 30.0;
    // }
    // `;
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

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2,gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var primitive = gl.TRIANGLE_FAN;
    var offset = 0;
    var count = 4;

    
    gl.drawArrays(primitive, offset, count);
}