# How To Connect AngularJS 2 with JavaEE/JaxRS (Wildfly) with CORS and JAAS

Recently we took a look at AngularJS 2 trying to connect a simple web application with an existing JAXRS endpoint. There
are several sources out there which already covering that topic (e.g.Adam Bien link). The difference here was that our
JAXRS endpoint ran on different domain and was secured via basic authentication so that we had some difficulties to get
it running. This article describes the steps to make on a simple blog example.


## The Blog Resource
```java
@Path("/")
@ApplicationPath("/rest")
public class BlogResource extends Application
{
	@GET
	public JsonArray blog()
	{
		return
				createArrayBuilder()
						.add(createObjectBuilder().add("name", "blog").build())
						.add(createObjectBuilder().add("name", "blog2").build())
						.build();
	}
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app id="WebApp_ID" version="3.0"
         xmlns="http://java.sun.com/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">
    <security-constraint>
        <display-name>All</display-name>
        <web-resource-collection>
            <web-resource-name>All resources</web-resource-name>
            <url-pattern>/*</url-pattern>
        </web-resource-collection>
        <auth-constraint>
            <role-name>users</role-name>
        </auth-constraint>
    </security-constraint>
    <login-config>
        <auth-method>BASIC</auth-method>
    </login-config>
    <security-role>
        <role-name>users</role-name>
    </security-role>
</web-app>
```

```shell
> curl http://localhost:8080/blog/rest -u 'hans:knaut'
[{"name":"blog"},{"name":"blog2"}]
```

## The AngularJS App

This app is a clone from angular-quickstart which i extended with the following two typescript files.

```typescript
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers } from '@angular/http';
import { RestConfig } from './rest-config';
import { Blog } from './blog';

@Component({
    selector: 'my-app',
    template: '<h1>Hello {{name}}</h1><div *ngFor="let blog of blogs">{{blog.name}}</div>',
    providers: [ RestConfig  ]
})
export class AppComponent implements OnInit {
    name = 'Juhu'
    blogs: Blog[] = [];

    constructor(private http: Http, private restConfig: RestConfig) { }

    ngOnInit() {
      this.http.get(this.restConfig.getUrl(), { headers: this.restConfig.getHeaders() })
                  .toPromise()
                  .then(r => r.json())
                  .then(r => this.blogs = r);
    }
}
```

```typescript
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class RestConfig {
    getUrl() {
        return 'http://127.0.0.1:8080/blog/rest';
    }

    getHeaders() {
        let username: string = 'hans';
        let password: string = 'knaut';
        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(username + ":" + password));
        headers.append("Content-Type", "application/*+json");
        return headers;
    }
}
```

## The Problem/Solutiion

 The problem is that <screenshot>

```java
@Provider
public class CORSFilter implements ContainerResponseFilter
{
	public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)
			throws IOException
	{
		responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
		responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		responseContext.getHeaders().add("Access-Control-Max-Age", "-1");
		responseContext.getHeaders().add("Access-Control-Allow-Headers", "accept, authorization, content-type");
	}
}
```

```xml
...snip...
<web-resource-collection>
    <web-resource-name>All resources</web-resource-name>
    <url-pattern>/*</url-pattern>
</web-resource-collection>
...snip...
```

