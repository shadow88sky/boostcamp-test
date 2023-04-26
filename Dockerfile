#制定node镜像的版本
FROM node:14.20
COPY package.json /app/package.json
WORKDIR /app
#安装依赖
RUN npm install
EXPOSE 3000
#程序启动脚本
CMD ["npm","run", "start:prod"]
COPY . /app/
RUN npx prisma db pull 
RUN npx prisma generate
RUN npm run build
