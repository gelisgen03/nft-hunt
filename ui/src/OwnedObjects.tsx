import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { useSuiClientContext, } from "@mysten/dapp-kit";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Button, Flex, } from "@radix-ui/themes";
import { Header } from "@radix-ui/themes/components/table";


export function OwnedObjects(props: any) {
    const { package_id } = props;

    const account = useCurrentAccount();

    const { data: card_data, isPending, error } = useSuiClientQuery(
        "getOwnedObjects",
        {
            owner: account?.address as string,
            filter: {
                StructType: `${package_id}::player::Card`
            },
            options: {
                showDisplay: true,
                showContent: true,
            }
        },
        {
            enabled: !!account,

        },
    );

    const { data: collection_data, isPending: isp, error: err } = useSuiClientQuery(
        "getOwnedObjects",
        {
            owner: account?.address as string,
            filter: {
                StructType: `${package_id}::player::Collection`
            },
            options: {
                showDisplay: true,
                showContent: true,
            }
        },
        {
            enabled: !!account,

        },
    );

    const ctx = useSuiClientContext();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction({
        execute: async ({ bytes, signature }) =>
            await ctx.client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                    showRawEffects: true,
                    showObjectChanges: true,
                }
            }),
    });

    function collect_collection() {
        let card1_id: string = '';
        let card2_id: string = '';

        console.log(card_data);

        card_data?.data.forEach(e => {
            if (e.data?.display?.data!!.name == '#Pamukkale Travertenleri')
                card1_id = e.data.objectId
            else if (e.data?.display?.data!!.name == '#Aya Sofya')
                card2_id = e.data.objectId
        })

        if (!card1_id) {
            alert("Pamukkale yok!");
            return;
        }
        if (!card2_id) {
            alert("Aya Sofya yok!");
            return;
        }

        const tx = new Transaction();
        tx.moveCall({
            target: `${package_id}::player::create_collection`,
            package: package_id,
            module: "player",
            arguments: [
                tx.object(card1_id),
                tx.object(card2_id),
            ]
        })

        signAndExecute({
            transaction: tx,
            chain: 'sui:testnet',
        },
            {
                onSuccess: (res) => {
                    console.log('res', res);
                    location.reload();
                },
            },
        );
    }
    if (!account) {
        return;
    }

    if (error) {
        return <Flex>Error: {error.message}</Flex>;
    }

    if (err) {
        return <Flex>Error: {err.message}</Flex>;
    }

    if (isPending || !card_data) {
        return <Flex>Loading...</Flex>;
    }

    if (isp || !collection_data) {
        return <Flex>Loading...</Flex>;
    }

    if (card_data.data.length === 0) {
        return (<hr />)
    }

    // if (collection_data.data.length === 0) {
    // return (<hr />)
    // }

    card_data.data.map((object) => console.log(object))

    return (
        <Flex direction="column"
            align="center"
            justify="center"
            my="8">
            <Header className="text-center font-bold text-6xl">
                KARTLARIM
            </Header>
            <Flex direction="row"
                align="center"
                justify="center"
                wrap={'wrap'}
                my="8">
                {card_data.data.map((object) => (
                    <a href={`https://explorer.polymedia.app/object/${object.data?.objectId}?network=testnet`} key={object.data?.objectId} >
                        < img style={{ maxHeight: "25rem" }} src={object.data?.display?.data!!.image_url}></img>
                    </a>
                ))
                }
            </Flex >
            <Button m={'4'} onClick={collect_collection}>
                Koleksiyon Kartı Oluştur
            </Button>
            <br />
            <Header className="text-center font-bold text-6xl">
                KOLEKSIYONLARIM
            </Header>
            <Flex direction="row"
                align="center"
                justify="center"
                wrap={'wrap'}
                my="8">
                {collection_data.data.map((object) => (
                    <a href={`https://explorer.polymedia.app/object/${object.data?.objectId}?network=testnet`} key={object.data?.objectId} >
                        < img style={{ maxHeight: "25rem" }} src={object.data?.display?.data!!.image_url}></img>
                    </a>
                ))
                }
            </Flex >
        </Flex >
    );
}
