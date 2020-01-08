import { initShaders } from '../lib/cuon-utils';
import { Matrix4 } from '../lib/cuon-matrix';

class PerspectiveMatrixDraw2 {
  vs =
    'attribute vec4 a_position;\n' +
    'varying vec4 v_color;\n' +
    'attribute vec4 a_color;\n' +
    'uniform mat4 modelM;\n' +
    'uniform mat4 lookM;\n' +
    'uniform mat4 projectionM;\n' +
    'void main() {\n' +
    'gl_Position = projectionM * lookM * modelM * a_position;\n' +
    'v_color = a_color;\n' +
    '}\n';
  vs2 =
    'attribute vec4 a_position;\n' +
    'varying vec4 v_color;\n' +
    'attribute vec4 a_color;\n' +
    'uniform mat4 mvpM;\n' +
    'void main() {\n' +
    'gl_Position = mvpM * a_position;\n' +
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
    this.look = [0, 0, 5, 0, 0, -100, 0, 1, 0];
    this.projecton = [30, 1, 1, 200];
    this.init2();
  }

  init() {
    const gl = this.gl;
    if (!gl) {
      console.log('浏览器不支持');
      return
    }
    if (!initShaders(gl, this.vs, this.fs)) {
      console.log("着色器初始化失败");
      return
    }
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    this.initVertexBuffer();
  }
  init2() {
    const gl = this.gl;
    if (!gl) {
      console.log('浏览器不支持');
      return
    }
    if (!initShaders(gl, this.vs2, this.fs)) {
      console.log("着色器初始化失败");
      return
    }
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    this.initVertexBuffer2();
  }
  initVertexBuffer() {
    const gl = this.gl;
    const vertices = new Float32Array([
      0.0, 1.0, -4.0, 1.0, 0.0, 0.0,
      -0.5, -0.5, -4.0, 1.0, 0.0, 0.0,
      0.5, -0.5, -4.0, 1.0, 0.0, 0.0,

      0.0, 1.0, -2.0, 0.0, 1.0, 0.0,
      -0.5, -0.5, -2.0, 0.0, 1.0, 0.0,
      0.5, -0.5, -2.0, 0.0, 1.0, 0.0,

      0.0, 1.0, -0.0, 0.0, 0.0, 1.0,
      -0.5, -0.5, -0.0, 0.0, 0.0, 1.0,
      0.5, -0.5, -0.0, 0.0, 0.0, 1.0,
    ]);
    const SIZE = vertices.BYTES_PER_ELEMENT;
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("缓冲区创建失败");
      return
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, SIZE * 6, 0);
    gl.enableVertexAttribArray(a_position);

    const a_color = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, SIZE * 6, SIZE * 3);
    gl.enableVertexAttribArray(a_color);
    this.lookMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.modelMatrix = new Matrix4();
    this.lookM = gl.getUniformLocation(gl.program, 'lookM');
    this.projectionM = gl.getUniformLocation(gl.program, 'projectionM');
    this.modelM = gl.getUniformLocation(gl.program, 'modelM');
    this.num = 9;
    this.drawF();
  }
  initVertexBuffer2() {
    const gl = this.gl;
    const vertices = new Float32Array([
      0.0, 1.0, -4.0, 1.0, 0.0, 0.0,
      -0.5, -0.5, -4.0, 1.0, 0.0, 0.0,
      0.5, -0.5, -4.0, 1.0, 0.0, 0.0,

      0.0, 1.0, -2.0, 0.0, 1.0, 0.0,
      -0.5, -0.5, -2.0, 0.0, 1.0, 0.0,
      0.5, -0.5, -2.0, 0.0, 1.0, 0.0,

      0.0, 1.0, -0.0, 0.0, 0.0, 1.0,
      -0.5, -0.5, -0.0, 0.0, 0.0, 1.0,
      0.5, -0.5, -0.0, 0.0, 0.0, 1.0,
    ]);
    const SIZE = vertices.BYTES_PER_ELEMENT;
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("缓冲区创建失败");
      return
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, SIZE * 6, 0);
    gl.enableVertexAttribArray(a_position);

    const a_color = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, SIZE * 6, SIZE * 3);
    gl.enableVertexAttribArray(a_color);
    this.lookMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.modelMatrix = new Matrix4();
    this.mvpMatrxi = new Matrix4();
    this.mvmM = gl.getUniformLocation(gl.program, 'mvpM');
    this.num = 9;
    this.drawF2();
  }
  draw(x) {
    this.setMatrix(x);
    this.gl.uniformMatrix4fv(this.modelM, false, this.modelMatrix.elements);
    this.gl.uniformMatrix4fv(this.lookM, false, this.lookMatrix.elements);
    this.gl.uniformMatrix4fv(this.projectionM, false, this.projectionMatrix.elements);
    this.drawIng();
  }
  draw2(x) {
    this.setMatrix(x);
    this.mvpMatrxi.set(this.projectionMatrix).multiply(this.lookMatrix).multiply(this.modelMatrix);
    this.gl.uniformMatrix4fv(this.mvmM, false, this.mvpMatrxi.elements);
    this.drawIng();
  }
  setMatrix(x) {
    this.modelMatrix.setTranslate(x, 0, 0);
    this.lookMatrix.setLookAt(...this.look);
    this.projectionMatrix.setPerspective(...this.projecton)
  }
  drawIng() {
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.num);
  }
  drawF() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.draw(0.75);
    this.draw(-0.75);
  }
  drawF2() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.draw2(0.75);
    this.draw2(-0.75);
  }
  setLook(params) {
    this.look = params;
    this.drawF();
  }
  setPer(params) {
    this.projecton = params;
    this.drawF();
  }
}

export default PerspectiveMatrixDraw2;
