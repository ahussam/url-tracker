# URL Tracker v 0.1 

Change monitoring app that checks the content of web pages in different periods (hourly, daily, weekly, monthly) and detects if they were modified since the last check. It can be used to monitor S3, Azure, JS files, ...etc.   

### Motivation :battery:

* Blog Post: https://ahussam.me/careem-aws-s3-bucket-takeover/


## How to use :arrow_forward:

* Add static content pages (images, JS script, HTML, ...etc) e.g: https://s3.amazonaws.com/[TARGET]/wellcome.html
* The app will fetch the response hash it and store it in the database.
* In case the response changed (S3 bucket got removed, 404 for Github pages, Azure 404, ...etc) You will see the changed links with a red background. 

## Features :ballot_box_with_check:	

  - Login system. 
  - 4 periods checks. 
  - Email reporting.
  - Search in items. 
  - **Soon** Dynamic pages fetching. 

## Code Organisation :open_file_folder:	

```
+---api // Controllers, models, helpers 
+---assets // UI assets 
+---config // Config files: routes, security, datastores, ...etc
+---crontab // Fetch function file
+---scripts // Cloud SDK
+---tasks // Grunt tasks
+---view 
       \---layout // App layout
        \---pages // HTML in ejs templates 
```

## Technologies :hammer_and_wrench:	
### Backend :gear: : 
| Name | Description | Link 
| ------ | ------ | ------
| Nodejs | Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.| https://nodejs.org/en/
Sails.js | Sails.js makes it easy to build custom, enterprise-grade Node.js apps. | https://sailsjs.com/
MongoDB | MongoDB is a cross-platform document-oriented database program. |https://www.mongodb.com/
EJS| EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. |https://ejs.co/|
...|...|...|

### Frontend :desktop_computer:  
| Name | Description | Link 
| ------ | ------ | ------
| Vue.js| The Progressive JavaScript Framework. | https://vuejs.org
| Bootstrap |  The most popular HTML, CSS, and JS library in the world. | https://getbootstrap.com/
Font Awesome|The world's most popular and easiest to use icon.|https://fontawesome.com/|
...|...|...|

### Object Diagram :card_file_box:	 
![OD](/img/od.jpg)

------


### REST API :link:	

| URL | Description 
| ------ | ------ | 
/api/v1/account/* | Account operations 
/api/v1/settings | Settings operations 
/api/v1/link/* | Target operations 
/api/v1/entrance/login| Login operation

------

### Deployment :rocket:	

```
root@ubuntu:~# git clone https://github.com/ahussam/url-tracker.git
root@ubuntu:~# cd url-tracker
root@ubuntu:/url-tracker# npm install 
root@ubuntu:/url-tracker# sails lift 
```

Then go to [http://127.0.0.1:1337](http://127.0.0.1:1337) 

For deployment on a live server create a mongodb and uncomment the lines in `config/env/production.js`

```
      adapter: 'sails-mysql',
      url: 'mysql://user:password@host:port/database',
```

Insert admin user into mongodb

```
{
    "emailAddress": "admin@example.com",
    "emailStatus": "confirmed",
    "emailChangeCandidate": "",
    "password": "$2a$10$dnfLLl.5HC16klqNPQ/44.I5BgO/p2JasxuuPTQITapp1cklzveLy",
    "fullName": "Ryan Dahl1",
    "lastSeenAt": 1591379464868
}
```

For more information check this out: https://sailsjs.com/documentation/concepts/deployment/hosting 

------

#### Test Credentials :key:	

 Email | Password 
------ | -------
admin@example.com| 123456

------

### Screenshots :camera:	
![ss](/img/ss1.png)

![ss](/img/ss2.png)

![ss](/img/ss3.png)

------

## License :page_facing_up:	
The MIT License (MIT)

Copyright (c) 2020 Abdullah Hussam 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
