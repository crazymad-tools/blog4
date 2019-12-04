import React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'dva';
import Fireworks from '../common/Fireworks';
import Request from '@/request';
import Header from '@/pages/components/header';

import './index.scss';

interface Props {
  dispatch: Function;
  articles: any;
}

const Articles: React.FC<Props> = props => {
  useEffect(() => {
    Request.getArticles().then((res: any) => {
      // console.log(res);
      props.dispatch({
        type: 'articles/setArticles',
        payload: {
          articles: res.data.data,
        },
      });
    });
  }, []);

  function enterArticle(article: any) {
    // console.log(`进入文章`, article);
  }

  return (
    <>
      <Header />
      <div className="articles-page">
        <div className="articles-container">
          {props.articles.map((article: any) => {
            return (
              <div
                className="articles-item"
                key={article._id}
                onClick={enterArticle.bind(null, article)}
              >
                <div className="article-item-header">
                  <span className="article-title">{article.title}</span>
                  <span className="article-info">2019 11-01</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default connect((state: any) => {
  let { articles } = state.articles;

  return { articles };
})(Articles);
