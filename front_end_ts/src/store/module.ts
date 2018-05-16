import { Commit } from 'vuex';
interface State {
  name: string,
    age: number
}

const state: State = {
  name: '测试一下',
  age: NaN
}

const getters = {
    name: (state: State) => state.name,
    age: (state: State) => state.age,
}

const mutations = {
  SET_NAME(state: State, res: State): void {
    state = {
      ...state,
      ...res
    };
  },
  SET_AGE(state: State, res: State): void {
    state = {
      ...state,
      ...res
    };
  }
}

const actions = {
    setName (context: {commit: Commit}, res: any) {
        context.commit('SET_NAME', res);
     },
    setAge (context: {commit: Commit}, res: any) {
        context.commit('SET_NAME', res);
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}