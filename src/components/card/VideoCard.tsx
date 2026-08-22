import { Box, Heading, VStack } from "@chakra-ui/react";
import {type VideoSelectType } from "../../service/VideoService";
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
        >
            <VStack align="center">
            { 
            v.description && 
                <Heading size="2xl" color="whiteAlpha.900">
                    {v.description}
                </Heading> 
            }
            {
            v.age &&
                <Heading size="sm"  color="whiteAlpha.600">
                    {v.age}
                </Heading> 
            }
            
                <Box padding={4} width={{ base: "90%", sm: "90%", md: "90%"}}>
                    <video 
                        key={index} 
                        src={v.url} 
                        controls width="full" 
                        style={{
                            borderRadius:"12px"
                        }}

                        />
                </Box>
                    <ConfirmationSuppression id={v.id} handleDelete={handleDelete}/>
            </VStack>

        </Box>

            
        </>
    )

}