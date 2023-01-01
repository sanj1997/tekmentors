import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react';


import {useCSVReader,useCSVDownloader} from "react-papaparse"
const TaxRate={
    0:15,
    1:8,
    2:12
}
const styles = {
  progressBarBackgroundColor: {
    backgroundColor: '#00a0dc',
    marginTop:"20px"
  } 
}

const FileUpload = () => {
  const { CSVReader } = useCSVReader();
  const { CSVDownloader, Type } = useCSVDownloader();
  const [data,setData]=useState([])
  const [output,setOutput]=useState([])
  const [download,setDownload]=useState(false)
  const toast=useToast()
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
          taxData.push(obj)
          slno++
       }
    
     })
     setOutput([...output,...taxData])
  }
  useEffect(()=>{
    if(output.length>0)
    {
      setDownload(true)
      toast({
      description:`Tax calculated for ${output.length}/${data.length-1} inputs`,  
      title:`Tax calculated successfully`,
      status:"success",
      duration:3000
      })
    }
  },[output])
  return (
    <Box width={"80%"} margin="auto">
      <Text textAlign={"center"} color="#acdb67" fontWeight="bold" fontSize={"2xl"} mt="20px" mb={"20px"}>Tax Calculator</Text>
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
          <Flex justifyContent="space-around">
            <Button width={"10%"} {...getRootProps()}>
              Browse file
            </Button>
            <Box width={"80%"} border="1px solid #acdb67" color={"#acdb67"}  pl={"10px"} display={"flex"} alignItems={"center"}>
              {acceptedFile && acceptedFile.name}
            </Box>
            <Button width={"10%"} bg={"#ee1c25"} _hover={{bg:"#ee1c25"}} color="white" {...getRemoveFileProps()}>
              Remove
            </Button>
          </Flex>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>
    <Box border={"2px dotted #acdb67"} m="auto" mt="50px" width={"50%"} display="flex" gap={"20px"} justifyContent={"center"} alignItems="center" p="50px">
    <Button onClick={handleCalculateTax} disabled={disabled}>Calculate Tax</Button>
    {<CSVDownloader
      filename={'result'}
      bom={true}
      config={{
        delimiter: ',',
      }}
      data={output}
    >
      <Button disabled={!download} >Download CSV</Button>
    </CSVDownloader>}
    </Box>
    </Box>
  )
}

export default FileUpload