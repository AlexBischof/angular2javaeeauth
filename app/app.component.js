"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/toPromise');
var http_1 = require('@angular/http');
var rest_config_1 = require('./rest-config');
var AppComponent = (function () {
    function AppComponent(http, restConfig) {
        this.http = http;
        this.restConfig = restConfig;
        this.name = 'Juhu';
        this.blogs = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get(this.restConfig.getUrl(), { headers: this.restConfig.getHeaders() })
            .toPromise()
            .then(function (r) { return r.json(); })
            .then(function (r) { return _this.blogs = r; });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: '<h1>Hello {{name}}</h1><div *ngFor="let blog of blogs">{{blog.name}}</div>',
            providers: [rest_config_1.RestConfig]
        }), 
        __metadata('design:paramtypes', [http_1.Http, rest_config_1.RestConfig])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
