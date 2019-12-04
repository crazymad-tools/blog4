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
    drawer.start();
  }, []);

  return (
    <canvas className="rain" ref={canvas} width={props.width} height={props.height} />
  );
}

export default Fireworks;
