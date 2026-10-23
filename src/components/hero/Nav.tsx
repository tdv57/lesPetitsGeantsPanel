import { Box, Button, Heading, HStack, IconButton, VStack } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../service/SupabaseService';
import { LuLogOut } from 'react-icons/lu';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
export default function Nav() {
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState(false);

    async function handleLogout() {
        await logout();
        navigate('/login');
    }
    return (
        <>
            <Box display={{ base: 'none', md: 'block' }}>
                <HStack justify="center" padding="20px" gap={4} width="100%">
                    <Button
                        asChild
                        colorPalette="purple"
                        flex="1"
                        height={{ base: '50px' }}
                        size="lg"
                    >
                        <NavLink to="/videos-du-moment">
                            <Heading size="lg" color="whiteAlpha.900">
                                Vidéos du moment
                            </Heading>
                        </NavLink>
                    </Button>
                    <Button
                        asChild
                        colorPalette="purple"
                        flex="1"
                        height={{ base: '50px' }}
                        size="lg"
                    >
                        <NavLink to="/article-de-la-saison">
                            <Heading size="lg" color="whiteAlpha.900">
                                {' '}
                                Article de la saison{' '}
                            </Heading>
                        </NavLink>
                    </Button>
                    <Button
                        asChild
                        colorPalette="purple"
                        flex="1"
                        height={{ base: '50px' }}
                        size="lg"
                    >
                        <NavLink to="/images">
                            <Heading size="lg" color="whiteAlpha.900">
                                {' '}
                                Gérer les images{' '}
                            </Heading>
                        </NavLink>
                    </Button>
                    <Button
                        asChild
                        colorPalette="purple"
                        flex="1"
                        height={{ base: '50px' }}
                        size="lg"
                    >
                        <NavLink to="/annonces">
                            <Heading size="lg" color="whiteAlpha.900">
                                {' '}
                                Gérer les annonces{' '}
                            </Heading>
                        </NavLink>
                    </Button>
                    <Button
                        onClick={() => logout()}
                        colorPalette="red"
                        flex="1"
                        height={{ base: '50px' }}
                        size="lg"
                    >
                        <HStack gap={2}>
                            <LuLogOut size={40} />
                            <Heading size="lg" color="whiteAlpha.900">
                                Déconnexion
                            </Heading>
                        </HStack>
                    </Button>
                </HStack>
            </Box>

            <Box mx="auto" justifyContent="center" display={{ base: 'flex', md: 'none' }}>
                <VStack justify="center" padding="20px" gap={8}>
                    <IconButton
                        aria-label={showNav ? 'Fermer le menu' : 'Ouvrir le menu'}
                        onClick={() => setShowNav(!showNav)}
                        variant="ghost"
                        color="whiteAlpha.900"
                    >
                        {showNav ? <HiMenu /> : <HiX />}
                    </IconButton>
                    {showNav && (
                        <>
                            <Button
                                asChild
                                colorPalette="purple"
                                width={{ base: '250px' }}
                                height={{ base: '50px' }}
                                size="lg"
                            >
                                <NavLink to="/videos-du-moment">
                                    <Heading size="xl" color="whiteAlpha.900">
                                        Vidéos du moment
                                    </Heading>
                                </NavLink>
                            </Button>
                            <Button
                                asChild
                                colorPalette="purple"
                                width={{ base: '250px' }}
                                height={{ base: '50px' }}
                                size="lg"
                            >
                                <NavLink to="/article-de-la-saison">
                                    <Heading size="xl" color="whiteAlpha.900">
                                        {' '}
                                        Article de la saison{' '}
                                    </Heading>
                                </NavLink>
                            </Button>
                            <Button
                                asChild
                                colorPalette="purple"
                                width={{ base: '250px' }}
                                height={{ base: '50px' }}
                                size="lg"
                            >
                                <NavLink to="/images">
                                    <Heading size="xl" color="whiteAlpha.900">
                                        {' '}
                                        Gérer les images{' '}
                                    </Heading>
                                </NavLink>
                            </Button>
                            <Button
                                asChild
                                colorPalette="purple"
                                width={{ base: '250px' }}
                                height={{ base: '50px' }}
                                size="lg"
                            >
                                <NavLink to="/annonces">
                                    <Heading size="xl" color="whiteAlpha.900">
                                        {' '}
                                        Gérer les annonces{' '}
                                    </Heading>
                                </NavLink>
                            </Button>
                            <Button
                                onClick={() => handleLogout()}
                                colorPalette="red"
                                width={{ base: '250px' }}
                                height={{ base: '50px' }}
                                size="lg"
                            >
                                <HStack gap={2}>
                                    <LuLogOut size={40} />
                                    <Heading size="xl" color="whiteAlpha.900">
                                        Déconnexion
                                    </Heading>
                                </HStack>
                            </Button>
                        </>
                    )}
                </VStack>
            </Box>
        </>
    );
}
