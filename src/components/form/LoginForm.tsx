import { Button, Field, IconButton, Input, InputGroup, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { COLORS } from '../../theme/Couleur';

type LoginFormPropsType = {
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
};
export default function LoginForm({ setPassword, setEmail, handleSubmit }: LoginFormPropsType) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Stack gap={4}>
                <Field.Root>
                    <Field.Label fontSize={{ base: 'xs', sm: 'sm', md: 'lg' }}>Email</Field.Label>
                    <Input
                        type="email"
                        name="email"
                        bg={COLORS.backgroundCard}
                        onChange={(e) => setEmail(e.target.value)}
                        border={'3px solid'}
                        borderColor={COLORS.primary}
                        css={{
                            '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus':
                                {
                                    WebkitBoxShadow: `0 0 0 1000px ${COLORS.backgroundCard} inset`,
                                    WebkitTextFillColor: COLORS.textDark,
                                    caretColor: COLORS.textDark,
                                    transition: 'background-color 9999s ease-in-out 0s',
                                },
                        }}
                    />
                </Field.Root>

                <Field.Root>
                    <Field.Label fontSize={{ base: 'xs', sm: 'sm', md: 'lg' }}>
                        Mot de passe
                    </Field.Label>
                    <InputGroup
                        endElement={
                            <IconButton
                                type="button"
                                aria-label={
                                    showPassword
                                        ? 'Masquer le mot de passe'
                                        : 'Afficher le mot de passe'
                                }
                                variant="ghost"
                                color={COLORS.textDark}
                                colorPalette={COLORS.background}
                                _hover={{ color: 'black' }}
                                size="sm"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <LuEyeOff /> : <LuEye />}
                            </IconButton>
                        }
                    >
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            border={'3px solid'}
                            borderColor={COLORS.primary}
                            onChange={(e) => setPassword(e.target.value)}
                            css={{
                                '&::-ms-reveal, &::-ms-clear': {
                                    display: 'none',
                                },
                            }}
                        />
                    </InputGroup>
                </Field.Root>

                <Button type="submit" bg={COLORS.primary}>
                    Se connecter
                </Button>
            </Stack>
        </form>
    );
}
