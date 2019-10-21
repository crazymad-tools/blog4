import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Coordinate from '@/utils/Coordinate';
import Drawer from './Drawer';
import './index.scss';

interface Props {}

const Fireworks: React.FC<Props> = props => {

  const canvas = useRef(null);

  useEffect(() => {
    let drawer = new Drawer(canvas.current);
  }, []);

  function work (e: any) {
    let {x, y} = Coordinate.getClickOffset(e);
  }

  return (
    <canvas className="fireworks" ref={canvas} onClick={work}/>
  );
}

export default Fireworks;
