# 使用node10版本
FROM node:12-alpine as build-stage

# 谁在维护这个项目
LABEL maintainer=11776174@qq.com

# 创建了一个工作目录
WORKDIR /app

# 拷贝所有文件, 除了 .dockerignore 排除的文件
COPY . .

# 装包 使用 yarn 或者 npm 装包
#RUN npm install cnpm -g --no-progress --registry=https://registry.npm.taobao.org
#RUN yarn install --registry=https://registry.npm.taobao.org

#RUN cnpm install --no-progress

RUN npm install

# 构建我们的项目
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
