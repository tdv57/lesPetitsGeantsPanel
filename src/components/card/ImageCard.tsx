import { Box, Heading, Image } from "@chakra-ui/react";
import type { IMAGE_SELECT_TYPE, TYPE_IMAGE_TYPE } from "../../types/ImageType";
import { isJeuDeSocieteSelect, isJouetSelect, isMarqueSelect, isPelucheSelect } from "../../mapper/ImageMapper";
import ConfirmationSuppression from "../modal/ConfirmationSuppression";

type ImageCardPropType = {
    imageSelect: IMAGE_SELECT_TYPE;
    handleDelete: (id: number, type : TYPE_IMAGE_TYPE) => void
}

export default function ImageCard({imageSelect, handleDelete} : ImageCardPropType) {
    function handleDeleteMarque(id: number) {
        return handleDelete(id, "MARQUE");
    }
    function handleDeleteJeuDeSociete(id: number) {
        return handleDelete(id, "JEU DE SOCIETE");
    }
    function handleDeletePeluche(id: number) {
        return handleDelete(id, "PELUCHE");
    }
    function handleDeleteJouet(id: number) {
        handleDelete(id, "JOUET");
    }
    console.log(isMarqueSelect(imageSelect))
    return(
        <>
        <Box
            bg="whiteAlpha.100" 
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            borderRadius="12px"
            width={{ base: "250px", sm: "80%", md: "80%"}}
            height={{base: "400px", sm:"90%", md:"100%"}}
        >
            { isMarqueSelect(imageSelect) && 
                <Box  
                    width={{ base: "250px", sm: "80%", md: "80%"}}
                    height="100%"
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    mx="auto"
                    gap={{base: 2}}
                >
                    <Box textAlign="center"flexShrink="0" mb={2} fontSize={{base: "sm"}} overflow="hidden">
                        <Heading size={{base: "md", md:"2xl"}} color="whiteAlpha.900" lineClamp={2}>
                            {imageSelect.marque}
                        </Heading> 
                    </Box>

                    <Box           
                        flex="1" 
                        minHeight="0"   
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                        width="100%"
                    >
                        <Image
                            src={imageSelect.url}
                            alt={imageSelect.marque}
                            maxWidth="100%"
                            maxHeight="100%"
                            objectFit="contain"
                            borderRadius="md"
                        />
                    </Box>
                    <Box flexShrink="0" mt={2}>
                        <ConfirmationSuppression id={imageSelect.id} handleDelete={handleDeleteMarque}/>
                    </Box>
                </Box>
            }
            { isPelucheSelect(imageSelect) && 
                <Box  
                    width={{ base: "250px", sm: "80%", md: "80%"}}
                    height="100%"
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    mx="auto"
                    gap={{base: 2}}
                >
                    <Box           
                        flex="1" 
                        minHeight="0"   
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                        width="100%"
                    >
                        <Image
                            src={imageSelect.url}
                            alt={imageSelect.marque}
                            maxWidth="100%"
                            maxHeight="100%"
                            objectFit="contain"
                            borderRadius="md"
                        />
                    </Box>
                    <Box flexShrink="0" mt={2}>
                        <ConfirmationSuppression id={imageSelect.id} handleDelete={handleDeletePeluche}/>
                    </Box>
                </Box>
            }
            { isJouetSelect(imageSelect) && 
                <Box  
                    width={{ base: "250px", sm: "80%", md: "80%"}}
                    height="100%"
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    mx="auto"
                    gap={{base: 2}}
                >
                    <Box textAlign="center"flexShrink="0" mb={2} fontSize={{base: "sm"}} overflow="hidden">
                        <Heading size={{base: "sm", md:"2xl"}} color="whiteAlpha.900" lineClamp={2}>
                            {imageSelect.description}
                        </Heading> 
                        <Heading size="sm"  color="whiteAlpha.600" lineClamp={1}>
                            {imageSelect.age}
                        </Heading>  
                    </Box>

                    <Box           
                        flex="1" 
                        minHeight="0"   
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                        width="100%"
                    >
                        <Image
                            src={imageSelect.url}
                            alt={imageSelect.description + imageSelect.age}
                            maxWidth="100%"
                            maxHeight="100%"
                            objectFit="contain"
                            borderRadius="md"
                        />
                    </Box>
                    
                    <Box flexShrink="0" mt={2}>
                        <ConfirmationSuppression id={imageSelect.id} handleDelete={handleDeleteJouet}/>
                    </Box>
                </Box>
            }
            { isJeuDeSocieteSelect(imageSelect) && 
                <Box  
                    width={{ base: "250px", sm: "80%", md: "80%"}}
                    height="100%"
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    mx="auto"
                    gap={{base: 2}}
                >
                    <Box textAlign="center"flexShrink="0" mb={2} fontSize={{base: "sm"}} overflow="hidden">
                        <Heading size={{base: "sm", md:"2xl"}} color="whiteAlpha.900" lineClamp={2}>
                            {imageSelect.description}
                        </Heading> 
                        <Heading size="sm"  color="whiteAlpha.600" lineClamp={1}>
                            {imageSelect.age}
                        </Heading>  
                    </Box>

                    <Box           
                        flex="1" 
                        minHeight="0"   
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                        width="100%"
                    >
                        <Image
                            src={imageSelect.url}
                            alt={imageSelect.description + imageSelect.age}
                            maxWidth="100%"
                            maxHeight="100%"
                            objectFit="contain"
                            borderRadius="md"
                        />
                    </Box>
                    <Box flexShrink="0" mt={2}>
                        <ConfirmationSuppression id={imageSelect.id} handleDelete={handleDeleteJeuDeSociete}/>
                    </Box>
                </Box>
            }

        </Box>
        </>
    );
}