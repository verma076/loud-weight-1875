import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/Authcontext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseauth';
import { error } from 'console';
import { Box, Heading, Input, Button, FormLabel,Text, HStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';


interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate=useNavigate()
  const { setIsAuthenticated } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth,loginForm.email,loginForm.password)
    .then((res)=>{
      console.log(res)
      navigate("/")
      setIsAuthenticated(true)
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  const handleGoBack=()=>{
    navigate(-1)
  }
  return (
    <Box padding={"5%"}>
    <Box p={4} maxWidth="400px" mx="auto" borderColor="gray" boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px"  >
    <Heading as="h1" mb={4} color={"#010008"}>Login</Heading>
    <form onSubmit={handleSubmit}>
    <FormLabel>Email ID</FormLabel>
      <Input
        type="text"
        name="email"
        value={loginForm.email}
        onChange={handleInputChange}
        placeholder="Email"
        mb={4}
      />
         <FormLabel >Password</FormLabel>
      <Input
        type="password"
        name="password"
        value={loginForm.password}
        onChange={handleInputChange}
        placeholder="Password"
        mb={4}
      />
      <Button type="submit" bg="#143dc4" color={"white"} >Login</Button>

    </form>
    <br />
    <HStack gap={"150px"}>
   
      <Text>New Customer ?</Text>
    
      <Text color='#FA6F13'><Link to="/signup" style={{ fontSize: '20px', fontWeight: 'bold' }} >Sign Up</Link></Text>
    </HStack>
    <Box w="100px">
        <button onClick={handleGoBack} > <br /><ArrowBackIcon marginRight={"10px"}/>Back</button>
        </Box>
  </Box>
  </Box>
  
  );
};

export default Login;
