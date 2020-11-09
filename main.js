function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");



     // Definisi verteks-verteks pada segitiga
  /**
   * A (-0.5, 0.5); B (-0.5, -0.5); C (0.5, -0.5) D (0.5,0.5)-->ClipCoordinates
   */
    var vertices = [  
        -0.5, 0.5, 1.0, 0.0, 0.0,      // Titik A 
        -0.5, -0.5, 1.0, 0.0, 0.0,     // Titik B
        0.5, -0.5, 1.0, 0.0, 0.0,      // Titik C
        0.5, -0.5, 0.0, 0.0, 1.0,      // Titik C
        0.5, 0.5, 0.0, 0.0, 1.0,       // Titik D
        -0.5, 0.5, 0.0, 0.0, 1.0       // Titik A 
         
        ]; 
    
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); //ngasih tau buffer GPU kita mau pake vertexBuffer
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
    var fragmentShaderCode = `
    precision mediump float;
    varying vec3 v_Color;
    void main () {
        gl_FragColor = vec4(v_Color, 1.0);
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

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    var aColor = gl.getAttribLocation(shaderProgram, "a_Color");
    gl.vertexAttribPointer(
        aPosition, 
        2, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0);
      gl.vertexAttribPointer(
        aColor, 
        3, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        2 * Float32Array.BYTES_PER_ELEMENT);
      gl.enableVertexAttribArray(aPosition);
      gl.enableVertexAttribArray(aColor);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);


    //biar hasilnya bener2 pesergi
    gl.viewport(100, 0, gl.canvas.height, canvas.height)

    //
    var primitive = gl.TRIANGLES;
    var offset = 0;
    var count = 6;

    
    gl.drawArrays(primitive, offset, count);
}