import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import {styles} from "../Styles/uploadStyles"

import {useCSVReader,useCSVDownloader, jsonToCSV} from "react-papaparse"
const TaxRate={
    0:15,
    1:8,
    2:12
}
const UploadCSV = () => {
  const { CSVReader } = useCSVReader();
  const { CSVDownloader, Type } = useCSVDownloader();
  const [data,setData]=useState([])
  const [output,setOutput]=useState([])
  const [show,setShow]=useState(false)
  const [disabled,setDisabled]=useState(true)
  const handleCalculateTax=()=>{
       let taxData=[]
       let slno=0
       data.forEach((el,i)=>{
       if(TaxRate[el[2]]!=undefined)
       {
          let obj={}
          let tax=el[1]*(+TaxRate[el[2]]/100)
          obj["slno"]=`${slno}`
          obj["amount"]=`${el[1]}`
          obj["item_type"]=`${TaxRate[el[2]]+"%"}`
          obj["tax"]=`${tax}`
          const jsonData=JSON.stringify(obj)
          taxData.push(obj)
          slno++
       }
     })
     setOutput([...output,...taxData])
     setShow(true)
  }
 
  return (
    <Box>
      <Text textAlign={"center"} fontWeight="bold" fontSize={"2xl"}>Tax Calculator</Text>
      <CSVReader
      onUploadAccepted={(results) => {
        const info=results.data.slice(1)
        setData(info)
        setDisabled(false)
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
    <Button onClick={handleCalculateTax} disabled={disabled}>Calculate Tax</Button>
    {show? <CSVDownloader
      filename={'tax'}
      bom={true}
      config={{
        delimiter: ',',
      }}
      data={output}
    >
      <Button>Download CSV</Button>
    </CSVDownloader>:null}
    </Box>
  )
}

export default UploadCSV