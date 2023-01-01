import React, { useContext, useEffect, useState } from "react";
import { Box,TableContainer,Table,TableCaption,Thead,Tr,Th,Td,Tbody,Button,useToast } from "@chakra-ui/react";
import { AppContext } from "../Context/AppContext";
import {v4} from "uuid"
import db from "../db.json";
import {tax} from "../Utils/TaxRate"
const TaxCalculator = () => {
  const { data, setData, setOutput } = useContext(AppContext);
  const toast=useToast()
  useEffect(() => {
    setData(db.invoices);
  }, []);

  const handleTaxCalculate=(amount,type)=>{
      if(tax[type]!=undefined)
      {
          setOutput(amount*(tax[type]/100))
          toast({
            title:"Tax calculated successfully",
            status:"success",
            duration:3000
          })
      }
      else
      {
        setOutput("Invalid")
         toast({
            title:"Invalid Item Type",
            status:"error",
            duration:3000
         })
      }
  }
  return (
    <Box width={"80%"} m="auto" mt={"20px"}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal" size={"md"}>
          <TableCaption>Tax Calculator based on Item Type</TableCaption>
          <Thead>
            <Tr >
              <Th textAlign={"center"}>S.No</Th>
              <Th textAlign={"center"}>Amount</Th>
              <Th textAlign={"center"}>Item Type</Th>
              <Th textAlign={"center"}>Calculate Tax</Th>
            </Tr>
          </Thead>
          <Tbody>
           {data?.map((el)=>{
              return (
                <Tr data-cy="row" key={v4()}>
                    <Td textAlign={"center"}>{el.sno}</Td>
                    <Td textAlign={"center"}>{el.amount}</Td>
                    <Td textAlign={"center"}>{el.item_type}</Td>
                    <Td textAlign={"center"}><Button onClick={()=>handleTaxCalculate(el.amount,el.item_type)}>Calculate</Button></Td>
                </Tr>
              )
           })} 
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TaxCalculator;
