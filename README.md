# Astronomic Catalog

## Description

This project is for final project for 'database' class.  
So the real thing is inside the folder ``database``, the apps as the frontend and backend were made just to use the datasources and display it in a human-readeable way.  
The main **topics** to cover with this project are:  
1. DBSM
2. Relational Model - ER
3. Basic SQL - DDL/DML/DQL
4. Normalisation - 1NF to 3NF
5. Relational algebra
6. NoSQL Databases

But as was suggested along classes, we used other services, also took the initiative of add few of topics in this project, just like:  
1. ACID
2. 'N' amount of users in mysql
3. Triggers
4. Functions
5. Procedures
6. Checks - constraints
7. Backups
8. Monitorings - Grafana/Prometheus

## Summary Folders
- Apps
  - Frontend: Web-app to display the project, using [astro](https://astro.build) w/[vue](https://vuejs.org)
  - Backend: Server to consume the db with [NestJs](https://nestjs.com)
- Databases:
  - [mysql](https://www.mysql.com): The main database, fast and simple
  - [mongodb](https://www.mongodb.com/es): Easy for "astronomic events in this month"
  - [grafana](https://grafana.com) w/prometheus: Metrics and display data in ghrapics
  - docs: Recopilation of the documentation about this project
  - docker: Images to deploy this project (frontend, backend, dbs, grafana, prometheus)
