import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Flex } from "@radix-ui/themes";

export function Header() {
    return (
        <Flex
            position="sticky"
            p="4"
            justify="between"
            style={{ backgroundColor: "#2ecc71", borderBottom: "2px solid var(--mint-track)", }}
        >
            <Box className="text-center mt-2">
                <img width={"128"} height={"64"} src="/sadeceyazi.png"></img>
            </Box>

            <Box>
                <ConnectButton />
            </Box>
        </Flex>
    );
}
