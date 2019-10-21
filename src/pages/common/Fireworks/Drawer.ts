export default class Drawer {
  private gl: WebGLRenderingContext;

  constructor(canvas: any) {
    this.gl = canvas.getContext('webgl');
  }
}
