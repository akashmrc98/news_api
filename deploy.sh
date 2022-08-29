sudo git pull origin master
docker stop new-api-container 
docker rm new-api-container 
docker rmi news-api/v1 
docker build --no-cache -t  news-api/v1 .
docker run -p 5000:5000 -p 587:587 --restart=always --name  new-api-container -d --env-file .env news-api/v1 
docker system prune -a -f
docker ps -a
