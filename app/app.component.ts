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
