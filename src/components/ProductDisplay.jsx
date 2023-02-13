import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { Box, Button, IconButton, Paper, TableSortLabel } from '@mui/material';
import { AddCircle, Delete, Download, Edit, Upload } from '@mui/icons-material';
import AddProduct from './AddProduct';
import DelProduct from './DelProduct';
import EditProduct from './EditProduct';
import ImportExcel from './ImportExcel';
import ExportExcel from './ExportExcel';
import { BaseImgUrl, BaseUrl } from '../environment';
import { apiGet } from '../service';



const ProductDisplay = ({ searchKeyWord }) => {

  const boxStyle = { width: '88%', padding: '0 100px 0 100px' }
  const paperStyle = { width: '100%', mb: 2 }
  const headStyle = { fontWeight: 600 }
  const iconButtonStyle = { backgroundColor: '#2149e4', color: 'white', margin: '0 10px' }

  const [products, setProducts] = useState([])
  const [searchProducts, setSearchProducts] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('price');
  const [addedSwitch, setAddedSwitch] = useState(false)
  const [open, setOpen] = useState(false)
  const [productId, setProductId] = useState(null)
  const [editProductId, setEditProductId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    id: '',
    category_id: '99',
    title: '',
    description: '',
    price: '',
    product_image: ''
  })

  const headCells = [
    { name: "title", label: "Title" },
    { name: "description", label: "Description" },
    { name: "price", label: "Price" },
    { name: "product_image", label: "Photo" },
    { name: "action", label: "Action" },
  ]


  /* 向后端请求数据 */
  useEffect(() => {
    apiGet("products")
      // axios.get("https://app.spiritx.co.nz/api/products")
      .then(res => {
        setProducts(res.data)
        setSearchProducts(res.data)
      })
      .catch(err => console.log(err))
  }, [])


  /* 分页 */
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(0)
  }

  const handlePageChange = (e, newPage) => {
    setPage(newPage)
  }


  /* 排序 */
  const handleSortLabel = (headCellName) => {
    const isAsc = orderBy === headCellName && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(headCellName)
  }

  const getComparator = (order, orderBy) => {
    if (orderBy != "price") {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    } else if (orderBy == "price") {
      return order === 'desc'
        ? (a, b) => priceComparator(a, b, orderBy)
        : (a, b) => -priceComparator(a, b, orderBy);
    }
  }

  const descendingComparator = (a, b, orderBy) => {
    if (a[orderBy] > b[orderBy]) {
      return -1
    } else if (a[orderBy] < b[orderBy]) {
      return 1
    } else {
      return 0
    }
  }

  const priceComparator = (a, b, orderBy) => {
    let n1 = parseInt(a[orderBy])
    let n2 = parseInt(b[orderBy])
    return n2 - n1
  }


  /* 添加产品 */
  const handleAddProduct = () => setAddedSwitch(!addedSwitch)


  /* 删除产品 */
  const handleDelClick = (productId) => {
    setOpen(true)
    setProductId(productId)
  }


  /* 修改产品 */
  const handleEditClick = (product) => {
    const formValues = {
      id: product.id,
      category_id: product.category_id,
      title: product.title,
      description: product.description,
      price: product.price,
      product_image: product.image
    }
    setEditProductId(product.id)
    setEditFormData(formValues)
  }


  /* 查询产品 */
  useEffect(() => {
    setProducts(
      searchProducts.filter((product) => {
        if (searchKeyWord === "") {
          return product
        } else if (product.title.includes(searchKeyWord) || product.description.includes(searchKeyWord) || product.price.toString().includes(searchKeyWord)) {
          return product
        }
      })
    )
  }, [searchKeyWord])



  return (
    <>
      <Box sx={boxStyle}>
        <Button><AddCircle fontSize='large' onClick={handleAddProduct} /></Button>
        <ImportExcel setProducts={setProducts} />
        <ExportExcel products={products} />
        <Paper sx={paperStyle}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {
                    headCells.map((headCell, index) => (
                      <TableCell
                        key={index}
                        sx={headStyle}
                        align='center'>
                        {headCell.label}
                        <TableSortLabel
                          direction={orderBy === headCell.name ? order : "asc"}
                          onClick={() => handleSortLabel(headCell.name)}
                        />
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  addedSwitch && (
                    <AddProduct
                      products={products}
                      setProducts={setProducts}
                      setAddedSwitch={setAddedSwitch}
                    />
                  )
                }

                {
                  products.sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product, index) => (
                      editProductId == product.id ? (
                        <EditProduct
                          key={index}
                          products={products}
                          setProducts={setProducts}
                          product={product}
                          setEditProductId={setEditProductId}
                          editFormData={editFormData}
                          setEditFormData={setEditFormData}
                        />
                      ) : (
                        <TableRow key={index}>
                          <TableCell align='center'>{product.title}</TableCell>
                          <TableCell align='center'>{product.description}</TableCell>
                          <TableCell align='center'>{product.price}</TableCell>
                          <TableCell align='center'>
                            <img src={`${BaseImgUrl}${product.product_image}`} width="100" height="80" />
                          </TableCell>
                          <TableCell align='center'>
                            <IconButton
                              sx={iconButtonStyle}
                              onClick={() => handleEditClick(product)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              sx={iconButtonStyle}
                              onClick={() => handleDelClick(product.id)}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={products.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handlePageChange}
          />
          <DelProduct
            open={open}
            setOpen={setOpen}
            products={products}
            setProducts={setProducts}
            productId={productId}
          />
        </Paper>
      </Box>
    </>
  )
}

export default ProductDisplay