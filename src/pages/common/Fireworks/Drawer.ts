import WebglUtils from '@/utils/webgl';

/**
 * vertex shader code
 */
const vertexText = `
attribute vec4 a_position;

void main () {
  gl_PointSize  = 10.0;
  // gl_Position = vec4(0.5, 0.5, 1.0, 1.0);
  gl_Position = a_position;
}
`;

/**
 * fragment shader code
 */
const fragmentText = `
precision mediump float;

void main () {
  gl_FragColor = vec4(1, 0, 0.5, 1); 
}
`;

export default class Drawer {
  private gl: WebGLRenderingContext;

  private program: any;

  private positionAttributeLocation: any;

  constructor(canvas: any) {
    this.gl = canvas.getContext('webgl');

    let gl = this.gl;
    gl.canvas.width = canvas.clientWidth;
    gl.canvas.height = canvas.clientHeight;

    let vertexShader: WebGLShader = WebglUtils.createShader(gl, gl.VERTEX_SHADER, vertexText);
    let fragmentShader: WebGLShader = WebglUtils.createShader(gl, gl.FRAGMENT_SHADER, fragmentText);
    if (vertexShader === null || fragmentShader === null) {
      throw 'create webgl renderer fail!';
    }
    let program = WebglUtils.createProgram(gl, vertexShader, fragmentShader);
    this.program = program;
    if (program === null) {
      throw 'create webgl renderer fail';
    }
  }

  /**
   * start render frame
   **/
  start() {
    // TODO reset
    window.requestAnimationFrame(() => this._update());
  }

  /**
   * render frame
   */
  private _update() {
    window.requestAnimationFrame(() => this._update());
    let gl = this.gl;
    let canvas: any = this.gl.canvas;
    gl.canvas.width = canvas.clientWidth;
    gl.canvas.height = canvas.clientHeight;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.7, 0.7, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.program);

    this.positionAttributeLocation = gl.getAttribLocation(this.program, 'a_position');
    gl.enableVertexAttribArray(this.positionAttributeLocation);
    let positionBuffer = gl.createBuffer();
    let positions = [
      0, 0,
      0, 0.5,
      0.7, 0,
    ];
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.vertexAttribPointer(
      this.positionAttributeLocation, size, type, normalize, stride, offset
    );

    gl.drawArrays(gl.POINTS, 0, 3);
  }
}
