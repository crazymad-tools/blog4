/**
 * Webgl tool function
 */
export default class WebglUtils {
  /**
   * create vertex shader or fragment shader
   * @param {WebGLRenderingContext} gl 
   * @param {GLenum} type 
   * @param {string} source 
   */
  static createShader(gl: WebGLRenderingContext, type: GLenum, source: string): any {
    try {
      let shader: WebGLShader | null = gl.createShader(type);
      if (!shader) throw {
        message: 'create shader fail!',
        shader: shader
      };

      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (success) {
        return shader;
      } else {
        throw {
          message: 'create shader fail!',
          shader: shader
        };
      }
    } catch (e) {
      // console.log(e.messasge);
      gl.deleteShader(e.shader);
      return null;
    }
  }

  /**
   * link shader to render program
   * @param {WebGLRenderingContext} gl 
   * @param {WebGLShader} vertexShader 
   * @param {WebGLShader} fragmentShader 
   */
  static createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    try {
      let program: WebGLProgram | null = gl.createProgram();
      if (!program) throw {
        message: 'create program fail!',
        program: program
      };

      // link shader program
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      // check program compile status
      let success: any = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (success) {
        return program;
      } else {
        throw {
          message: 'create program fail!',
          program: program
        };
      }
    } catch (e) {
      // console.log(e);
      gl.deleteProgram(e.program);
      return null;
    }
  }
}
