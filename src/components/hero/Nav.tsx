import {  Button, Heading, HStack} from "@chakra-ui/react";
import { NavLink } from 'react-router-dom'
import { logout } from "../../service/SupabaseService";
export default function Nav() {
    return (
        <HStack justify="center" padding="20px" gap={8}>
            <Button asChild colorPalette="purple" size="lg">
                <NavLink
                to="/videos-du-moment"

            > 
                <Heading size="xl" color="whiteAlpha.900">Vidéos du moment</Heading>
            </NavLink>
            </Button>
            <Button asChild colorPalette="purple" size="lg">
                <NavLink
                    to="/article-de-la-saison"
                >
                    <Heading size="xl" color="whiteAlpha.900"> Article de la saison </Heading>
                </NavLink>
            </Button>
            <Button onClick={() => logout()} asChild colorPalette="red" size="lg">
                <NavLink
                    to="/login"
                >
                    <Heading size="xl" color="whiteAlpha.900">Déconnection </Heading>
                </NavLink>
            </Button>
            

        </HStack>
    )
} 