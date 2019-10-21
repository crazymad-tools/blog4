export default class Coordinate {
  static getClickOffset (e: any) {
    let parent = e.currentTarget;
    let offsetTop = parent.offsetTop;
    let offsetLeft = parent.offsetLeft;
    while ((parent = parent.offsetParent)) {
      offsetTop += parent.offsetTop;
      offsetLeft += parent.offsetLeft;
    }
    let x = (e.clientX - offsetLeft) / e.currentTarget.clientWidth;
    let y = (e.clientY - offsetTop) / e.currentTarget.clientHeight;

    return {
      offsetTop,
      offsetLeft,
      x,
      y
    };
  }
}
