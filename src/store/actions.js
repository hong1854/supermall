import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutations-type'
export default {
  add(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNT, oldProduct)
        resolve('添加购物车成功')
      } else {
        context.commit(ADD_TO_CART, payload)
        // context.state.cartList.push(payload)
        resolve('添加购物车成功')
      }
    })

  }
}