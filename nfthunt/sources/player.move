module nfthunt::player;

use nfthunt::player;
use std::string::String;
use sui::balance::{Self, Balance};
use sui::display;
use sui::package;
use sui::random::{Self, Random};
use sui::sui::SUI;

const NFT_MINT_COST: u64 = 10_000_000; // 0.01 SUI

public struct Player has key {
    id: UID,
    u_address: address,
    question: Question, // Oyuncunun sorusu
    tries_left: u8, // Kullanıcının o günki cevabı için hakkı (başlangıçta 3)
    last_question_time: u64, // Son sorunun sorulduğu zaman
}
public struct QuestionText has key, store {
    id: UID,
    question: String,
    address: address,
}
public struct Card has key, store {
    id: UID,
    name: String,
    description: String,
    image_url: String,
}

public struct AbstractCard has copy, drop, store {
    name: String,
    description: String,
    image_url: String,
}

public struct Question has copy, drop, store {
    question: String,
    latitude: u64,
    longitude: u64,
    distanceFromLocation: u64,
    dropRate: u64,
    card: AbstractCard,
}

public struct Treasury<phantom T> has key, store {
    id: UID,
    balance: Balance<T>,
    nft_mint_cost: u64,
}

public struct Collection has key, store {
    id: UID,
    name: String,
    description: String,
    image_url: String,
}

// === Witnesses ===
public struct PLAYER has drop {}

fun init(otw: PLAYER, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);

    let mut display = display::new<Card>(&publisher, ctx);

    let mut displayCollection = display::new<Collection>(&publisher, ctx);

    display.add(b"name".to_string(), b"#{name}".to_string());
    display.add(b"description".to_string(), b"{description}".to_string());
    display.add(b"image_url".to_string(), b"{image_url}".to_string());

    displayCollection.add(b"name".to_string(), b"#{name}".to_string());
    displayCollection.add(b"description".to_string(), b"{description}".to_string());
    displayCollection.add(b"image_url".to_string(), b"{image_url}".to_string());

    display.update_version();
    displayCollection.update_version();

    let treasury = Treasury<SUI> {
        id: object::new(ctx),
        balance: balance::zero(),
        nft_mint_cost: NFT_MINT_COST,
    };

    transfer::public_transfer(display, ctx.sender());
    transfer::public_transfer(displayCollection, ctx.sender());
    transfer::public_transfer(publisher, ctx.sender());
    transfer::share_object(treasury);
}

#[error]
const EINVALID_ANSWER: vector<u8> = b"Invalid answer";
#[error]
const ERETRY_LIMIT: vector<u8> = b"Retry limit exceeded";

#[allow(unused_function)]
public fun create_collection(
    card1: Card,
    card2: Card,
    /* card3: Card,
    card4: Card,
    card5: Card,
    card6: Card,
    card7: Card, */
    ctx: &mut TxContext,
) {
    // Önce kartları yakaaaalım
    let Card { id: id1, name: name1, .. } = card1;
    let Card { id: id2, name: name2, .. } = card2;
    /*   let Card { id: id3, name: name3, .. } = card3;
    let Card { id: id4, name: name4, .. } = card4;
    let Card { id: id5, name: name5, .. } = card5;
    let Card { id: id6, name: name6, .. } = card6;
    let Card { id: id7, name: name7, .. } = card7; */

    if (name1.as_bytes() != b"Pamukkale Travertenleri") {
        assert!(false, EINVALID_ANSWER);
    };
    if (name2.as_bytes() != b"Aya Sofya") {
        assert!(false, EINVALID_ANSWER);
    };
    /*  if (name3.as_bytes() != b"Efes Antik Kenti") {
        assert!(false, EINVALID_ANSWER);
    };
    if (name4.as_bytes() != b"Kapadokya") {
        assert!(false, EINVALID_ANSWER);
    };
    if (name5.as_bytes() != b"Yeşil Türbe") {
        assert!(false, EINVALID_ANSWER);
    };
    if (name6.as_bytes() != b"Saat Kulesi") {
        assert!(false, EINVALID_ANSWER);
    };
    if (name7.as_bytes() != b"Anıtkabir") {
        assert!(false, EINVALID_ANSWER);
    }; */

    id1.delete();
    id2.delete();
    /* id3.delete();
    id4.delete();
    id5.delete();
    id6.delete();
    id7.delete(); */

    // Yeni Collection kartı oluştur
    let collection = Collection {
        id: object::new(ctx),
        name: b"Türkiye Harikalar Koleksiyonu".to_string(),
        description: b"Türkiye'nin 7 ikonik yerini keşfettin! Tebrikler, Harikalar Koleksiyonuna sahip oldun.".to_string(),
        image_url: b"https://iili.io/3VLKlNs.png".to_string(),
    };

    transfer::transfer(collection, tx_context::sender(ctx));
}

