# URL Tracker v 0.3.0

[![Build Status](https://travis-ci.com/ahussam/url-tracker.svg?branch=master)](https://travis-ci.com/ahussam/url-tracker)
[![License](https://badgen.net/badge/license/MIT/green)](https://badgen.net/badge/license/MIT/green)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/ahussam/url-tracker/)
[![GitHub issues](https://img.shields.io/github/issues/ahussam/url-tracker.svg)](https://github.com/ahussam/url-tracker/issues/)


Change monitoring app that checks the content of web pages in different periods (hourly, daily, weekly, monthly) and detects if they were modified since the last check. It can be used to monitor S3, Azure, JS files, ...etc.   

### Motivation :battery:

* Blog Post: https://ahussam.me/careem-aws-s3-bucket-takeover/


## How to use :arrow_forward:

* If you want to track changes on a web page click add new link button on the right side (You must be logged in): 
  * Fill **description** textbox with any text that describes the target `e.g: Uber internal system login page`.  
  * Write the target link in **Link of page** textbox `e.g: http://s3.amazonaws.com/careemcrm/`. 
  * Write keywords that will be tracked on the page if they appear you will get noticed `e.g: 404, new feature, not found`
  **Note:** They **MUST NOT** be there in the first request. 
  * If you want to track an authenticated page add your cookies in the **cookie** text box.
  * Select the peroid that you want to check the page at.
  * In **tolerance** set the accepted differences between the previous fetch and the next one by characters `e.g: 100`. **Note:** if you
want to ingore minors changes like CSRF tokens, cache tokens, cookie tracking set this parameter. In case you leave it blank the server will ship 2 requests and comapres the differences between them and sets the differences (acceptedChange) in DB. 
  * Then click add link button. You should see the new target in the URLs list. 
  
  
* If you want to get notifications via email: 
   * Create a gmail account. 
   * Go to `User Control > Settings ` then set the gmail account that will send the notificaiton (**DON'T USE YOUR PRIVATE EMAIL**).
   * Write your private email in the **receiver** textbox. 
   * Click save changes button. 
  
## Features :ballot_box_with_check:	

  - Login system. 
  - 4 periods checks. 
  - Email reporting.
  - Search in items. 
  - Dynamic pages fetching. 
  - Authenticated fetching.  
  - Diff checker 
  - Bot reporting (Telegram, Slack, ...etc) **SOON!**
  - Suggest a feature! 

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
![OD](/img/od.png)

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

**Note:** make sure to install mongodb on your OS. 

```
root@ubuntu:~# git clone https://github.com/ahussam/url-tracker.git
root@ubuntu:~# cd url-tracker
root@ubuntu:~/url-tracker# npm install 
root@ubuntu:~/url-tracker# nodejs app.js 
```

Then go to [http://127.0.0.1:1337](http://127.0.0.1:1337) 

For deployment on a live server install MongoDB then replace the lines 50 & 51 in `config/env/production.js` with: 

```
      adapter: 'sails-mongo',
      url: 'mongodb://localhost/urlTracker', 
```

For more information check this out: https://sailsjs.com/documentation/concepts/deployment/hosting 


#### Docker Option :whale2:

```
root@ubuntu:~# git clone https://github.com/ahussam/url-tracker.git
root@ubuntu:~# cd url-tracker
root@ubuntu:~/url-tracker# docker-compose build
root@ubuntu:~/url-tracker# docker-compose up
```

Then go to [http://127.0.0.1:8080](http://127.0.0.1:8080) 

------

#### Default Credential :key:	

**PLEASE MODIFIY THEM AFTER SIGN IN FOR THE FIRST TIME.** 

 Email | Password 
------ | -------
admin@example.com| 123456
------


### Screenshots :camera:	
![ss](/img/ss0.png)

![ss](/img/ss1.png)

![ss](/img/ss2.png)

![ss](/img/ss3.png)

![ss](/img/ss4.png)

------

## License :page_facing_up:	
The MIT License (MIT)

Copyright (c) 2020 Abdullah Hussam 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
