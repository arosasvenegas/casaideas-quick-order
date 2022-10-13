import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from 'react-apollo'
import UPDATE_CART from '../graphql/updateCart.graphql'
import GET_PRODUCT from '../graphql/getProductBySku.graphql'

const QuickOrder = () => {
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("")

  const [getProductData, { data: product }] = useLazyQuery(GET_PRODUCT)
  const [addToCart] = useMutation(UPDATE_CART)

  const handleChange = (event: any) => {
    setInputText(event.target.value)
    console.log("Input changed", inputText);
  }

  useEffect(() => {
    console.log("el resultado producto es", product, search);
    if (product) {
      let skuId = parseInt(inputText)
      addToCart({
        variables: {
          salesChannel: "1",
          items: [
            {
              id: skuId,
              quantity: 1,
              seller: "1"
            }
          ]
        }
      })
        .then(() => {
          window.location.href = "/checkout"
        })
    }
  }, [product, search])


  const addProductToCart = () => {
    getProductData({
      variables: {
        sku: inputText
      }
    })
  }

  const searchProduct = (event: any) => {
    event.preventDefault();
    if (!inputText) {
      alert("se ingreso algo")
    } else {
      setSearch(inputText)
      addProductToCart()
    }
  }
  return <div>
    <h2>Compra rapida de casa ideas</h2>
    <form onSubmit={searchProduct}>
      <div>
        <label htmlFor='sku'> Ingresa el numero de SKU</label>
        <input id='sku' type='text' onChange={handleChange}></input>
      </div>
      <input type='submit' value='AÑADIR AL CARRITO' />
    </form>
  </div>
}

export default QuickOrder
