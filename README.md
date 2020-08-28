
# Bundle Form and Validation Project for TAPPX

The project has been done under Laravel(PHP), Mysql, React & Nginx as the proxy / server. All the project and services are under Dockers, using docker-compose.

The packages used from react are "react-hook-form" for easier form controlling. [https://react-hook-form.com/](https://react-hook-form.com/)
Also, the axios package for easier promises has been used. [https://www.npmjs.com/package/axios](https://www.npmjs.com/package/axios)

Materialize CSS framework has been used for some items. https://materializecss.com/

Thanks a lot for your time, and for the opportunity! Do not hesitate to contact me if you have any question. Have a great day!

Pol Estecha, polestecha14@gmail.com

## Installation

For this project you will need: Docker, Docker-Compose, and GIT.

Also, make sure that you have the ports 3306, 80 & 8000 free, or the dockers will not be able to bind to them, and won't get up.

To install, first download the repository with git clone.

Give it permissions (Laravel need them to work correctly, because logging etc...):

```bash
sudo chmod -R 777 TAPPX_InterviewTest/
```

Then, get inside of the folder, and execute:

```bash
cd TAPPX_InterviewTest/
sudo docker-compose up -d
```
Then wait until they are up. When they are up, get into the Laravel docker using:

```bash
sudo docker exec -it tappxinterviewtest_server_1 sh
```
(WARNING! The name may vary between O.S. Check the docker name using 'sudo docker ps -a'. If it's not the same, it will be very very similar. Also note we use SH and not BASH, this is because alpine versions do not use bash).

Then, from inside the docker, go to /var/www and apply the migrations.
```bash
cd /var/www
php artisan migrate
```

It could also be done from outside the Docker, on the server folder, yet you will need to have PHP installed in your machine. From inside the Docker, it is not needed, as the container already has it.

When it finishes, the project is ready to go.

## Usage

Once the installation steps have been completed, open the browser and go to the URL:

```bash
localhost/
```
Here you will find the main page of the project. Browser usage is as described on the Interview Test. Type in a a valid name and bundle name, and then Send. 

You can then see the bundles table in the second page, clicking on "Table" on the top menu.

## License
[MIT](https://choosealicense.com/licenses/mit/)
