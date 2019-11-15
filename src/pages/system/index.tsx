import React from 'react';
import { useEffect, useState } from 'react';
import TaskBar from './taskbar';
import './index.scss';

interface Props {}

const Articles: React.FC<Props> = props => {
  return (
    <div className="system-page">
      
      <TaskBar />
    </div>
  );
};

export default Articles;
