import { initShaders } from '../lib/cuon-utils';
import { Matrix4 } from '../lib/cuon-matrix';

class CubeDraw {
  vs =
    'attribute vec4 a_position;\n' +
    'attribute vec4 a_color;\n' +
    'varying vec4 v_color;\n' +
    'uniform mat4 mvpM;\n' +
    'uniform mat4 rotateM;\n' +
    'void main() {\n' +
    'v_color = a_color;\n' +
    'gl_Position = mvpM * rotateM * a_position;\n' +
    '}\n';

  fs =
    'precision mediump float;\n' +
    'varying vec4 v_color;\n' +
    'void main() {\n' +
    'gl_FragColor = v_color;\n' +
    '}\n';
  
  constructor(gl) {
    this.gl = gl;
    this.oldTime = Date.now();
    this.nowAngle = 0;
    this.speed = 45.0;
    this.look = [3, 3, 5, 0, 0, 1, 0, 1, 0];
    this.perspective = [30, 1, 1, 200];
    if (this.gl) {
      this.init();
    }
  }
  init() {
    const gl = this.gl;
    if (!initShaders(gl, this.vs, this.fs)) {
      console.log("初始化着色器失败")
      return
    }
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    this.mvpMatrix = new Matrix4();
    this.rotateMatrix = new Matrix4();
    this.mvpM = gl.getUniformLocation(gl.program, 'mvpM');
    this.rotateM = gl.getUniformLocation(gl.program, 'rotateM');
    this.initVertexBuffer();
  }
  initVertexBuffer() {
    const gl = this.gl;
    const vertices = new Float32Array([
      0.5, 0.5, 0.5, 1.0, 1.0, 1.0,
      -0.5, 0.5, 0.5, 1.0, 0.0, 1.0,
      -0.5, -0.5, 0.5, 1.0, 0.0, 0.0,
      0.5, -0.5, 0.5, 1.0, 1.0, 0.0,
      0.5, -0.5, -0.5, 0.0, 1.0, 0.0,
      0.5, 0.5, -0.5, 0.0, 1.0, 1.0,
      -0.5, 0.5, -0.5, 0.0, 0.0, 1.0,
      -0.5, -0.5, -0.5, 0.0, 0.0, 0.0,
    ]);
    // const vertices = new Float32Array([
    //   0.5, 0.5, 0.5, 1.0, 1.0, 1.0,
    //   -0.5, 0.5, 0.5, 1.0, 1.0, 1.0,
    //   -0.5, -0.5, 0.5, 1.0, 1.0, 1.0,
    //   0.5, -0.5, 0.5, 1.0, 1.0, 1.0,
    //   0.5, -0.5, -0.5, 1.0, 1.0, 1.0,
    //   0.5, 0.5, -0.5, 1.0, 1.0, 1.0,
    //   -0.5, 0.5, -0.5, 1.0, 1.0, 1.0,
    //   -0.5, -0.5, -0.5, 1.0, 1.0, 0.0,
    // ]);
    const indecs = new Uint8Array([
      0, 1, 2, 0, 2, 3,
      0, 3, 4, 0, 4, 5,
      0, 5, 6, 0, 6, 1,
      1, 6, 7, 1, 7, 2,
      7, 4, 3, 7, 3, 2,
      4, 7, 6, 4, 6, 5
    ]);
    const SIZE = vertices.BYTES_PER_ELEMENT;
    const vertexBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, SIZE * 6, 0);
    gl.enableVertexAttribArray(a_position);

    const a_color = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, SIZE * 6, SIZE * 3);
    gl.enableVertexAttribArray(a_color);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indecs, gl.STATIC_DRAW);

    this.num = indecs.length;
    this.mvpMatrix.setPerspective(...this.perspective);
    this.mvpMatrix.lookAt(...this.look);
    this.rotateMatrix.setRotate(this.nowAngle, 1, 1, 1);
    this.gl.uniformMatrix4fv(this.mvpM, false, this.mvpMatrix.elements);
    this.draw();
  }
  draw() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.uniformMatrix4fv(this.rotateM, false, this.rotateMatrix.elements);
    this.gl.drawElements(this.gl.TRIANGLES, this.num, this.gl.UNSIGNED_BYTE, 0);
  }
  tick() {
    const newTime = Date.now();
    this.nowAngle = this.nowAngle - (newTime - this.oldTime) * this.speed / 1000.0;
    this.oldTime = newTime;
    this.rotateMatrix.setRotate(this.nowAngle, 1, 1, 1);
    this.draw();
    this.animate = requestAnimationFrame(() => {this.tick()});
  }
  cancel() {
    cancelAnimationFrame(this.animate)
  }

  setLook(param) {
    this.look = param;
    this.mvpMatrix.setPerspective(...this.perspective);
    this.mvpMatrix.lookAt(...this.look);
    this.gl.uniformMatrix4fv(this.mvpM, false, this.mvpMatrix.elements);
    this.draw();

  }
}


export default CubeDraw;
