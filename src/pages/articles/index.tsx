import React from 'react';
import { useEffect, useState } from 'react';
import Fireworks from '../common/Fireworks';

import './index.scss';

interface Props {}

const articles: any[] = [
  {
    id: '1',
    title: '文章文章文章文章文章文章文章文章01',
  },
  {
    id: '2',
    title: '文章02',
  },
  {
    id: '3',
    title: '文章03',
  },
  {
    id: '4',
    title: '文章文章文章文章文章文章文章文章01',
  },
  {
    id: '5',
    title: '文章02',
  },
  {
    id: '6',
    title: '文章03',
  },
  {
    id: '7',
    title: '文章03',
  },
  {
    id: '8',
    title: '文章文章文章文章文章文章文章文章01',
  },
  {
    id: '9',
    title: '文章02',
  },
  {
    id: '10',
    title: '文章03',
  },
];

const Articles: React.FC<Props> = props => {
  return (
    <div className="articles-page">
      <Fireworks width="100%" height="100%" />
      {/* <svg>
        <g fill="rgba(106,127,239,0.1)">
          <path d="M 0 70 Q 75 39, 150 70 T 300 70 T 450 70 T 600 70 T 750 70 V 100 H 0 V 0"></path>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            from="0"
            to="-300"
            dur="1.5s"
            repeatCount="indefinite"
          ></animateTransform>
        </g>
        <g fill="rgba(106,127,239,0.15)">
          <path d="M 0 70 Q 87.5 47, 175 70 T 350 70 T 525 70 T 700 70 T 875 70 T 1050 70 V 100 H 0 V 0"></path>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            from="0"
            to="-350"
            dur="3s"
            repeatCount="indefinite"
          ></animateTransform>
        </g>
        <g fill="rgba(106,127,239,0.18)" transform="translate(-903.868 0)">
          <path
            d="M 0 70 Q 135 36, 270 70 T 540 70 T 810 70 T 1080 70 V 100 H 0 V 0"
            transform="translate(-38.232284367796474, 0)"
          ></path>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            from="0"
            to="-540"
            dur="2s"
            repeatCount="indefinite"
          ></animateTransform>
        </g>
      </svg> */}
      <div className="articles-container">
        {articles.map((article: any) => {
          return (
            <div className="articles-item" key={article.id}>
              <div className="article-item-header">
                <span className="article-title">{article.title}</span>
                <span className="article-info">2019 11-01</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Articles;
