# User 服务

## 安装

1. 项目根目录创建.env 文件,内容为(对应 db 连接需要自己改下)

```
DATABASE_URL="postgresql://user:pwd@host:port/db"
```

2. 依次执行下面命令进行数据库表同步(从 schema 同步到 db)

```
pnpm install
npx prisma migrate dev --name init
```

## 运行

根目录执行

```
pnpm start
```

## 部署

部署可以用 docker 或者 k8s 部署

### docker

项目根目录执行

1. 编译成 docker image

```
docker build -t user .
```

2. 运行

```
docker run -d -p 3000:3000 user
```

### k8s 部署

1. 通过 kubectl 创建 Deployment

```
kubectl apply -f user-deployment.yaml

```

2. 创建一个 Service 将 Pod 暴露出去

```
kubectl apply -f user-service.yaml
```

## 文档

Api 文档采用了 Swagger(只有非正式环境才能访问)  
本地启动后,可以访问 http://localhost:3000/api 访问 swagger 文档

## 测试

查看测试覆盖率

```
pnpm run test:cov
```
