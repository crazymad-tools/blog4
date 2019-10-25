import WebglUtils from '@/utils/webgl';

/**
 * vertex shader code
 */
const vertexText = `
attribute vec4 a_position;
attribute vec4 a_color;
uniform vec3 u_offset;
varying vec4 v_color;

void main () {
  gl_PointSize = 2.0;
  // y = ax*x + bx
  float y = u_offset.x * u_offset.x * a_position.x + u_offset.x * a_position.y + u_offset.z;
  float x = u_offset.x * a_position.z * a_position.w + u_offset.y;
  gl_Position = vec4(x, y, 1.0, 1.0);
  v_color = a_color;
}
`;

/**
 * fragment shader code
 */
const fragmentText = `
precision mediump float;
varying vec4 v_color;

void main () {
  gl_FragColor = v_color; 
}
`;

const POINT_COUNT = 100;

class RenderParam {
  x: number = 0;

  param: number[] = [];

  colors: number[] = [];

  offsetX: number = 0;

  offsetY: number = 0;

  constructor (offsetX: number, offsetY: number) {
    this.offsetX = (offsetX - 0.5) * 2;
    this.offsetY = -(offsetY - 0.5) * 2;

    for (let i = 0; i < POINT_COUNT; i++) {
      this.param.push(-20 * (Math.random()) - 30);
      this.param.push(10 * (Math.random() - 0.5));
      this.param.push(Math.random() - 0.5 < 0 ? -1 : 1);
      this.param.push(Math.random() * 2.0);
      this.colors.push(Math.random(), Math.random(), Math.random(), 1.0);
    }
  }
}

export default class Drawer {
  private gl: WebGLRenderingContext;

  private program: any;

  private params: RenderParam[] = [];

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

    window.requestAnimationFrame(() => this._update());
  }

  /**
   * start render frame
   **/
  start(offsetX: number, offsetY: number) {
    this.params.push(new RenderParam(offsetX, offsetY));
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
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    this.params.forEach((param: RenderParam) => {
      gl.useProgram(this.program);
      // x轴参数
      var xLoc = gl.getUniformLocation(this.program, 'u_offset');
      gl.uniform3f(xLoc, param.x += 0.004, param.offsetX, param.offsetY);                 // float

      // 二次函数参数
      let positionAttributeLocation = gl.getAttribLocation(this.program, 'a_position');
      gl.enableVertexAttribArray(positionAttributeLocation);
      let positionBuffer = gl.createBuffer();
      
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(param.param), gl.STATIC_DRAW);

      let size = 4;
      let type = gl.FLOAT;
      let normalize = false;
      let stride = 0;
      let offset = 0;
      gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset
      );

      // 颜色参数 
      let colorLoc = gl.getAttribLocation(this.program, 'a_color');
      gl.enableVertexAttribArray(colorLoc);
      let colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(param.colors), gl.STATIC_DRAW);

      size = 4;
      type = gl.FLOAT;
      normalize = false;
      stride = 0;
      offset = 0;
      gl.vertexAttribPointer(
        colorLoc, size, type, normalize, stride, offset
      );

      // 绘制 
      gl.drawArrays(gl.POINTS, 0, POINT_COUNT);

      if (param.x > 0.3) {
        let index = this.params.findIndex((item: RenderParam) => param === item);
        this.params.splice(index, 1);
      }
    });
  }
}
