import { Flex } from "@radix-ui/themes";

export function ThreeDots() {
    return (
        <Flex direction="row"
            align="center"
            justify="center"
            gapX={"4"}
            my="1">
            <div style={{ backgroundColor: "black", borderColor: "white", borderRadius: "100%", borderWidth: "4px" }}></div>
            <div style={{ backgroundColor: "black", borderColor: "white", borderRadius: "100%", borderWidth: "4px" }}></div>
            <div style={{ backgroundColor: "black", borderColor: "white", borderRadius: "100%", borderWidth: "4px" }}></div>
        </Flex>
    )
}

