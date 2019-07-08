export interface StoreState {
  isAuthorized: boolean,
  name: string,
  news: Array<object>,
}
export interface User {
  isAuthorized: boolean,
  name: string,
}

export const constants = {
  setUser: 'SET_USER',
  getNews: 'GET_NEWS',
}

const initState = {
  isAuthorized: false,
  name: '',
  news: [],
}

export default (state: StoreState = initState, action ): StoreState => {
  const { payload } = action;
  switch (action.type) {
    case constants.setUser:
      return { ...state, isAuthorized: true, name: payload.name };
    case constants.getNews:
      return { ...state, news: payload };
    default: return state;
  }
}