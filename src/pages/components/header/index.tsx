import React, { useState } from 'react';
import './index.scss';

interface Props {}

const Header: React.FC<Props> = props => {
  const [list, setList] = useState<any[]>([
    {
      name: '首页',
      active: true,
    },
    {
      name: '分类',
      active: false,
    },
  ]);

  return (
    <div className="header-container">
      {list.map((item: any) => (
        <div className="header-item">
          {[...Array(item.name.length).keys()].map((index: number) => (
            <span>{item.name.substring(index, index + 1)}</span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Header;
