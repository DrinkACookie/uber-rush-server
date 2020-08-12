"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Place = /** @class */ (function (_super) {
    __extends(Place, _super);
    function Place() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Place.prototype, "id");
    __decorate([
        typeorm_1.Column({ type: "text" })
    ], Place.prototype, "name");
    __decorate([
        typeorm_1.Column({ type: "double precision", "default": 0 })
    ], Place.prototype, "lat");
    __decorate([
        typeorm_1.Column({ type: "double precision", "default": 0 })
    ], Place.prototype, "lng");
    __decorate([
        typeorm_1.Column({ type: "text" })
    ], Place.prototype, "address");
    __decorate([
        typeorm_1.Column({ type: "boolean", "default": false })
    ], Place.prototype, "isFav");
    __decorate([
        typeorm_1.RelationId(function (place) { return place.user; })
    ], Place.prototype, "userId");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1["default"]; }, function (user) { return user.places; })
    ], Place.prototype, "user");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Place.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Place.prototype, "updatedAt");
    Place = __decorate([
        typeorm_1.Entity()
    ], Place);
    return Place;
}(typeorm_1.BaseEntity));
exports["default"] = Place;
