import { createStore } from 'vuex'
import event from './modules/event'
import sys from './modules/sys'

export const store = createStore({
  modules: {
    sys
  }
})
