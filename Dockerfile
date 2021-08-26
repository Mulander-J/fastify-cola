# 加载基础镜像
FROM node
# 注释
LABEL maintainer = "mulander <mualnder@outlook.com>"
# 创建工作目录
WORKDIR /usr/src/app
ADD . /usr/src/app
# 安装项目依赖s
RUN npm install --registry=https://registry.npm.taobao.org
USER node
# 对外暴露端口
EXPOSE 3000
