# MOLRU (멜로디 NFT 마켓 플레이스 서비스)

## 개발 환경

### Backend

- IntelliJ
- Java 11
- Gradle 7.4.1
- Spring Boot 2.6.5
- Spring Data JPA
- QueryDsl 5.0.0
- Spring Swagger2
- MySQL(DB)

### Frontend

- Visual Studio Code
- Node 16.13.0
- Yarn berry 3.2.0
- React
- Create React App
- MUI v5
- Web3 1.7.1

### Block chain

- Ganache
- Truffle
- Solidity
- Open Zeppelin

### Deploy

- AWS EC2 (ubuntu 20.04)
- Docker
- Nginx

## 빌드 및 배포

### [Docker 설치](https://docs.docker.com/engine/install/ubuntu/)

```bash
$ sudo apt-get update

$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

- [Docker Compose 설치](https://docs.docker.com/compose/install/#install-compose-on-linux-systems)

```bash
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

$ sudo chmod +x /usr/local/bin/docker-compose
```

### Backend, DB, Frontend 배포(Docker)

1. git clone

```bash
$ git clone https://lab.ssafy.com/s06-blockchain-nft-sub2/S06P22B107.git
```

2. Dockerfile을 활용한 build, run (이미지 생성 및 컨테이너 실행)

```bash
# frontend
$ cd frontend

$ sudo docker build -t molru_frontend:0.1 .
$ sudo docker run -d --name molru_fe -p 3000:80 molru_frontend:0.1

# mysql
$ cd ../backend/mysql

$ sudo docker build -t mm .
$ sudo docker-compose up -d

# backend
$ cd ..

$ sudo docker build -t molru_backend:0.1 .
$ sudo docker run -d --name molru_be -p 9090:80 molru_backend:0.1
```

### Nginx 설정 및 SSL 인증서 적용(Docker)

- SSL 인증서 발급 (letsencrypt)

```bash
sudo apt-get install letsencrypt
sudo letsencrypt certonly --standalone -d j6b107.p.ssafy.io
```

- 발급받은 pem키들을 nginx 경로로 복사

```bash
$ cd ../nginx

$ cp /etc/letsencrypt/live/i6b103.p.ssafy.io/fullchain.pem ./
$ cp /etc/letsencrypt/live/i6b103.p.ssafy.io/privkey.pem ./
```

- Dockerfile을 활용한 build, run (Nginx 이미지 생성 및 컨테이너 실행)

```bash
$ sudo docker build -t molru_nginx:0.1 .
$ sudo docker run -d -p 80:80 --name proxy molru_nginx:0.1
```

## PORTS 정리

- 80 -> HTTP(/ -> frontend, /api/ -> backend)
- 3307 -> MySQL
- 9090 -> Backend
- 3000 -> Frontend

## Docker Container 상태 확인 (4개)

### 전부 Docker로 배포 완료!

```bash
$ sudo docker ps
```