fun create_questions(): vector<Question> {
    let pamukkale = AbstractCard {
        name: b"Pamukkale Travertenleri".to_string(),
        description: b"Bembeyaz pamuk tepelerini andıran doğal güzelliğiyle dünyaca ünlü Pamukkale, sıcak termal suları ve kireçtaşı havuzlarıyla eşsiz bir doğa harikasıdır.".to_string(),
        image_url: b"https://iili.io/3VLKxDJ.png".to_string(),
    };
    let anitkabir = AbstractCard {
        name: b"Anıtkabir".to_string(),
        description: b"Cumhuriyetimizin kurucusu Mustafa Kemal Atatürk'ün ebedi istirahatgâhı. Modern Türk mimarisinin en görkemli anıtlarından biri ve ulusal birlik sembolü.".to_string(),
        image_url: b"https://iili.io/3VLKTVR.png".to_string(),
    };
    let efes = AbstractCard {
        name: b"Efes Antik Kenti".to_string(),
        description: b"Dünyanın yedi harikasından biri olan Artemis Tapınağı'na ev sahipliği yapmış, Roma döneminin en önemli şehirlerinden biri. Tiyatrosu ve antik caddeleriyle zamanda yolculuk fırsatı.".to_string(),
        image_url: b"https://iili.io/3VLK7St.png".to_string(),
    };
    let kapodokya = AbstractCard {
        name: b"Kapadokya".to_string(),
        description: b"Binlerce yıllık tarihi, yer altı şehirleri ve sıcak hava balonlarıyla gökyüzüne renk katan büyülü coğrafya. Doğanın ve tarihin iç içe geçtiği eşsiz bir diyar.".to_string(),
        image_url: b"https://iili.io/3VLK5lI.png".to_string(),
    };
    let yesilTurbe = AbstractCard {
        name: b"Yeşil Türbe".to_string(),
        description: b"Osmanlı’nın erken dönem mimarisinin en zarif örneklerinden biri. Yeşil çinileriyle Bursa'nın simgesi haline gelmiş, tarihi ve manevi önemi büyük bir yapı.".to_string(),
        image_url: b"https://iili.io/3VLKRKN.png".to_string(),
    };
    let saatKulesi = AbstractCard {
        name: b"Saat Kulesi".to_string(),
        description: b"Şehrin kalbinde, Konak Meydanı'nda yer alan bu tarihi kule, Osmanlı’nın zarif taş işçiliğini ve İzmir’in simgesel yüzünü yansıtan özel bir yapı.".to_string(),
        image_url: b"https://iili.io/3VLKuPp.png".to_string(),
    };
    let ayaSofya = AbstractCard {
        name: b"Aya Sofya".to_string(),
        description: b"Bin yılı aşkın bir süre kilise, ardından cami ve müze olarak kullanılan, eşsiz mozaikleri ve kubbesiyle İstanbul'un kalbinde yükselen tarihi bir başyapıt.".to_string(),
        image_url: b"https://iili.io/3VLKIov.png".to_string(),
    };

    // QUESTIONS
    let questionPamukkale = Question {
        question: b"Bembeyaz teraslarıyla sanki bulutların üzerine basıyor gibi hissedersin. Sıcak suyu, şifalı havuzu ve doğanın beyaz mucizesiyle ünlüdür. Her yıl binlerce turistin çıplak ayakla yürüdüğü bu eşsiz doğa harikası, görenleri kendine hayran bırakır. Bahsedilen bu özel yer neresidir?".to_string(),
        latitude: 37_924,
        longitude: 29_123,
        distanceFromLocation: 10,
        dropRate: 30,
        card: pamukkale,
    };
    let questionAnitkabir = Question {
        question: b"Türk milletinin bağımsızlık mücadelesinin simgesi olan bu yapı, efsanevi bir liderin sonsuz istirahatgâhıdır. Mimarisindeki ihtişam, ulusal birliğin ve gücün sembolüdür. Çevresindeki anıtlar ve müze, tarihe ışık tutar. Türkiye’nin en saygın ve kutsal mekânlarından biri olan bu özel yapı nedir?".to_string(),
        latitude: 39_922,
        longitude: 32_836,
        distanceFromLocation: 10,
        dropRate: 30,
        card: anitkabir,
    };
    let questionEfes = Question {
        question: b"Tarih boyunca kralların, filozofların ve tüccarların yollarının kesiştiği antik bir şehir. Bir zamanlar dünyanın yedi harikasından biri burada yükselirdi. Görkemli tiyatrosu ve Celsus Kütüphanesi hâlâ ayakta duran en değerli yapılar arasında yer alır. Arnavut kaldırımlı yollarında yürürken antik çağların ruhunu hissedersin. Bu antik kent neresidir?".to_string(),
        latitude: 37_940,
        longitude: 27_341,
        distanceFromLocation: 10,
        dropRate: 30,
        card: efes,
    };
    let questionKapadokya = Question {
        question: b"Yer altı şehirleriyle tarihin derinliklerine yolculuk yaparsın. Sabahları gökyüzü rengârenk balonlarla dolar, taş evleri ve benzersiz coğrafyasıyla dünyada eşi benzeri yoktur. Zamanında medeniyetler burada iz bırakmış, kayalara oyulmuş kiliseler ve vadilerle büyüleyici bir diyar haline gelmiştir. Bu özel bölge neresidir?".to_string(),
        latitude: 38_652,
        longitude: 34_843,
        distanceFromLocation: 30,
        dropRate: 30,
        card: kapodokya,
    };
    let questionYesilTurbe = Question {
        question: b"Yeşil mozaikleriyle ünlü, Osmanlı döneminin zarif yapılarından biri. İçindeki cami, türbe ve harika hat sanatıyla ziyaretçilerini büyüler. Bursa'nın simgelerinden biri olan bu tarihi yapı, adını renginden alır. Bu özel yapı nedir? ".to_string(),
        latitude: 40_181,
        longitude: 29_074,
        distanceFromLocation: 10,
        dropRate: 30,
        card: yesilTurbe,
    };
    let questionSaatKulesi = Question {
        question: b"Şehir meydanında yükselen, zarif taş işçiliğiyle dikkat çeken bu yapı, zamanla çevresindeki yaşamın bir parçası olmuştur. Saatin her tik takıyla şehri adeta canlı tutar. Osmanlı döneminin izlerini taşıyan, aynı zamanda bölgedeki tarihi yapıların sembolüdür. Bu özel yapı nedir?".to_string(),
        latitude: 38_418,
        longitude: 27_128,
        distanceFromLocation: 10,
        dropRate: 30,
        card: saatKulesi,
    };
    let questionAyaSofya = Question {
        question: b"Binlerce yıl boyunca hem imparatorların hem sultanların gölgesinde kaldı. Zamana meydan okuyan kubbesiyle, hem kilise hem cami hem de müze olarak tarih yazdı. Mimarisi ve mozaikleriyle çağlar boyu hayranlık uyandıran bu yapı, hâlâ ihtişamını koruyor. Bahsedilen bu özel yapı nedir?".to_string(),
        latitude: 41_008,
        longitude: 28_980,
        distanceFromLocation: 10,
        dropRate: 30,
        card: ayaSofya,
    };

    let mut questions = vector::empty<Question>();
    vector::push_back(&mut questions, questionPamukkale);
    vector::push_back(&mut questions, questionAnitkabir);
    vector::push_back(&mut questions, questionEfes);
    vector::push_back(&mut questions, questionKapadokya);
    vector::push_back(&mut questions, questionYesilTurbe);
    vector::push_back(&mut questions, questionSaatKulesi);
    vector::push_back(&mut questions, questionAyaSofya);

    questions
}

