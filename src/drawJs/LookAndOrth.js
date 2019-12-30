import { initShaders } from '../lib/cuon-utils';
import { Matrix4 } from '../lib/cuon-matrix';

class LookAndOrthDraw {
  vs =
    'attribute vec4 a_position;\n' +
    'attribute vec4 a_color;\n' +
    'varying vec4 v_color;\n' +
    'uniform mat4 u_look;\n' +
    'uniform mat4 u_opm;\n' +
    'void main() {\n' +
    'gl_Position = u_opm * u_look * a_position;\n' +
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
    this.eye = [0, 0, 0, 0, 0, -1, 0, 1, 0];
    this.opm = [-1.0, 1.0, -1.0, 1.0, 0.0, 1.0];
  }
  init() {
    const gl = this.gl;
    if(!gl) {
      console.log('no support');
      return
    }
    if (!initShaders(gl, this.vs, this.fs)) {
      console.log('初始化着色器失败');
      return
    }
    this.u_opm = gl.getUniformLocation(gl.program, 'u_opm');
    this.u_look = gl.getUniformLocation(gl.program, 'u_look');
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    this.initVertexBuffer();

  }
  initVertexBuffer() {
    const gl = this.gl;
    const vertices = new Float32Array([
      0.0, 0.5, -0.4, 0.4, 1.0, 0.4,
      -0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
      0.5, -0.5, -0.4, 1.0, 0.4, 0.4,

      0.5, 0.4, -0.2, 1.0, 0.4, 0.4,
      -0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
      0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

      0.0, 0.5, 0.0, 0.4, 0.4, 1.0,
      -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
      0.5, -0.5, 0.0, 1.0, 0.4, 0.4
    ])
    const SIZE = vertices.BYTES_PER_ELEMENT;
    const vertextBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertextBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, SIZE * 6, 0);
    gl.enableVertexAttribArray(a_position);
    const a_color = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, SIZE * 6, SIZE * 3);
    gl.enableVertexAttribArray(a_color);
    this.num = 9
    this.draw();
  }
  draw() {
    const gl = this.gl;
    const lookMatrix = new Matrix4();
    lookMatrix.setLookAt(...this.eye);
    const orthMatrix = new Matrix4();
    orthMatrix.setOrtho(...this.opm);
    gl.uniformMatrix4fv(this.u_look, false, lookMatrix.elements);
    gl.uniformMatrix4fv(this.u_opm, false, orthMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, this.num)
  }
  setEye(params) {
    this.eye = params;
    this.draw();
  }
  setOpm(params) {
    this.opm = params;
    this.draw();
  }
}

export default LookAndOrthDraw;
