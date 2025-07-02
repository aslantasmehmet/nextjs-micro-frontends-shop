# base image
FROM node:18-alpine

# çalışma dizinini oluştur
WORKDIR /app

# package.json ve package-lock.json'u kopyala
COPY cart/package*.json ./

# bağımlılıkları yükle
RUN npm install

# cart uygulamasını kopyala
COPY cart .

# Next.js build işlemi
RUN npm run build

# Uygulamanın dışarıya açılacağı port
EXPOSE 3001

# Uygulama başlat
CMD ["npm", "start"]
