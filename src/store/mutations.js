import {
  ADD_COUNT,
  PUSH_CART,
  CHANGE_CHECK,
  CHECKED_ALL_TRUE,
  CHECKED_ALL_FALSE,
} from './mutation-types'
export default {
  [ADD_COUNT](state, payload) {
    payload.count++
    // console.log("增加了旧的商品数量");
  },
  [PUSH_CART](state, payload) {
    state.cartList.push(payload)
    payload.checked = true
    // console.log("增加了新的商品到购物车", state.cartList);
  },
  [CHANGE_CHECK](state, payload) {
    state.cartList.map(item => {
      if (item.iid === payload) {
        item.checked = !item.checked
      }
    })
  },
  [CHECKED_ALL_TRUE](state) {
    state.cartList.forEach(item => (item.checked = true));
  },
  [CHECKED_ALL_FALSE](state) {
    state.cartList.forEach((item) => (item.checked = false));
  }
}
