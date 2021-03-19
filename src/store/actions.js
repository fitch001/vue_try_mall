import {
  ADD_COUNT,
  PUSH_CART
} from './mutation-types'

export default {
  // contex ： state + payload
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 判断是否是新的商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 是旧的商品的话就count加1
      if (oldProduct) {
        context.commit(ADD_COUNT, oldProduct)
        resolve("当前的商品数量+1")
      } else {
        // 新的商品就添加到列表中并赋值count为1
        payload.count = 1
        context.commit(PUSH_CART, payload)
        resolve("添加了新的商品")
      }
    })

  }
}
