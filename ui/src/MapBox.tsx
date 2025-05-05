import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

import { useCookies } from "react-cookie";

import { useSuiClient, useSuiClientContext, } from "@mysten/dapp-kit";
import { useCurrentAccount, useCurrentWallet, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { Label } from "@radix-ui/themes/components/context-menu";
import { Badge, Container, Flex } from "@radix-ui/themes";
import { MainPage } from "./MainPage";
import { FaCheck, FaQuestion, FaRemoveFormat } from "react-icons/fa";

// const moduleName = 'nfthunt';

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getObjectById(client: SuiClient, objectId: string) {
    await wait(250);
    const response = await client.getObject({
        id: objectId,
        options: {
            showContent: true,  // objenin içeriğini istiyoruz
        },
    });
    console.log('response getObjectById', response);
    if (response.data && response.data.content && response.data.content.dataType === 'moveObject') {
        return response.data.content.fields; // fields gerçek veriler olur
    } else {
        throw new Error('Object not found or not a MoveObject');
    }
}

export const MapBox = (props: any) => {
    const { package_id } = props;

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([39, 35]);
    const [player_id, set_question_id, remove_player_id] = useCookies(['player_id']);
    const [question, set_question, remove_question] = useCookies(['question']);

    const Markers = () => {
        const map = useMapEvents({
            click(e) {
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
                console.log(e.latlng);
            },
        })
        map;
        return (
            selectedPosition ?
                <Marker
                    key={selectedPosition[0]}
                    position={selectedPosition}
                    interactive={false}
                />
                : null
        )
    }

    const ctx = useSuiClientContext();
    const wallet = useCurrentWallet().currentWallet;
    const client = useSuiClient();
    const user = useCurrentAccount();
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

    if (!user || !wallet || !ctx || !client) {
        function get_cookie(name: string) {
            return document.cookie.split(';').some(c => {
                return c.trim().startsWith(name + '=');
            });
        }
        const path = "/";
        ['question', 'player_id'].forEach(cookie => {
            if (get_cookie(cookie)) {
                document.cookie = cookie + "=" +
                    ";path=" + path +
                    ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
            }
        });
        return (
            <MainPage />
        );
    }

    const send_answer = async () => {
        console.log(user.address)

        selectedPosition[0] = parseInt(selectedPosition[0].toFixed(3).replace(".", ""));
        selectedPosition[1] = parseInt(selectedPosition[1].toFixed(3).replace(".", ""));

        console.log(selectedPosition);

        const tx = new Transaction();
        tx.moveCall({
            target: `${package_id}::player::send_answer`,
            package: package_id,
            module: "player",
            arguments: [
                tx.object(player_id.player_id),
                tx.pure.u64(selectedPosition[0]),
                tx.pure.u64(selectedPosition[1]),
            ]
        })

        signAndExecute({
            transaction: tx,
            chain: 'sui:testnet',
        },
            {
                onSuccess: (res) => {
                    console.log('object change', res.objectChanges);

                    remove_player_id('player_id');
                    remove_question('question');

                    location.reload();
                },
            },
        );

    }

    const delete_question = async () => {
        if (!player_id.player_id) return;

        const tx = new Transaction();
        tx.moveCall({
            target: `${package_id}::player::burn_player`,
            package: package_id,
            module: "player",
            arguments: [
                tx.object(player_id.player_id),
            ]
        })

        signAndExecute({
            transaction: tx,
            chain: 'sui:testnet',
        },
            {
                onSuccess: (res) => {
                    console.log('res', res);
                    remove_player_id('player_id');
                    remove_question('question');
                },
            },
        );
    }

    const create_question = async () => {
        console.log(selectedPosition);
        console.log(user.address)

        const tx = new Transaction();
        tx.moveCall({
            target: `${package_id}::player::new_player`,
            package: package_id,
            module: "player",
            arguments: [
                tx.pure.address(user.address),
                tx.object("0x8"),
            ]
        })

        signAndExecute(
            {
                transaction: tx,
                chain: 'sui:testnet',
            },
            {
                onSuccess: (res) => {
                    console.log('object change', res.objectChanges);

                    let qid = res.objectChanges!!.find((e) => e.type == 'created');
                    if (!qid) return;

                    set_question_id("player_id", qid.objectId);

                    const txx = new Transaction();
                    txx.moveCall({
                        target: `${package_id}::player::get_question_text`,
                        package: package_id,
                        module: "player",
                        arguments: [
                            txx.object(qid.objectId),
                        ]
                    })

                    signAndExecute(
                        {
                            transaction: txx,
                            chain: 'sui:testnet',
                        },
                        {
                            onSuccess: (res) => {
                                console.log('question', res.objectChanges);

                                let qid = res.objectChanges!!.find((e) => e.type == 'created');
                                if (!qid) return;

                                set_question("question", qid.objectId);

                                getObjectById(client, qid.objectId)
                                    .then(res => { console.log('res', res); set_question("question", res); });
                            },
                        },
                    );
                },
            },
        );
    }

    return (
        <Container className="text-center bg-gray-100">
            <Flex
                direction="column"
                align="center"
                justify="center"
                className="relative overflow-hidden"
            >
                <Container>
                    {question.question ?
                        <Badge className="inline-flex items-center gap-x-1.5 py-1.5 px-3 m-4 rounded-lg text-xs font-medium bg-blue-800 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
                            <Label className="text-wrap text-xl text-center text-white"> {JSON.stringify(question.question.question)}</Label>
                        </Badge>
                        :
                        <Badge className="inline-flex items-center gap-x-1.5 py-1.5 px-3 m-4 rounded-lg text-xs font-medium bg-blue-800 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
                            <Label className="text-wrap text-xl text-center text-white">Bilmece Oluşturmak İçin Alttaki Butona Bas</Label>
                        </Badge>
                    }
                </Container >
                <Container height='70vh' width={"80vw"}>
                    <MapContainer
                        center={selectedPosition}
                        zoom={6}
                        scrollWheelZoom={true}
                        style={{ height: "70vh" }}
                    >
                        <Markers />
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </Container >
                {player_id.player_id && question.question ?
                    <Flex direction="row" align="center" justify="center" className="m-4">
                        <button
                            type={'button'}
                            onClick={send_answer}
                            className={`p-2 m-2 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200`}
                        >
                            <FaCheck />Cevap Gönder
                        </button>
                        <button
                            type={'button'}
                            onClick={delete_question}
                            className={`p-2 m-2 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200`}
                        >
                            <FaRemoveFormat />Bilmeceyi Sil
                        </button>
                    </Flex>
                    :
                    <Flex direction="row" align="center" justify="center" className="m-4">
                        <button
                            type={'button'}
                            onClick={create_question}
                            className={`p-2 m-2 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200`}
                        >
                            <FaQuestion />Yeni Bilmece
                        </button>
                    </Flex>
                }
            </Flex >
        </Container >
    )
}
