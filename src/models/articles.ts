import Request from '@/request';

export default {
  namespace: 'articles',
  state: {
    articles: []
  },
  reducers: {
    setArticles(state: any, { payload: { articles } }: { payload: { articles: any[] } }) {
      return { ...state, articles }
    }
  }
}