fun get_selected_question(r: &Random, ctx: &mut TxContext): Question {
    let questions = create_questions();

    let question_count = vector::length(&questions);

    if (question_count == 0) {
        assert!(false, EINVALID_ANSWER);
    };

    let mut generater = random::new_generator(r, ctx);
    let random_seed = random::generate_u8_in_range(&mut generater, 0, 6);
    // Get the question at the random index
    let random_question_ref = vector::borrow(&questions, random_seed as u64);
    let question = *random_question_ref;
    question
}

public fun get_question_text(player: &mut Player, ctx: &mut TxContext) {
    let question = player.question.question;
    let question_text = QuestionText {
        id: object::new(ctx),
        question: question,
        address: player.u_address,
    };
    transfer::share_object(question_text);
}

#[allow(lint(public_random))]
public fun new_player(u_address: address, r: &Random, ctx: &mut TxContext) {
    let question = get_selected_question(r, ctx);
    let player = Player {
        id: object::new(ctx),
        u_address,
        question: question,
        tries_left: 3,
        last_question_time: 0,
    };

    transfer::share_object(player);
}

public fun send_answer(player: &mut Player, lat: u64, lon: u64, ctx: &mut TxContext) {
    if (player.tries_left < 1) {
        assert!(false, ERETRY_LIMIT);
    };

    let question = player.question;
    let correct_lat = question.latitude;
    let correct_lon = question.longitude;

    let latDiff = if (lat > correct_lat) { lat - correct_lat } else { correct_lat - lat };
    let lonDiff = if (lon > correct_lon) { lon - correct_lon } else { correct_lon - lon };

    player.tries_left = player.tries_left - 1;

    if (latDiff > question.distanceFromLocation) {
        assert!(false, EINVALID_ANSWER);
    };
    if (lonDiff > question.distanceFromLocation) {
        assert!(false, EINVALID_ANSWER);
    };

    player.tries_left = 0;
    transfer::transfer(mint_card(player, ctx), player.u_address);
}

#[allow(unused_mut_parameter)]
fun mint_card(player: &mut Player, ctx: &mut TxContext): Card {
    let question = player.question;
    let questionCard = question.card;

    let card = Card {
        id: object::new(ctx),
        name: questionCard.name,
        description: questionCard.description,
        image_url: questionCard.image_url,
    };

    card
}

public fun burn_player(player: Player) {
    let Player { id, last_question_time, .. } = player;
    /* let playerLastGame = last_question_time;
    if (playerLastGame < 86400) {
        abort EDAY_NOT_PASSED
    }; */
    id.delete();
}
