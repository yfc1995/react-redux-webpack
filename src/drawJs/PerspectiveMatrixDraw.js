import { initShaders } from '../lib/cuon-utils';
import { Matrix4 } from '../lib/cuon-matrix';

class PerspectiveMatrixDraw {
  vs =
    'attribute vec4 a_position;\n' +
    'attribute vec4 a_color;\n' +
    'varying vec4 v_color;\n' +
    'uniform mat4 u_look;\n' +
    'uniform mat4 u_per;\n' +
    'void main() {\n' +
    'gl_Position = u_per * u_look * a_position;\n' +
    'v_color = a_color;\n' +
    '}\n';

  fs =
    'precision mediump float;\n' +
    'varying vec4 v_color;\n' +
    'void main() {\n' +
    'gl_FragColor = v_color;\n' +
    '}\n';
  constructor(gl) {
    this.gl = gl;
    this.look = [0, 0, 5, 0, 0, -1, 0, 1, 0];
    this.per = [30, 1, 1, 100];
  }
  init() {
    const gl = this.gl;
    if (!gl) {
      console.log('暂不支持gl');
      return;
    }
    if (!initShaders(gl, this.vs, this.fs)) {
      console.log('初始化失败');
      return;
    }
    this.lookMatrix = new Matrix4();
    this.perMatrix = new Matrix4();
    this.u_look = gl.getUniformLocation(gl.program, 'u_look');
    this.u_per = gl.getUniformLocation(gl.program, 'u_per');
    this.a_position = gl.getAttribLocation(gl.program, 'a_position');
    this.a_color = gl.getAttribLocation(gl.program, 'a_color');
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    this.initVertexBuffer();
  }
  initVertexBuffer() {
    const gl = this.gl;
    const vertices = new Float32Array([
      0.75, 1.0, -4.0, 0.4, 1.0, 0.4,
      0.25, -1.0, -4.0, 0.4, 1.0, 0.4,
      1.25, -1.0, -4.0, 1.0, 0.4, 0.4,

      0.75, 1.0, -2.0, 1.0, 1.0, 0.4,
      0.25, -1.0, -2.0, 1.0, 1.0, 0.4,
      1.25, -1.0, -2.0, 1.0, 0.4, 0.4,

      0.75, 1.0, -0.0, 0.4, 0.4, 1.0,
      0.25, -1.0, -0.0, 0.4, 0.4, 1.0,
      1.25, -1.0, -0.0, 1.0, 0.4, 0.4,

      -0.75, 1.0, -4.0, 0.4, 1.0, 0.4,
      -1.25, -1.0, -4.0, 0.4, 1.0, 0.4,
      -0.25, -1.0, -4.0, 1.0, 0.4, 0.4,

      -0.75, 1.0, -2.0, 1.0, 1.0, 0.4,
      -1.25, -1.0, -2.0, 1.0, 1.0, 0.4,
      -0.25, -1.0, -2.0, 1.0, 0.4, 0.4,

      -0.75, 1.0, -0.0, 0.4, 0.4, 1.0,
      -1.25, -1.0, -0.0, 0.4, 0.4, 1.0,
      -0.25, -1.0, -0.0, 1.0, 0.4, 0.4,

    ]);
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('创建缓冲区失败');
      return;
    }
    const SIZE = vertices.BYTES_PER_ELEMENT;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.vertexAttribPointer(this.a_position, 3, gl.FLOAT, false, SIZE * 6, 0)
    gl.enableVertexAttribArray(this.a_position);

    gl.vertexAttribPointer(this.a_color, 3, gl.FLOAT, false, SIZE * 6, SIZE * 3);
    gl.enableVertexAttribArray(this.a_color);
    this.num = 18;
    this.draw();
  }
  draw() {
    this.lookMatrix.setLookAt(...this.look);
    this.perMatrix.setPerspective(...this.per);
    this.gl.uniformMatrix4fv(this.u_look, false, this.lookMatrix.elements);
    this.gl.uniformMatrix4fv(this.u_per, false, this.perMatrix.elements);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.num);
  }
  setLook(params) {
    this.look = params;
    this.draw();
  }
  setPer(params) {
    this.per = params;
    this.draw();
  }
}

export default PerspectiveMatrixDraw;
