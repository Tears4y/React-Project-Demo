import { Download } from "@mui/icons-material"
import { Button } from "@mui/material"
import * as XLSX from "xlsx"



const ExportExcel = ({ products }) => {

  const handleExportExcel = () => {
    /* convert state data to a workbook */
    const worksheet = XLSX.utils.json_to_sheet(products)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products")

    /* generate an XLSX file */
    XLSX.writeFile(workbook, "productList.xlsx")
  }



  return (
    <>
      <Button onClick={() => handleExportExcel()}>
        <Download />
      </Button>
    </>
  )
}

export default ExportExcel