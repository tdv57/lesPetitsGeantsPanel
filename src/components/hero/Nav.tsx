import { Box, Button, IconButton, VStack } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../service/SupabaseService';
import { LuLogOut } from 'react-icons/lu';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
import { navItems } from '../../router/NavItems';
import { COLORS } from '../../theme/Couleur';

const navTextStyle = {
    fontSize: 'clamp(0.6rem, 1.45vw, 1.125rem)',
    textTransform: 'uppercase' as const,
    letterSpacing: 'wide',
    whiteSpace: 'nowrap' as const,
};

const navTextStyleMobile = {
    ...navTextStyle,
    fontSize: 'md',
};

type NavItemLinkPropsType = {
    item: (typeof navItems)[number];
    textStyle: typeof navTextStyle;
    onClick?: () => void;
};

function NavItemLink({ item, textStyle, onClick }: NavItemLinkPropsType) {
    return (
        <NavLink to={item.to} style={{ textDecoration: 'none' }} onClick={onClick}>
            {({ isActive }) => (
                <Box
                    as="span"
                    display="inline-block"
                    cursor="pointer"
                    pb="1"
                    {...textStyle}
                    color={isActive ? COLORS.boutonBordClique : COLORS.primary}
                    fontWeight={isActive ? '600' : '400'}
                    borderBottom="3px solid"
                    borderColor={isActive ? COLORS.boutonBordClique : 'transparent'}
                    transitionProperty="common"
                    transitionDuration="moderate"
                    _hover={{ opacity: 0.8 }}
                >
                    {item.label}
                </Box>
            )}
        </NavLink>
    );
}

type LogoutButtonPropsType = {
    textStyle: typeof navTextStyle;
    onClick: () => void;
};

function LogoutButton({ textStyle, onClick }: LogoutButtonPropsType) {
    return (
        <Button
            variant="plain"
            onClick={onClick}
            pb="1"
            h="auto"
            minW="0"
            px="0"
            borderRadius="0"
            {...textStyle}
            color="red.500"
            fontWeight="400"
            borderBottom="3px solid transparent"
            transitionProperty="common"
            transitionDuration="moderate"
            _hover={{ opacity: 0.8 }}
        >
            <LuLogOut />
            Déconnexion
        </Button>
    );
}

export default function Nav() {
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState(false);

    async function handleLogout() {
        await logout();
        navigate('/login');
    }
    return (
        <>
            <Box
                display={{ base: 'none', md: 'flex' }}
                flexWrap="nowrap"
                justifyContent="center"
                columnGap="clamp(0.5rem, 1.4vw, 3rem)"
                px={4}
                pt={4}
                pb={2}
                mx="auto"
                maxW={{ lg: '1550px' }}
                bg={COLORS.background}
            >
                {navItems.map((item) => (
                    <NavItemLink key={item.to} item={item} textStyle={navTextStyle} />
                ))}
                <LogoutButton textStyle={navTextStyle} onClick={handleLogout} />
            </Box>

            <Box
                display={{ base: 'flex', md: 'none' }}
                justifyContent="center"
                bg={COLORS.background}
            >
                <VStack justify="center" pt={4} pb={2} gap={4}>
                    <IconButton
                        aria-label={showNav ? 'Fermer le menu' : 'Ouvrir le menu'}
                        onClick={() => setShowNav(!showNav)}
                        variant="ghost"
                        color={COLORS.primary}
                    >
                        {showNav ? <HiX /> : <HiMenu />}
                    </IconButton>
                    {showNav && (
                        <>
                            {navItems.map((item) => (
                                <NavItemLink
                                    key={item.to}
                                    item={item}
                                    textStyle={navTextStyleMobile}
                                    onClick={() => setShowNav(false)}
                                />
                            ))}
                            <LogoutButton textStyle={navTextStyleMobile} onClick={handleLogout} />
                        </>
                    )}
                </VStack>
            </Box>
        </>
    );
}
