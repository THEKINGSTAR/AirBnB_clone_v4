# ```3. API status (mandatory)```

>- ### ```Before requesting the HBNB API, it’s better to know the status of this one.```

>- Update the API entry point ```(api/v1/app.py)``` by replacing the current CORS ```CORS(app, origins="0.0.0.0")``` by``` CORS(app, resources={r"/api/v1/*": {"origins": "*"}})```.

>- Change the route ```1-hbnb``` to ```2-hbnb``` in the file ```2-hbnb.py``` (based on 1-hbnb.py)
>- Create a new template ```2-hbnb.html``` (based on ```1-hbnb.html```) and update it:

>- ### Import the JavaScript ```static/scripts/2-hbnb.js``` in the ```<head>``` tag ```(instead of 1-hbnb.js)```

>- Add a new div element in the header tag:
>- Attribute ID should be api_status
>- Align to the right
>- Circle of 40px diameter
>- Center vertically
>- At 30px of the right border
>- Background color``` #cccccc```
>- Also add a class available for this new element in ```web_dynamic/static/styles/3-header.css:```
>- Background color ```#ff545f```
>- Write a JavaScript script ```(static/scripts/2-hbnb.js):```
>- Based on ```1-hbnb.js```
>- Request ```http://0.0.0.0:5001/api/v1/status/:```
>- If in the status is``` “OK”```, add the class available to the ```div#api_status```
>- Otherwise, remove the class available to the``` div#api_status```

>- ### To start the API in the port 5001:
>- ```guillaume@ubuntu:~/AirBnB_v4$``` ```HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=db HBNB_API_PORT=5001 python3 -m api.v1.app```
