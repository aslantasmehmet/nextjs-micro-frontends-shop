# base image
FROM node:18-alpine

# çalışma dizinini oluştur
WORKDIR /app

# package.json ve package-lock.json'u kopyala
COPY package*.json ./

# bağımlılıkları yükle
RUN npm install

# tüm dosyaları kopyala
COPY . .

# Next.js build işlemi
RUN npm run build

# Uygulamanın dışarıya açılacağı port
EXPOSE 3000

# Uygulama başlat
CMD ["npm", "start"]
