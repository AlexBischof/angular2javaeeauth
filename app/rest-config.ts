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
