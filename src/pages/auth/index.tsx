import React from 'react';
import { useEffect, useState } from 'react';
import './index.scss';

interface Props {}

const IMAGE_LIST = ['/img/kokomi/01_low.jpg', '/img/kokomi/02_low.jpg', '/img/kokomi/03_low.jpg'];

const LoginPage: React.FC<Props> = props => {
  const [animationImg, setAnimatinImg] = useState<any>(null);
  const [currentImg, setCurrentImg] = useState<any>(0);
  const [imgTransform, setImgTransform] = useState<string>(
    'perspective(1000px) rotate3d(0, 1, 0, 15deg)',
  );
  const [formTransform, setFormTransform] = useState<string>(
    'perspective(1000px) rotate3d(0, 1, 0, -15deg)',
  );
  let last: number = new Date().getTime();

  useEffect(() => {
    let timer = setInterval(() => {
      updateImg();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  });

  function updateImg() {
    setAnimatinImg(currentImg);
    setCurrentImg((currentImg + 1) % IMAGE_LIST.length);
  }

  function updateTransform(e: any, key: string) {
    if (new Date().getTime() - last < 100) return;

    last = new Date().getTime();
    let parent = e.currentTarget;
    let offsetTop = parent.offsetTop;
    let offsetLeft = parent.offsetLeft;
    while ((parent = parent.offsetParent)) {
      offsetTop += parent.offsetTop;
      offsetLeft += parent.offsetLeft;
    }
    let x = (e.clientX - offsetLeft) / e.currentTarget.clientWidth;
    let y = (e.clientY - offsetTop) / e.currentTarget.clientHeight;
    if (key === 'img') {
      setImgTransform(`perspective(1000px) rotate3d(${0.5 - y}, 0.1, 0, ${1 + x * 5}deg)`);
    } else if (key === 'form') {
      setFormTransform(`perspective(1000px) rotate3d(${y - 0.5}, 0.0, 0, -${1 + x * 5}deg)`);
    }
  }

  function resetTransform() {
    setImgTransform(`perspective(1000px) rotate3d(0, 1, 0, 15deg)`);
    setFormTransform(`perspective(1000px) rotate3d(0, 1, 0, -15deg)`);
  }

  return (
    <div className="auth-page">
      <div className="auth-page-half" tabIndex={-1}>
        <div
          className="auth-page-bg"
          style={{ transform: imgTransform }}
          onMouseMove={e => updateTransform(e, 'img')}
          onMouseLeave={resetTransform}
          onClick={updateImg}
        >
          {IMAGE_LIST.map((image: string, index: any) => (
            <img
              src={image}
              key={index}
              className={`${animationImg === index ? 'animation' : ''} ${
                currentImg === index ? 'current' : ''
              }`}
            />
          ))}
        </div>
      </div>
      <div className="auth-page-half" tabIndex={-1}>
        <div
          className="auth-form"
          style={{ transform: formTransform }}
          onMouseMove={e => updateTransform(e, 'form')}
          onMouseLeave={resetTransform}
        >
          <div className="auth-form-row">
            <input className="blog-input" placeholder="账号" />
          </div>
          <div className="auth-form-row">
            <input className="blog-input" type="password" placeholder="密码" />
          </div>
          <div className="auth-form-row">
            <button>登录</button>
          </div>
          <div className="auth-form-row">
            <span>前往注册</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
