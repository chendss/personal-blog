import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    strict: false,
    state: () => ({
      home: {
        cover: 'https://ae01.alicdn.com/kf/H2505f877399c4bb3b28c4c62c3775134j.jpg',
        articleNumber: 10,
      }
    }),
    mutations: {
      async init (state) {
        state.counter++
      }
    }
  })
}

export default createStore