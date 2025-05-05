import { Box, Flex, Text } from "@radix-ui/themes";
import { FaGithub, FaInstagram, FaLinkedin, } from "react-icons/fa"; // sosyal medya ikonları
import { ThreeDots } from "./ThreeDots";

export function Footer() {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minHeight="40vh"
            className="relative overflow-hidden"
        >
            <div className="absolute inset-0 from-blue-500 via-green-400 to-blue-700 bg-animated opacity-80"></div>
            <Flex
                direction="column"
                align="center"
                justify="between"
                className="relative z-10 mb-12 text-white space-y-4"
            >
                <ThreeDots />
                <Box className="text-center">
                    <img width={"128"} height={"128"} src="/logosonson.png"></img>
                </Box>
                <Text size="4" weight="medium" m={"9"} >
                    Find it, Hunt it, Collect it
                </Text>
                <Flex gap="4" className="!m-12 !mb-2">
                    <a href="https://github.com/yunusefeyilmaz/nft-hunt" target="_blank" rel="noopener noreferrer" className="hover:scale-110 hover:text-blue-700 transition">
                        <FaLinkedin size={32} />
                    </a>
                    <a href="https://github.com/yunusefeyilmaz/nft-hunt" target="_blank" rel="noopener noreferrer" className="hover:scale-110 hover:text-yellow-300 transition">
                        <FaGithub size={32} />
                    </a>
                    <a href="https://instagram.com/enfyna" target="_blank" rel="noopener noreferrer" className="hover:scale-110 hover:text-pink-400 transition">
                        <FaInstagram size={32} />
                    </a>
                </Flex>
                <hr style={{
                    color: '#eeeeee',
                    backgroundColor: '#eeeeee',
                    height: 5,
                    borderColor: '#eeeeee',
                    width: '100%',
                }} />
            </Flex>
        </Flex>
    );
}
