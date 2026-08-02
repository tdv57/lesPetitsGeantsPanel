import {  Button, Heading, HStack, Text} from "@chakra-ui/react";
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from "../../service/SupabaseService";
import { LuLogOut } from "react-icons/lu";
export default function Nav() {
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate("/login");
    }
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
            <Button asChild colorPalette="purple" size="lg">
                <NavLink
                    to="/images"
                >
                    <Heading size="xl" color="whiteAlpha.900"> Gérer les images </Heading>
                </NavLink>
            </Button>
            <Button onClick={() => logout()} colorPalette="red" size="lg">
                <HStack gap={2}>
                    <LuLogOut size={40} />
                    <Heading size="xl" color="whiteAlpha.900">Déconnexion</Heading>
                </HStack>
            </Button>
            

        </HStack>
    )
} 