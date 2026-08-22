import { Box, Heading, Image } from "@chakra-ui/react";
import type { IMAGE_SELECT_TYPE, TYPE_IMAGE_TYPE } from "../../types/ImageType";
import { isJeuDeSocieteSelect, isJouetSelect, isMarqueSelect, isPelucheSelect } from "../../mapper/ImageMapper";

type ImageCardPropType = {
    imageSelect: IMAGE_SELECT_TYPE;
}

export default function ImageCard({imageSelect} : ImageCardPropType) {
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
                    width={{ base: "100%", sm: "100%", md: "70%"}}
                    height={{base: "100%"}}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    mx="auto"
                    gap={{base: 8}}
                >
                    <Heading mt="20px" size={{base: "2xl"}} color="whiteAlpha.900" >
                        {imageSelect.marque}
                    </Heading> 

                    <Box flex="1" display="flex" alignItems="center" justifyContent="center" width="100%">
                        <Image
                            src={imageSelect.url}
                            alt={imageSelect.marque}
                            width="100%"
                            objectFit="cover"
                            borderRadius="md"
                            padding={{base: 12, sm:1}}
                        />
                    </Box>
                </Box>
            }
            { isPelucheSelect(imageSelect) && 
                <Box  
                    width={{ base: "100%", sm: "100%", md: "70%"}}
                    height={{base: "100%"}}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    mx="auto"
                    gap={{base: 8}}
                >
                    <Box flex="1" display="flex" alignItems="center" justifyContent="center" width="100%">
                        <Image
                            src={imageSelect.url}
                            alt={imageSelect.marque}
                            width="100%"
                            objectFit="cover"
                            borderRadius="md"
                            padding={{base: 12, sm:1}}
                        />
                    </Box>
                </Box>
            }
            { isJouetSelect(imageSelect) && 
                <Box  
                    width={{ base: "100%", sm: "100%", md: "70%"}}
                    height={{base: "100%"}}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    mx="auto"
                    gap={{base: 8}}
                >
                    <Heading mt="20px" size={{base: "2xl"}} color="whiteAlpha.900" >
                        {imageSelect.description}
                    </Heading>
                    <Heading mt="20px" size={{base: "2xl"}} color="whiteAlpha.900" >
                        {imageSelect.age}
                    </Heading> 

                    <Box flex="1" display="flex" alignItems="center" justifyContent="center" width="100%">
                        <Image
                            src={imageSelect.url}
                            alt={imageSelect.description + imageSelect.age}
                            width="100%"
                            objectFit="cover"
                            borderRadius="md"
                            padding={{base: 12, sm:1}}
                        />
                    </Box>
                </Box>
            }
            { isJeuDeSocieteSelect(imageSelect) && 
                <Box  
                    width={{ base: "100%", sm: "100%", md: "70%"}}
                    height={{base: "100%"}}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    mx="auto"
                    gap={{base: 8}}
                >
                    <Heading mt="20px" size={{base: "2xl"}} color="whiteAlpha.900" >
                        {imageSelect.description}
                    </Heading>
                    <Heading mt="20px" size={{base: "2xl"}} color="whiteAlpha.900" >
                        {imageSelect.age}
                    </Heading> 

                    <Box flex="1" display="flex" alignItems="center" justifyContent="center" width="100%">
                        <Image
                            src={imageSelect.url}
                            alt={imageSelect.description + imageSelect.age}
                            width="100%"
                            objectFit="cover"
                            borderRadius="md"
                            padding={{base: 12, sm:1}}
                        />
                    </Box>
                </Box>
            }

        </Box>
        </>
    );
}