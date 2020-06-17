import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'


const Shop = () => {
  const [shop, setShop] = useState([])
  const userId = localStorage.getItem("ID")

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    axiosWithAuth()
      .get('/shop')
      .then(res => {
        console.log(res)
        setShop(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axiosWithAuth()
      .get(`/users/${userId}`)
      .then(res => {
        console.log('THE USER -->', res)
        if(res.data.username === 'admin'){
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {

  }, [])

  const addToCart = (item) => {
    // console.log(userId)
    const selectedItem = {
        name: item.name,
        price: item.price,
        description: item.description
    }

    axiosWithAuth().post(`/users/${userId}/cart`, selectedItem)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
  }

  function logOut () {
    localStorage.clear()
  }

  return (
    <div>
      <h3>THE SHOP</h3>
      <Link to={`/${userId}/cart`}>View Cart</Link>
      <Link onClick={logOut} to='/' style={{cursor: "pointer", color: "lightblue"}}>Log Out</Link>
      {isAdmin && <Link to='/add-item' style={{cursor: "pointer", color: "lightgreen"}}>Add an Item</Link>}
      

      {
          shop.length === 0 
            ? <h2>Nothing in the store right now, try again later</h2> 
            : shop.map(item => (
                <div key={item.id} className="border p-2 m-2">
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{item.description}</p>
                    <Button onClick={() => addToCart(item)}>Add to Cart</Button>
                </div>
            ))
      }
    </div>
  )
}

export default Shop
