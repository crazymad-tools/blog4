import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        {
          path: '/auth', component: '../pages/auth'
        }, {
          path: '/articles', component: '../pages/articles' 
        }, {
          path: '/system', component: '../pages/system'
        }, {
          path: '/game/rpg', component: '../pages/game/rpg'
        },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: true,
      dynamicImport: false,
      title: 'blog4',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  cssLoaderOptions: {
    localIdentName: '[local]'
  }
}

export default config;
