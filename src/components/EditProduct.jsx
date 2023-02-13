import { Check, Clear, DriveFolderUpload } from "@mui/icons-material"
import { IconButton, TableCell, TableRow, TextField } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { apiPost, apiPut } from "../service"
import { BaseImgUrl } from "../environment"



const EditProduct = ({ products, setProducts, product, setEditProductId, editFormData, setEditFormData }) => {

  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const [disable, setDisable] = useState(true)


  const onTextChange = (e) => {
    setDisable(false)
    handleEditFormChange(e)
  }

  const handleEditFormChange = (e) => {
    e.preventDefault()

    setEditFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleImgChange = (e) => {
    let file = e.target.files[0]
    let url = window.URL.createObjectURL(file)
    setUrl(url)
    setImage(file)
    setDisable(false)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    editFormData.title && formData.append('title', editFormData.title)
    editFormData.description && formData.append('description', editFormData.description)
    editFormData.price && formData.append('price', editFormData.price)
    image && formData.append('product_image', image)
    formData.append('_method', 'put')

    apiPost(`product/${editFormData.id}`, formData)
      // apiPut(`product/${editFormData.id}`, formData)
      // axios.post(`https://app.spiritx.co.nz/api/product/${editFormData.id}`, formData)
      .then((res) => {
        const newData = [...products]
        const index = products.findIndex((product) => product.id === editFormData.id)
        newData[index] = res.data
        setProducts(newData)
        setEditProductId(null)
      })
      .catch((err) => console.log(err))
  }

  const handleEditCancel = () => setEditProductId(null)



  return (

    <>
      <TableRow>
        <TableCell align="center">
          <TextField name="title" defaultValue={editFormData.title} onChange={onTextChange} />
        </TableCell>
        <TableCell align="center">
          <TextField name="description" defaultValue={editFormData.description} onChange={onTextChange} />
        </TableCell>
        <TableCell align="center">
          <TextField type="number" name="price" defaultValue={editFormData.price} onChange={onTextChange} />
        </TableCell>
        <TableCell align="center">
          <IconButton color="primary" component='label'>
            <img src={url ? url : `${BaseImgUrl}${product.product_image}`} width="100" height="80" />
            <input hidden accept="image/*" type="file" name="product_image" onChange={handleImgChange} />
            <DriveFolderUpload fontSize="large" />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton type='submit' disabled={disable} onClick={handleEditSubmit}>
            <Check fontSize="large" color={disable ? 'disabled' : 'primary'} />
          </IconButton>
          <IconButton onClick={handleEditCancel}>
            <Clear fontSize='large' color='primary' />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}

export default EditProduct

