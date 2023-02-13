import { Check, Clear, DriveFolderUpload } from "@mui/icons-material"
import { IconButton, TableCell, TableRow, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { apiPost } from "../service"



const AddProduct = ({ products, setProducts, setAddedSwitch }) => {

  const [image, setImage] = useState("")
  const [addUrl, setAddUrl] = useState("")
  const [addFormData, setAddFormData] = useState({
    title: "",
    description: "",
    price: ""
  })


  const handleAddFormChange = (e) => {
    e.preventDefault()

    const fieldName = e.target.name
    const fieldValue = e.target.value
    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData)
  }

  const addImg = (e) => {
    let imgFile = e.target.files[0]
    let url = window.URL.createObjectURL(imgFile)
    setAddUrl(url)
    handleImage(imgFile)
  }

  const handleImage = (file) => {
    // console.log('imageFile', file)
    setImage(file)
  }

  const handleAddSubmit = () => {
    const userToken = localStorage.getItem('react-demo-token')
    const config = {
      headers: {
        token: userToken
      }
    }

    const formData = new FormData()
    formData.append('title', addFormData.title)
    formData.append('description', addFormData.description)
    formData.append('price', addFormData.price)
    image && formData.append('product_image', image)

    apiPost(`products`, formData)
      // axios.post(`https://app.spiritx.co.nz/api/products`, formData, config)
      .then(res => {
        const newProductsData = [res.data, ...products]
        setProducts(newProductsData)
        closeAddProduct()
      })
      .catch(err => console.log(err))
  }

  const closeAddProduct = () => setAddedSwitch(false)



  return (
    <>
      <TableRow>
        <TableCell align="center">
          <TextField name="title" placeholder="Enter a title" onChange={handleAddFormChange} />
        </TableCell>
        <TableCell align="center">
          <TextField name="description" placeholder="Enter a description" onChange={handleAddFormChange} />
        </TableCell>
        <TableCell align="center">
          <TextField type="number" name="price" placeholder="Enter a price" onChange={handleAddFormChange} />
        </TableCell>
        <TableCell align="center">
          <IconButton color="primary" component='label'>
            {
              addUrl ? (
                <img src={addUrl} width="100" height="80" />
              ) : ("")
            }
            <input hidden accept="image/*" type="file" name="product_image" onChange={addImg} />
            <DriveFolderUpload fontSize="large" />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton type='submit' onClick={handleAddSubmit} >
            <Check fontSize="large" color='primary' />
          </IconButton>
          <IconButton onClick={closeAddProduct}>
            <Clear fontSize='large' color='primary' />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}

export default AddProduct