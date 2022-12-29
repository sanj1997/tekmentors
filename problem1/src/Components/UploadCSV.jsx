import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import {styles} from "../Styles/uploadStyles"

import {useCSVReader} from "react-papaparse"
const TaxRate={
    0:15,
    1:8,
    2:12
}
const UploadCSV = () => {
  const { CSVReader } = useCSVReader();
  const [data,setData]=useState([])
  const [output,setOutput]=useState([["s.no", "amount", "item_type", "tax"]])
  const [show,setShow]=useState(false)

  const handleCalculateTax=()=>{
       console.log(data,"data")
       let taxData=[]
       let slno=0
       data.forEach((el,i)=>{
        // console.log(el[2])
       if(TaxRate[el[2]]!=undefined)
       {
          console.log(TaxRate[el[2]],"obj")
          let arr=[]
          let tax=el[1]*(+TaxRate[el[2]]/100)
          arr.push(slno,el[1],TaxRate[el[2]]+"%",tax)
          taxData.push(arr)
          slno++
       }
     })
     console.log(taxData,"hey")
  }
  return (
    <Box>
      <Text textAlign={"center"} fontWeight="bold" fontSize={"2xl"}>Tax Calculator</Text>
      <CSVReader
      onUploadAccepted={(results) => {
        // console.log("hey")
        // console.log(results,"heyy");
        // const header=results.data[0]
        // console.log(header,"hello")
        const info=results.data.slice(1)
        setData(info)
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }) => (
        <>
          <div style={styles.csvReader}>
            <button type='button' {...getRootProps()} style={styles.browseFile}>
              Browse file
            </button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} style={styles.remove}>
              Remove
            </button>
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>
    <Button onClick={handleCalculateTax}>Calculate Tax</Button>
    {show? <Button>Download CSV</Button>:null}
    </Box>
  )
}

export default UploadCSV