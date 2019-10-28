import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

export default function codeParse (code) {
  // return hljs.highlightBlock('function a () {}');
  let dom = document.createElement('span');
  dom.innerHTML = code;
  // return hljs.highlightBlock(dom);
  let res = hljs.highlightAuto(code).value;
  return res;
  // console.log(res);
  // // return res;
  // // return code;
}