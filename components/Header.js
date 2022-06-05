import { Button, Center, Flex, Text } from "@chakra-ui/react"
import transakSDK from '@transak/transak-sdk';
export default function Header({isAuthenticated, isAuthenticating, user, authenticate, logout, isLoggingOut}) {

 function loadInit() {
        const transak = new transakSDK({
          apiKey: '07d4475a-4b8c-49d6-ba88-61075d649c6f',  // Your API Key
          environment: 'STAGING', // STAGING/PRODUCTION
          hostURL: window.location.href,
          widgetHeight: '625px',
          widgetWidth: '500px',
          // Examples of some of the customization parameters you can pass
          defaultCryptoCurrency: 'MATIC', // Example 'ETH'
          walletAddress: user.get('maticAddress'), // Your customer's wallet address
        //   themeColor: '[HEXCOLOR]', // App theme color
          fiatCurrency: 'USD', // If you want to limit fiat selection eg 'USD'
          //email: '', // Your customer's email address
          redirectURL: 'localhost:3000'
        });

        transak.init();

        // To get all the events
        transak.on(transak.ALL_EVENTS, (/*data*/) => {
          // console.log(data)
        });

        // This will trigger when the user marks payment is made.
        transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (/*orderData*/) => {
          // console.log(orderData);
          transak.close();
        });
        return () => {
          transak.cleanup();
        }
      }

    return(
        <header>
            <Flex justifyContent="space-between" bgGradient="linear(to-br, teal.400, green.200)" color="white" px={10} py={6}>
                <Center><Text fontSize="xl" fontWeight="bold">Crypto Wallet Dashboard</Text></Center>
                <Center>
                    {isAuthenticated ? (
                        <>
                        <Text>{user.getUsername()}</Text>
                        <Button ml={4} colorScheme="green" onClick={logout} disabled={isLoggingOut}>Logout</Button>
                        </>
                         ) : (
                            <Button colorScheme="green" onClick={() => authenticate({
                                signingMessage: "Sign to My Crypto Wallet Dashboard"
                            })} disabled={isAuthenticating}>Login</Button>
                        )}

            </Center>
              <Flex
                order={[-1, null, null, 2]}
                alignItems={'center'}
                justifyContent={['flex-start', null, null, 'flex-end']}
              >
                  <Button ml={4} colorScheme="green" onClick={loadInit}>Add Funds </Button>
            </Flex>
              </Flex>
        </header>
    )
}
