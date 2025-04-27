import { MapBox } from "./MapBox";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { OwnedObjects } from "./OwnedObjects";

const packageObjectId = '0x39f6771e5d6d704b140aa1087a638b6d9a9cf561bcbd312d66d9ac152a168db2';

function App() {
    return (
        <>
            <Header />

            <MapBox package_id={packageObjectId} />

            <OwnedObjects package_id={packageObjectId} />

            <Footer />
        </>
    );
}

export default App;
