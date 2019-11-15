import React from 'react';
import { useEffect, useState } from 'react';
import './index.scss';

interface Props {}

const TaskBar:React.FC<Props> = props => {

  return (
    <div className="taskbar-container">
      <span id="startBtn" className="iconfont cm-icon-application taskbar-btn" />
    </div>
  )
}

export default TaskBar;
