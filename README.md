# ClaimApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

#MySQL docker

1. pull
docker pull mysql
2. run
docker run --name=claimsql -e MYSQL_ROOT_PASSWORD=aaaa1111 -d mysql
3. check the status of the container
docker ps
4. To checkout the logs of the running container use the following command
docker logs claimsql
5. Find the IP of the container using following. Check out the “IPAddress” from the output, this will tell you the ip address.
docker inspect claimsql
6. create user
docker exec -it claimdb bash 
mysql -uroot -p

# Accessing MySQL through a Web Interface
1. pull image
docker pull phpmyadmin/phpmyadmin
2. run
docker run --name myadmin -d --link mysql1:db -p 8080:80 phpmyadmin/phpmyadmin