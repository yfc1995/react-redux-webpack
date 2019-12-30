import { initShaders } from '../lib/cuon-utils';
import { Matrix4 } from '../lib/cuon-matrix';

class OPM {
  vs =
    'attribute vec4 a_position;\n' +
    'attribute vec4 a_color;\n' +
    'uniform mat4 oMat4;\n' +
    'varying vec4 v_color;\n' +
    'void main() {\n' +
    'gl_Position = oMat4 * a_position;\n' +
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
    this.left = -1.0;
    this.right = 1.0;
    this.near = 0.0;
    this.far = 1.0;
    this.top = 1.0;
    this.bottom = -1.0;
  }
  init() {
    const gl = this.gl;
    if (!gl) {
      console.log('no support');
      return
    }
    if (!initShaders(this.gl, this.vs, this.fs)) {
      console.log('init shaders fail');
      return
    }
    this.oMatrix4 = new Matrix4();
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    this.initVertexBuffer();
    this.draw();
  }
  initVertexBuffer() {
    const gl = this.gl;
    const vertics = new Float32Array([
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

    const SIZE = vertics.BYTES_PER_ELEMENT;
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      this.nums = -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertics, gl.STATIC_DRAW);

    const a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, SIZE * 6, 0);
    gl.enableVertexAttribArray(a_position);

    const a_color = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, SIZE * 6, SIZE * 3);
    gl.enableVertexAttribArray(a_color);

    this.nums = 9;
  }
  draw() {
    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    const oMat4 = gl.getUniformLocation(gl.program, 'oMat4');
    this.oMatrix4.setOrtho(this.left, this.right, this.bottom, this.top, this.near, this.far);
    gl.uniformMatrix4fv(oMat4, false, this.oMatrix4.elements);
    gl.drawArrays(gl.TRIANGLES, 0, this.nums);
  }
  setOPM(params) {
    [this.left, this.right, this.bottom, this.top, this.near, this.far] = [...params];
    this.draw();
  }
}

export default OPM;
