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
var http_1 = require('@angular/http');
var RestConfig = (function () {
    function RestConfig() {
    }
    RestConfig.prototype.getUrl = function () {
        return 'http://127.0.0.1:8080/blog/rest';
    };
    RestConfig.prototype.getHeaders = function () {
        var username = 'hans';
        var password = 'knaut';
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + btoa(username + ":" + password));
        headers.append("Content-Type", "application/*+json");
        return headers;
    };
    RestConfig = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], RestConfig);
    return RestConfig;
}());
exports.RestConfig = RestConfig;
