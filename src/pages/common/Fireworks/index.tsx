import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Coordinate from '@/utils/Coordinate';
import Drawer from './Drawer';
import './index.scss';

interface Props {
    width: any,
    height: any;
}
let drawer: any = null;

const Fireworks: React.FC<Props> = props => {
  const canvas = useRef(null);

  useEffect(() => {
    drawer = new Drawer(canvas.current);
  }, []);

  function work (e: any) {
    let {x, y} = Coordinate.getClickOffset(e);
    drawer.start(x, y);
  }

  return (
    <canvas className="fireworks" ref={canvas} onClick={work} width={props.width} height={props.height} />
  );
}

export default Fireworks;
