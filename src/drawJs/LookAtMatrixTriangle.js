
import { initShaders } from '../lib/cuon-utils';
import { Matrix4 } from '../lib/cuon-matrix';
class LookAtTriangle {
  vs =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color;\n' +
    'uniform mat4 u_View;\n' +
    'void main() {\n' +
    'gl_Position = u_View * a_Position;\n' +
    'v_Color = a_Color;\n' +
    '}\n';
  fs =
    'precision mediump float;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    'gl_FragColor = v_Color;\n' +
    '}\n';
  constructor(gl) {
    this.gl = gl;
    this.lookAt = [0, 0, 0, 0, 0, -1, 0, 1, 0]
    this.init();
  }
  getGl() {
    return this.gl;
  }
  initVertexBuffer() {
    const gl = this.gl;
    const vertices = new Float32Array([
      0.0, 0.5, 0.0, 1.0, 0.4, 0.4,
      -0.5, -0.5, 0.0, 0.4, 1.0, 0.4,
      0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
      -0.5, 0.5, -0.2, 0.4, 1.0, 0.0,
      0.0, -0.5, -0.2, 0.4, 0.4, 1.0,
      0.5, 0.5, -0.2, 1.0, 0.4, 0.4,
      0.0, 0.5, -0.4, 0.4, 0.4, 1.4,
      -0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
      0.5, -0.5, -0.4, 1.0, 0.4, 0.4,
    ])
    const SIZE = vertices.BYTES_PER_ELEMENT;
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer)  {
      return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, SIZE * 6, 0);
    gl.enableVertexAttribArray(a_Position);
    const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, SIZE * 6, SIZE * 3);
    gl.enableVertexAttribArray(a_Color);
    this.num = 9;
    return 9
  }
  init() {
    if (!this.gl) {
      return false
    }
    if (!initShaders(this.gl, this.vs, this.fs)) {
      return false
    }
    this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
    if (!this.initVertexBuffer()) {
      return
    }
    this.draw();
  }
  draw() {
    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    const viewMatrix = new Matrix4();
    const u_View = gl.getUniformLocation(gl.program, 'u_View');
    viewMatrix.setLookAt(...this.lookAt);
    gl.uniformMatrix4fv(u_View, false, viewMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, this.num);
  }
  changeView(params) {
    this.lookAt = params;
    this.draw();
  }
}

export default LookAtTriangle;
