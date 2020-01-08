import { initShaders } from '../lib/cuon-utils';
import { Matrix4 } from '../lib/cuon-matrix';

class AnimatePentagram {
  vs =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color;\n' +
    'uniform mat4 rotate;\n' +
    'void main() {\n' +
    'gl_Position = rotate * a_Position;\n' +
    'v_Color = a_Color;\n' +
    '}\n';

  fs =
    'precision mediump float;\n' +
    'varying vec4 v_Color;\n' +
    'void main () {\n' +
    'gl_FragColor = v_Color;\n' +
    '}\n';
  constructor(gl, speed, type) {
    this.gl = gl;
    this.speed = speed;
    this.type = type;
    this.oldTime = Date.now();
    this.nowAngle = 0.0;
    this.d = true;
    this.init();
  }
  init() {
    const gl = this.gl;
    if (!gl) {
      return
    }
    if (!initShaders(gl, this.vs, this.fs)) {
      return
    }
    if (this.type === 5) {
      const a = 18.0;
      const b = 54.0;
      const arc = Math.PI / 180;
      this.vertices = new Float32Array([
        0.0, 1.0, 0.3, 0.6, 0.8,
        -Math.cos(b * arc) , -Math.sin(b * arc) , 0.3, 0.6, 0.8,
        Math.cos(a * arc) , Math.sin(a * arc) , 0.2, 0.4, 0.7,
        -Math.cos(a * arc) , Math.sin(a * arc) , 0.2, 0.4, 0.7,
        Math.cos(b * arc) , -Math.sin(b * arc) , 0.5, 0.1, 0.2,
      ])
    } else {
      const getArc = this.getArc;
      const r = Math.sin(18 * Math.PI / 180) / Math.sin(36 * Math.PI / 180);
      this.vertices = new Float32Array([
        Math.cos(getArc(0)) , Math.sin(getArc(0)) , 0.2, 0.4, 0.7,
        r * Math.cos(getArc(0, 1)) , r * Math.sin(getArc(0, 1)) , 0.2, 0.4, 0.7,
        Math.cos(getArc(1)) , Math.sin(getArc(1)) , 0.7, 0.8, 0.9,
        r * Math.cos(getArc(1, 1)) , r * Math.sin(getArc(1, 1)) , 0.2, 0.4, 0.7,
        Math.cos(getArc(2)) , Math.sin(getArc(2)) , 0.9, 0.6, 0.3,
        r * Math.cos(getArc(2, 1)) , r * Math.sin(getArc(2, 1)) , 0.2, 0.4, 0.7,
        Math.cos(getArc(3)) , Math.sin(getArc(3)) , 0.3, 0.4, 0.5,
        r * Math.cos(getArc(3, 1)) , r * Math.sin(getArc(3, 1)) , 0.2, 0.4, 0.7,
        Math.cos(getArc(4)) , Math.sin(getArc(4)) , 0.5, 0.6, 0.7,
        r * Math.cos(getArc(4, 1)) , r * Math.sin(getArc(4, 1)) , 0.2, 0.4, 0.7,
      ])
    }
    this.rotateMatrix = new Matrix4();
    this.rotate = gl.getUniformLocation(gl.program, 'rotate');
    this.initBuffer();
  }
  getArc(k, type) {
    const a = 72.0;
    const b = 36.0;
    const arc = Math.PI / 180;
    if (type) {
      return (a * k + b) * arc;
    }
    return a * k *arc;
  }
  initBuffer() {
    const gl = this.gl;
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      return -1;
    }
    const SIZE = this.vertices.BYTES_PER_ELEMENT;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, SIZE * 5, 0);
    gl.enableVertexAttribArray(a_Position);

    const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 2, gl.FLOAT, false, SIZE * 5, SIZE * 2);
    gl.enableVertexAttribArray(a_Color);

    if (this.type === 5) {
      this.n = 5;
    } else {
      this.n = 10;
    }
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    this.tick();

  }
  tick() {
    const newTime = Date.now();
    if (!this.d) {
      this.nowAngle = this.nowAngle - (newTime - this.oldTime) * this.speed / 1000.0;
    } else {
      this.nowAngle = this.nowAngle + (newTime - this.oldTime) * this.speed / 1000.0;
    }
    this.oldTime = newTime;
    this.draw();
    requestAnimationFrame(() => {this.tick()});
  }
  draw() {
    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.rotateMatrix.setRotate(this.nowAngle, 0, 0, 1);
    gl.uniformMatrix4fv(this.rotate, false, this.rotateMatrix.elements);
    gl.drawArrays(gl.LINE_LOOP, 0, this.n);
  }
  changeSpeed(s) {
    this.speed = s;
    this.tick();
  }
  direction(d) {
    this.d = d;
    this.tick();
  }

}

export default AnimatePentagram;
