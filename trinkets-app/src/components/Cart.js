import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [cart, setCart] = useState([])
  const { userId } = useParams()

  useEffect(() => {
    console.log(userId)
    axiosWithAuth()
      .get(`/users/${userId}/cart`)
      .then(res => {
        console.log('YOUR CART -->', res)
        setCart(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <h3>Your Cart</h3>
      <Link to='/shop'>Shop</Link>
      {cart.length === 0 ? (
        <h4>Your cart is empty</h4>
      ) : (
        cart.map(item => (
          <div key={item.id} className='border p-2 m-2'>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.description}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Cart
