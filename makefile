mysql:
	 docker-compose -f docker/docker-compose.yml up mysql -d

down_mysql:
	docker-compose -f docker/docker-compose.yml down mysql 
	