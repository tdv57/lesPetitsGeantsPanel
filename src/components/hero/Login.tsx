import { useState } from "react"
import {supabaseAuthenticatedConnection } from "../../service/SupabaseService"
import { setR2Client } from "../../service/R2Service"
import { Button, Field, Heading, Input, Stack, VStack, Text, HStack, InputGroup, IconButton } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'
import { LuEye, LuEyeOff } from "react-icons/lu";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
        <HStack justify="center" align="center" minW="100vw" minH="100vh" bg="bg.canvas" color="fg.default">
            <VStack align="center" justify="center"  w="90vw" h="90vh">

                    <Stack gap={2}>
                        <Heading size={{base: "md", sm:"xl", md:"2xl"}}>Indiquez vos identifiants</Heading>
                    
                        


                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Stack gap={4}>
                            <Field.Root>
                                <Field.Label fontSize={{ base: "xs", sm: "sm", md: "lg" }}>Email</Field.Label>
                                <Input
                                    type="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label fontSize={{ base: "xs", sm: "sm", md: "lg" }}>Mot de passe</Field.Label>
                                <InputGroup endElement={
                                    <IconButton
                                        type="button"
                                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                        variant="ghost"
                                        color="white"
                                        colorPalette="whiteAlpha"
                                        _hover={{ color: "black"}}
                                        size="sm"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <LuEyeOff /> : <LuEye />}
                                    </IconButton>
                                }>
                                    
                                    <Input 
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </InputGroup>

                            </Field.Root>
                            
                            <Button type="submit" colorPalette="blue">
                                Se connecter
                            </Button>
                            </Stack>
                        </form>
                        {err && <HStack justify="center" color="red"><Text>{err}</Text></HStack>}
                    </Stack>
                </VStack>
        </HStack>
        

        </>
    )
}