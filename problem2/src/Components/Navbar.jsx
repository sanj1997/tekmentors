import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <Flex h={"70px"} p="20px" justifyContent={"space-between"} bg="#64cacc" alignItems={"center"}>
        <Link to={"/"}><Text fontWeight={"800"} fontSize="2xl">Tekmentors</Text></Link>
        <Flex width={"30%"} justifyContent="space-between">
            <Link to={"/"}><Button bg={"none"} _hover={{bg:"none"}} _active={{bg:"none"}}>Visualize Table</Button></Link>
            <Link to={"/file-upload"}><Button bg={"none"} _hover={{bg:"none"}} _active={{bg:"none"}}>Upload File</Button></Link>
        </Flex>
    </Flex>
  )
}

export default Navbar