# 🗺️ NFTHunt - Blockchain Tabanlı NFT Oyunu

**NFTHunt**, dünyadaki tarihi mekanlar ve özel yapılarla ilgili bilgi yarışması şeklinde oynanan bir **NFT tabanlı oyun** projesidir. Bu oyun, kullanıcıların bilgi edinirken eğlenmelerini, NFT kartları toplayarak koleksiyonlar oluşturmalarını sağlar.

## 🚀 Proje Hakkında

NFTHunt, kullanıcıların dünyadaki önemli tarihi mekanlar ve yapılar hakkında soruları cevaplayarak, doğru cevabı harita üzerinden seçip NFT kartları kazandıkları bir oyun platformudur. Her gün yeni bir soru ile kullanıcılar etkileşime girer ve kart koleksiyonları oluştururlar. Kartlar birleştirilerek daha değerli koleksiyonlar oluşturulabilir.

## 💡 Özellikler

- **🎯 Günlük Sorular**: Kullanıcıya her gün bir tarihi mekan ya da yapı ile ilgili soru sorulur.
- **🗺️ Harita Üzerinden Seçim**: Doğru cevabı harita üzerinde seçerek, o mekanın NFT kartını kazanır.
- **💳 Kart Koleksiyonu**: Kullanıcılar kazandıkları kartları biriktirir ve farklı koleksiyonlar oluşturur (Örnek: Türkiye Koleksiyonu, Dünya Harikaları Koleksiyonu).
- **🔗 NFT Kart Birleştirme**: Kullanıcılar, topladıkları kartları birleştirerek daha değerli ve nadir kartlar oluşturabilirler.
- **🎮 Eğlenceli ve Etkileşimli**: Kullanıcılar, tarih ve kültür hakkında bilgi edinirken eğlenceli bir deneyim yaşar.

## 🔧 Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzü için.
- **Vite**: Hızlı geliştirme için.
- **TypeScript**: Daha güvenli ve sağlam kod yazımı için.
- **Node.js**: Sunucu tarafı işlemleri için.
- **Leaflet**: Harita entegrasyonu için.
- **SUI SDK**: Blockchain işlemleri için.
- **SUI**: Blockchain altyapısı.
- **Move Dili**: Blockchain tabanlı akıllı sözleşmeler için.

## 📦 Kurulum ve Çalıştırma

### 1. 📋 Gereksinimler

- **Node.js** ve **Yarn** kurulu olmalıdır.
- **SUI SDK** ve **SUI Move** yapılandırılmış olmalıdır.

### 2. ⚙️ Projeyi Çalıştırma

1. **Proje dosyasını klonlayın**:
    ```bash
    git clone https://github.com/yunusefeyilmaz/nft-hunt.git
    ```

2. **SUI Move Projesi için Yapılandır**:
   - **nfhunt** klasörüne gidin ve aşağıdaki komutları çalıştırın:
     
     ```bash
     sui move build
     sui move publish
     ```

   - Gelen **packageId** frontend ile entegre edilir.

3. **Frontend Yapılandırması:**:
   - **frontend** klasörüne gidin:
     
     ```bash
     cd frontend
     ```
     
   - Gerekli kütüphaneleri yükleyin:
     
        ```bash
        yarn install
        ```
   - Yapıyı oluşturun:
     
        ```bash
        yarn run build
        ```
    - Uygulamanın önizlemesini başlatın:
     
        ```bash
        yarn run preview
        ```
    



4. Uygulamaya Erişim:
 - **localhost:4137** adresine giderek uygulamayı başlatın.

## 🧑‍💻 Uygulama Kullanımı

### 1. 📝 SUI Wallet ile giriş yapın:

- Uygulamaya giriş yapmak için SUI Wallet hesabınızı bağlayın.

### 2. 🎯 Yeni Bilmeceye Başlayın:

- Ekranın üst kısmındaki Yeni Bilmece butonuna tıklayın.
- Gerekli işlemler ve transaction'lar tamamlandıktan sonra, harita üzerinde doğru cevabı işaretleyin.

### 3. 💳 Cevap Gönderme ve NFT Kazanma:

- **Cevap Gönder** butonuna tıklayın.
- Cevabınız doğruysa, NFT kartınız hesabınıza aktarılır.

### 4. 📕 Kartlar ve Koleksiyonlar:

- Sayfa altında kazandığınız kartlar ve koleksiyonlar görüntülenir.
- Topladığınız kartları birleştirerek yeni koleksiyonlar oluşturabilirsiniz.


## 🚀 Gelecek Planları

- **🔄 Değiş Tokuş Sistemi**: Kullanıcılar NFT kartlarını birbirleriyle takas edebilecekler.
- **💸 NFT Pazar Yeri**: Kullanıcılar kartları satıp satın alabilecekler.
- **🌍 Yeni Bölgesel Koleksiyonlar**: Farklı coğrafi bölgeler ve tarihsel yapıların koleksiyonları eklenecek.

## 🤝 Katkı

Projeye katkıda bulunmak isterseniz, **Pull Request** göndererek önerilerinizi iletebilirsiniz.


## 📬 Katkı Sağlayanlar
- https://github.com/gelisgen03
- https://github.com/yunusefeyilmaz
- https://github.com/enfyna

