export function total(cart){return cart.reduce((sum,item)=>sum+item.price*item.qty,0)}
export function count(cart){return cart.reduce((sum,item)=>sum+item.qty,0)}
export function clear(){localStorage.removeItem('chronos-cart')}