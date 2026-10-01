import { Button, Field, IconButton, Input, InputGroup, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

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
                    <Input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
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
                                color="white"
                                colorPalette="whiteAlpha"
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                </Field.Root>

                <Button type="submit" colorPalette="blue">
                    Se connecter
                </Button>
            </Stack>
        </form>
    );
}
