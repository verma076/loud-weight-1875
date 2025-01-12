import { Box, Button, Flex, Heading, Link, Stack, StackDivider, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"

import { Card, CardHeader, CardBody, CardFooter, Text,Td,Image} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom';


import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
interface CartItem {
    id: number;
    image:string;
    brand:string;
    price:number;
    //total:number;
    
  }

const CartPage=()=>{
    const [cartData,setcartData]=useState<CartItem[]>([])
    const [subtotal,setSubtotal]=useState<number>(0)
   const  [quantity,setQuantity]=useState<number[]>([])
   //const [isloading,setIsloading ]=useState<boolean>(false)


    //const [total, setTotal] = useState(0);

   async function cartdata(){
    try {
        await axios.get("https://sparkel.onrender.com/cart")
        .then(res=>{
            setcartData(res.data)
            setQuantity(Array(res.data.length).fill(1));
          

        })
        .catch((error)=>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }

    }
  
    useEffect(()=>{
        cartdata()
    },[])
    useEffect(() => {
        let newSubtotal = 0;
        for (let i = 0; i < cartData.length; i++) {
            if (cartData[i]?.price) {
                newSubtotal += +cartData[i].price * quantity[i];
              }
        }
        setSubtotal(newSubtotal);
      }, [cartData, quantity]);
    
      const handleIncrement = (index: number) => {
        const newQuantity = [...quantity];
        newQuantity[index] += 1;
        setQuantity(newQuantity);
      };
    
      const handleDecrement = (index: number) => {
        if (quantity[index] > 1) {
          const newQuantity = [...quantity];
          newQuantity[index] -= 1;
          setQuantity(newQuantity);
        }
      };
     

   
      
      
      const calculateDiscount = () => {
        if (subtotal >= 1000 && subtotal < 2000) {
          return Math.floor(subtotal * 0.2);
        } else if (subtotal >= 2000 && subtotal < 4000) {
          return Math.floor(subtotal * 0.3);
        } else if (subtotal >= 4000) {
          return Math.floor(subtotal * 0.4);
        } else {
          return Math.floor(subtotal * 0.6);
        }
      };
    
      const discount = calculateDiscount();
      const deliveryCharge = 50;
      const totalAmount = Math.floor( subtotal - discount + deliveryCharge);

const Navigate=useNavigate()

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  Navigate(`/Checkout`)

};

    return <>
   <Navbar/>
    <Box p={"2%"} >
        <Heading>Your Shoping Cart</Heading>
        <Flex flexDirection={{ base: "column", md: "row" }}
   
       >
                    <Box   w={{ base: "100%", md: "70%" }} >
                    <TableContainer >
                        {cartData.length===0?"EMPTY":""}
                <Table variant='simple' >
                    <Thead  gap={"0px"}>
                    <Tr>
                    <Th ></Th>
                    <Th >brand</Th>
                    <Th >prcie</Th>
                    <Th>Quantity</Th>
                    <Th>Total</Th>
                </Tr>
                    </Thead>

                <Tbody>
                    
                {
                cartData?.map((e,i)=>
                (
            
                <Tr key={e.id}>
                    <Td>

                 
                   <Image src={e.image} alt="" width="80px" />
                   </Td>
                    <Td>{e.brand}</Td>
                    <Td>{e.price}</Td>
                    <Td>
                    <Button onClick={() => handleDecrement(i)}>-</Button>
                {quantity[i]}
                <Button onClick={() => handleIncrement(i)}>+</Button>
                </Td>
                <Td>
                    {
                        String(e.price*quantity[i])
                    }
                </Td>
                
                    
                    
                </Tr>
                ))
                }
                
    </Tbody>

                </Table>
                </TableContainer>

           
                    </Box>
                <Box  w={{ base: "100%", md: "25%" }}>
                                    <Card>
                    <CardHeader>
                        <Heading size='md'>    Order Summary</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                        <Box display={"flex"} justifyContent={"space-between"}  >
                            <Box>
                            <Heading size='xs' textTransform='uppercase'>
                            Sub Total
                            </Heading>
                            </Box> 
                            <Box>
                            <Text pt='2' fontSize='sm'>
                            ₹ {subtotal}
                            </Text>
                            </Box> 
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Box>
                            <Heading size='xs' textTransform='uppercase'>
                           Discount
                            </Heading>
                            </Box>
                            <Box>
                            <Text pt='2' fontSize='sm'>
                            ₹ {discount}
                            </Text>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"} >
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                            Delivery Fee
                            </Heading>
                            </Box>
                            <Box>
                            <Text pt='2' fontSize='sm'>
                            ₹ {deliveryCharge}
                            </Text>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"} >
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                           Total
                            </Heading>
                            </Box>
                            <Box>
                            <Text pt='2' fontSize='sm'>
                            ₹ {totalAmount}
                            </Text>
                            </Box>
                        </Box>
                        </Stack>
                        <Button onClick={handleClick} bg={"black"} color={"white"}>
                    Buy this Product                   
                      </Button>
                    </CardBody>
                    </Card>

                </Box>
        </Flex>
        <Text border={"2px solid black"} w={"100px"} textAlign={"center"} borderRadius={"5px"} margin={"auto"}>
       
        Cart Updata
        </Text>
       
    </Box>
    <Footer/>
    </>
}
export default CartPage