import { useState } from "react"
import {supabaseAuthenticatedConnection } from "../../service/SupabaseService"
import { setR2Client } from "../../service/R2Service"
import {Heading, Stack, VStack, Text, HStack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'
import LoginForm from "../form/LoginForm";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    
    const navigate = useNavigate(); 
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const {error} = 
            await supabaseAuthenticatedConnection(email, password);

        setEmail("");
        setPassword("");
        if (error) {
            setErr("Email ou mot de passe invalide");

        } else {
            await setR2Client();
            navigate('/videos-du-moment')       
            setErr("");
        }
    }
    return(
        <>
        <HStack justify="center" align="center" minW="100vw" minH="100vh" bg="black" color="white">
            <VStack align="center" justify="center"  w="90vw" h="90vh">

                    <Stack gap={2}>
                        <Heading size={{base: "md", sm:"xl", md:"2xl"}}>Indiquez vos identifiants</Heading>
                        <LoginForm handleSubmit={handleSubmit} setPassword={setPassword} setEmail={setEmail}/>
                        {err && <HStack justify="center" color="red"><Text>{err}</Text></HStack>}
                    </Stack>
                </VStack>
        </HStack>
        

        </>
    )
}