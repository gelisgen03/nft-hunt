import { ConnectButton } from "@mysten/dapp-kit";
import { Box } from "@radix-ui/themes";

export function MainPage() {
    return (
        <main className="flex flex-col items-center justify-center text-center px-6 py-12 space-y-8 bg-gray-100 min-h-screen">
            <img width={"256"} height={"256"} src="/logoson.png"></img>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                Find it, Hunt it, Own it
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 max-w-2xl">
                Sui blockchain üzerinde bilmeceleri çöz, haritada doğru yeri bul ve benzersiz NFT'leri kazan!
                Koleksiyonları tamamla ve özel kartların sahibi ol.
            </p>
            <Box className="!m-8">
                <ConnectButton />
            </Box>
            <div className="w-64 max-w-4xl overflow-hidden rounded-2xl shadow-lg">
                <video
                    src="/video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-64 h-auto"
                />
            </div>
            <div className="!m-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-2xl font-semibold text-green-500 mb-2">Bilmece Al</h2>
                    <p className="text-gray-600">Sui blockchain'ine bağlan ve ilk bilmeceni al.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-2xl font-semibold text-blue-500 mb-2">Haritada Bul</h2>
                    <p className="text-gray-600">Cevabı haritada işaretle ve doğruluğunu onayla.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-2xl font-semibold text-green-500 mb-2">NFT'yi Sahiplen</h2>
                    <p className="text-gray-600">Doğru cevabın ödülü eşsiz bir NFT kartı olsun.</p>
                </div>
            </div>
        </main>
    );
}
