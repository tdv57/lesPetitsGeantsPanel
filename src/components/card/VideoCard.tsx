import { Box, Heading, VStack } from "@chakra-ui/react";
import {type VideoSelectType } from "../../types/VideoType";
import ConfirmationSuppression from "../modal/ConfirmationSuppression";

type VideoCardPropType = {
    index: number, 
    v: VideoSelectType
    handleDelete: (id :number) => void
}
export default function VideoCard({v, index, handleDelete} : VideoCardPropType) {

    return (
        <>
        <Box     
            bg="whiteAlpha.100" 
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            borderRadius="12px"
            width={{ base: "70%", sm: "70%", md: "50%"}}
            p={4}
            height={{base: "90vh"}}
            display="flex"
            flexDir="column"
        >
            <VStack align="center" height="100%" gap={4}>
            { 
            v.description && 
            <Box flexShrink="0" textAlign="center">
                <Heading size="2xl" color="whiteAlpha.900">
                    {v.description}
                </Heading> 
            </Box>

            }
            {
            v.age &&
                <Box flexShrink="0" textAlign="center">
                    <Heading size="sm"  color="whiteAlpha.600">
                        {v.age}
                    </Heading> 
                </Box>

            }
            
                <Box 
                    flex="1" 
                    minHeight="0"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={{ base: "90%", sm: "90%", md: "90%"}}
                >
                    <video 
                        key={index} 
                        src={v.url} 
                        controls width="full" 
                        style={{
                            borderRadius: "12px",
                            maxWidth: "100%",
                            maxHeight: "100%",
                            width: "auto",
                            height: "auto"
                        }}

                        />
                </Box>
                <Box flexShrink="0">
                    <ConfirmationSuppression id={v.id} handleDelete={handleDelete}/>
                </Box>
            </VStack>

        </Box>

            
        </>
    )

}