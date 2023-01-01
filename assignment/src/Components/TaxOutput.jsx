import React, { useContext } from 'react'
import {Box,Flex,Text} from "@chakra-ui/react"
import { AppContext } from '../Context/AppContext'
const TaxOutput = () => {
    const {output} =useContext(AppContext)
  return (
    <Box bg={"#011627"} width={"80%"} m="auto" display={"flex"} justifyContent="start" mt="20px">
        <Flex minW={"200px"} w="40%" alignItems="center"  >
            <Text color={"#acdb67"} fontWeight={"bold"}>Calculated Tax Value: </Text>
            <Box ml={"10px"} width={"40%"} border={"1px solid #acdb67"} p={"15px"} textAlign="left">
                <Text color={"#acdb67"}  data-cy="output" >{output}</Text>
            </Box>
        </Flex>
    </Box>
  )
}

export default TaxOutput