import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { useNFTBalances } from "react-moralis";
import CustomContainer from "./CustomContainer";
import React from "react";

export default function Nft({ user }) {
    const { getNFTBalances, data } = useNFTBalances();

    React.useEffect(() => {
        getNFTBalances({
            params: {
                chain: "mumbai",
                address: user.get('maticAddress')
            }
        })
    }, [])
    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Your NFTs</Text>
            {/* <Flex justifyContent="space-between" bg="green.600" color="white" px={5} py={6}> */}


            {data && data.result.map(nft => (
                <Box mt="8" px="4" py="4" borderWidth="1px" borderRadius="md" key={nft.token_uri}>
                    {nft.image && <Image  boxSize='400px'  src={nft.image} />}
                    <p>{nft.token_uri}</p>
                </Box>
            ))}
             {/* </Flex> */}
        </CustomContainer>
    )
}
