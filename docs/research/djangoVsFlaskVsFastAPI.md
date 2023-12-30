### Django vs Flask

## What is Django ?

Django is a python-based open-source framework to design web applications. It is a high-level web framework that is built to make the web development process faster and more efficient. Developers choose Django for it enables them to use it for the standard functionalities with a limited interference of systems, protocols, and management. Django's framework encourages rapid development and clean, pragmatic design. The agile development process of the framework aims solely on providing quality with rapidness and efficiency. Django deals with some of the basic development functions quickly like site maps, content organization, client information, and, so many more. It just focuses on finishing the application as quickly as possible. 

## Key Features : Django

1. **Fast:** it is insanely Fast. Without any thought, the Django working process from concept to completion is extremely fast.

2. **Versatile:** Django is a versatile framework that enables developers to work on different platforms varying from content management systems like WordPress, etc, to social network sites like LinkedIn, Youtube, etc, to news sites like The New York Times, CNN, etc.

3. **Adaptable:** Django is adaptable to different formats like JSON, HTML, XML, and many more.

4. **Scalable:** It is a framework that ensures scalability ( a system that allows making changes in different layers and updations without much cost and effort i.e., every layer is independent) and maintenance (the design and code are not susceptible to duplications and, hence, the code can be reused and maintained properly)

5. **Secure:** Django guarantees security with powerful authentication systems and protocols to avoid clickjacking, unauthorized access, cyberattacks, etc.

6. **Portable:** Django is a python-based framework and, therefore, portable. 

## What is Flask ?

Flask is also a Python-based microframework that is used for web application development. Flask is categorized as a micro framework because it does not depend on external libraries to perform the tasks of a framework. It has its tools, technologies, and libraries to support the functionalities of web application development. it is more independent and flexible.

## Key Features : Flask

1. **Lightweight:** It is a lightweight framework as it is independent of external libraries. It gives a quick start to the web development process of complex applications. 

2. **Independent:** Flask gives independent or full control to the developer for creating applications. You can experiment with the architecture or the libraries of the framework.

3. **Integrated** Unit Testing: Flask’s integrated unit testing system enables faster debugging, robust development, and freedom to experiment.

4. **Secure Cookies:** Secure cookie is an attribute of an HTTP request that enables the security of channels and ensures no unauthorized person has access to the text. Flask supports the feature of secure cookies.

5. **Compatible:** Flask is compatible with the latest technologies like Machine Learning, Cloud, etc.

6. **Flexible and Scalable:** Support WSGI templates that allow flexibility and scalability for web applications.

7. It comes with a built-in server and debugger.

8. Simple and adaptable configurations

## What is FastAPI ?

FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.

## Key Features : FastAPI

1. **Fast:** Very high performance, on par with NodeJS and Go (thanks to Starlette and Pydantic). One of the fastest Python frameworks available.

2. **Fast to code:** Increase the speed to develop features by about 200% to 300%. 

3. **Fewer bugs:** Reduce about 40% of human (developer) induced errors. 

4. **Intuitive:** Great editor support. Completion everywhere. Less time debugging.

5. **Easy:** Designed to be easy to use and learn. Less time reading docs.

6. **Short:** Minimize code duplication. Multiple features from each parameter declaration. Fewer bugs.

7. **Robust:** Get production-ready code. With automatic interactive documentation.

8. **Standards-based:** Based on (and fully compatible with) the open standards for APIs: OpenAPI (previously known as Swagger) and JSON Schema.


| Parameter     | Django        | Flask | FastAPI 
| ------------- | ------------- | ------------- | ------------- |
| Type of Framework | Django is a full-stack web framework that enables ready to use solutions with its batteries-included approach.  | Flask is a lightweight framework that gives abundant features without external libraries and minimalist features.  |FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints. |
| Working of Framework/Data Model  | Django follows an object-oriented approach that enables object-relational mapping (linking databases and tables with classes) | Flask works on a modular approach that enables working through outsourced libraries and extensions.  | FastAPI is mainly only used to write API's, it can be used to develop for the web but its too complex.|
| Project Layout | Django is suitable for multiple page applications.  | Flask is suitable for only single-page applications.  | Even if FASTAPI can be used to develop for the web, it still only has the power to develop single page applications with react. |
| Bootstrapping Tool  | Django-admin is the in-built bootstrapping tool of Django that allows the creation of web applications without any external input.  | Flask does not come with an in-built bootstrapping tool. |  FastAPI does not have an in-built bootstrapping tool. |
| Database Support  | Django supports the most popular relational database management systems like MySQL, Oracle etc.  | Flask does not support the basic database management system and uses SQLAlchemy for database requirements. | with FASTAPI you can use any database supported by SQLAlchemy |
| Flexibility | Django is less flexible because of its in-built features and tools. Developers cannot make changes to the modules.  | Flask is a micro-based framework with extensible libraries making itself a flexible framework for developers. | FASTAPI only provides the option to work backend and has no inbuilt libraries and we have to use outside frameworks|
|  Control | Developers do not have full control over the modules and functions of Django because of built-in libraries.  | Flask allows developers full control over the creation of applications with no dependencies from external libraries. | FASTAPI provides easy control to developers however you have to start everything from scratch.| 
| Debugger  | Django does not support any virtual debugging.  | Flash has an in-built debugger that offers virtual debugging | Fastapi does have an inbuilt debugger called uvicorn. | 
| Structure  | Django framework structure is more conventional. | Flask web framework structure is random. | it has a free strucutre meaning developers decide on what they want it to look like | 
| HTML  | Django supports dynamic HTML pages  | Flask framework does not support dynamic HTML pages  |  It can be used for building web applications that serve HTML using Jinja, but that's not what it is really optimized for |

## Which is better ? 

There are tradeoffs to all so its upto the client and developers as to  what to use. Django provides ease and is more suitable for building a multi page website , you have a lot of inbuilt features however you are only allowed to use inbuilt features no outside api's/libraries. However, it provides better security. In Flask , you have to start from scratch but you can use outside libaries, however it has less security, it is  not as suitable for building multi page sites. Moreover, Django supports HTML and Mysql but flask does not. So as long as the client is okay with using in built in django features and developers agree to spend more time learning since its more tougher than Flask, Django is overall a better option with its advantages outweighing those of Flask. FASTAPI on the other hand is just designed to develop API's and does not have enough tools to develop  a full on multipage web application.
