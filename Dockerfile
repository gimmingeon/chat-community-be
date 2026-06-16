# node 설치
FROM node:22

# docker에 app을 만들어서 app 폴더에 copy..로 내 폴더들을 저장한다
WORKDIR /app

# package복사
COPY package*.json ./

# 필요한 패키지들 설치
RUN npm install

# 내 백엔드 프로젝트 전부 복사
COPY . .

# npm run build하는거임 docker에
RUN npm run build

#  포트 열기
EXPOSE 3000

# 실행하기
CMD ["node", "dist/main.js"]