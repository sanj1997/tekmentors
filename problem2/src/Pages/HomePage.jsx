import React from 'react'
import {Box,Text} from "@chakra-ui/react"
import TaxCalculator from '../Components/TaxCalculator'
import TaxOutput from '../Components/TaxOutput'
const HomePage = () => {
  return (
    <Box>
        <Text mt={"20px"} textAlign={"center"} fontWeight="bold" fontSize={"2xl"}>Tax Calculator</Text>
        <TaxCalculator/>
        <TaxOutput/>
    </Box>
  )
}

export default HomePage