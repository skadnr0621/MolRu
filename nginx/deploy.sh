sudo docker stop proxy && sudo docker rm proxy

sudo docker rmi molru_nginx:0.1

sudo docker build -t molru_nginx:0.1 .
sudo docker run -d -p 80:80 --name proxy molru_nginx:0.1
