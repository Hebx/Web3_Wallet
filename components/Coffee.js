import { FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, Input, Button, useToast } from "@chakra-ui/react";
import Moralis from "moralis";
import { useWeb3Transfer } from "react-moralis";
import CustomContainer from "./CustomContainer";
import React from "react";

export default function Send() {

    const [amount, setAmount] = React.useState(0)
    const receiver = '0xb36faaA498D6E40Ee030fF651330aefD1b8D24D2'
    const toast = useToast()
    const { fetch, isFetching } = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount === '' ? 0 : amount),
        receiver: receiver,
        type: "native",
    });

    const handleChange = (value) => setAmount(value)

    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Buy Coffee</Text>
            <form onSubmit={async e => {
                e.preventDefault()
                await Moralis.enableWeb3()
                fetch({
                    onSuccess: () => {
                        toast({
                            title: 'Coffee succesfully purchased.',
                            description: "Coffee Balance are showing up in Developer's wallet.",
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                          })
                          setAmount(0)
                          setReceiver('')
                    } ,

                })
            }}>
                <FormControl mt="4">
                    <FormLabel htmlFor='amount'>Amount</FormLabel>
                    <NumberInput step={0.1} onChange={handleChange}>
                        <NumberInputField id='amount' value={amount} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <FormLabel mt="4" htmlFor="receiver">Send to</FormLabel>
                        <Input id='receiver' type='text' placeholder="Receiver address" value={receiver} onChange={e => setReceiver(e.target.value)} />
                </FormControl>
                <Button mt="4" type="submit" colorScheme="green" disabled={isFetching}>💸&nbsp; Send MATIC</Button>
            </form>
        </CustomContainer>
    )
}
