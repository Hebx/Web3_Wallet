import { useMoralis } from "react-moralis"
import Head from "next/head"
import { Flex, Text, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Box, Link } from "@chakra-ui/react"

import Balance from "../components/Balance";
import Header from "../components/Header";
import Nft from "../components/Nft";
import Profile from "../components/Profile";
import Send from "../components/Send";
import Transactions from "../components/Transactions";
import Coffee from "../components/Coffee";

export default function Home() {
  const {isAuthenticated, user, isAuthenticating, authenticate, logout, isLoggingOut} = useMoralis()
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | DApp</title>
        </Head>
        <Flex direction="column" justifyContent="center" alignItems="center" width="100vw" height="100vh" bgGradient="linear(to-br, teal.600, green.200)">
          <Text fontSize="5xl" fontWeight="bold" color="white">Web3 Wallet Dashboard</Text>
          <Button colorScheme="green" size="lg" mt="6" onClick={() => authenticate({
            provider: "web3Auth",
            clientId: process.env.NEXT_PUBLIC_WEB3AUTH,
            // signingMessage: "Sign required to login in Dashboard3"
          })} disabled={isAuthenticating}>Login with Web3Auth</Button>
        </Flex>
      </>
    )
  }
  return (
    <>
    <Head>
      <title>Wagmi</title>
    </Head>
    <Flex direction="column" width="100vw" height="100vh">
      <Header isAuthenticated={isAuthenticated} isAuthenticating={isAuthenticating} user={user} authenticate={authenticate} logout={logout} isLoggingOut={isLoggingOut} />
      <Box flex="1" bgGradient="linear(to-br, teal.600, green.200)" px="52" py="20">
        <Tabs size="lg" colorScheme="green" align="center" variant="enclosed">
          <TabList>
            <Tab fontWeight="bold">Profile</Tab>
            <Tab fontWeight="bold">Balance</Tab>
            <Tab fontWeight="bold">Transactions</Tab>
            <Tab fontWeight="bold">NFTs</Tab>
            <Tab fontWeight="bold">Send MATIC</Tab>
            <Tab fontWeight="bold">Buy Me a Coffee</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Profile user={user}/>
            </TabPanel>
            <TabPanel>
              <Balance user={user} />
            </TabPanel>
            <TabPanel>
              <Transactions user={user}/>
            </TabPanel>
            <TabPanel>
              <Nft user={user}/>
            </TabPanel>
            <TabPanel>
              <Send/>
            </TabPanel>
            <TabPanel>
              <Coffee/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
   </>
  )
}
