import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import axios from "axios";
import { apiDelete } from "../service"



const DelProduct = ({ open, setOpen, products, setProducts, productId }) => {

  const handleDelProduct = (productId) => {

    const userToken = localStorage.getItem('react-demo-token')

    const config = {
      headers: {
        token: userToken
      }
    }

    apiDelete(`product/${productId}`)
      // axios.delete(`https://app.spiritx.co.nz/api/product/${productId}`, config)
      .then((res) => {
        const newProducts = [...products]
        const index = products.findIndex((product) => product.id === productId)
        newProducts.splice(index, 1)
        setProducts(newProducts)
        handleClose()
      })
      .catch((err) => console.log(err))
  }

  const handleClose = () => setOpen(false)



  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Confirm Deletion ?</DialogTitle>
        {/* <DialogContent>
          <DialogContentText>
            are you sure ?
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={() => { handleDelProduct(productId) }}>confirm</Button>
          <Button onClick={handleClose}>cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DelProduct