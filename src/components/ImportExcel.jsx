import { Button } from "@mui/material"
import { Upload } from "@mui/icons-material"
import * as XLSX from "xlsx"



const ImportExcel = ({ setProducts }) => {

  const handleImportExcel = (e) => {
    const uploadFile = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.readAsArrayBuffer(uploadFile)
    fileReader.onload = (e) => {
      const bufferArray = e.target.result
      const workbook = XLSX.read(bufferArray, { type: "buffer" })

      /* 返回一个二位数组 */
      const importData = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]], { header: 1 }
      )

      const sliceImportData = importData.slice(1).map((res) =>
        res.reduce((acc, x, i) => {
          acc[importData[0][i]] = x
          return acc
        }, {})
      )



      /* 把二位数组转换为一维数组 */
      // const sliceImportData = importData.slice(1).map(res =>
      //   res.reduce((acc, x, i) => accProduct(acc, x, i), {})
      // )

      // const accProduct = (acc, x, i) => {
      //   acc[importData[0][i]] = x
      //   return acc
      // }

      console.log(importData)
      console.log(sliceImportData)

      setProducts(sliceImportData)
    }
  }



  return (
    <>
      <Button component="label">
        <input type="file" hidden onChange={(e) => handleImportExcel(e)} />
        <Upload />
      </Button>
    </>
  )
}

export default ImportExcel