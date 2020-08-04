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
var Chat_1 = require("./Chat");
var Ride = /** @class */ (function (_super) {
    __extends(Ride, _super);
    function Ride() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Ride.prototype, "id");
    __decorate([
        typeorm_1.Column({
            type: "text",
            "enum": ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"],
            "default": "REQUESTING"
        })
    ], Ride.prototype, "status");
    __decorate([
        typeorm_1.Column({ type: "text" })
    ], Ride.prototype, "pickUpAddress");
    __decorate([
        typeorm_1.Column({ type: "double precision", "default": 0 })
    ], Ride.prototype, "pickUpLat");
    __decorate([
        typeorm_1.Column({ type: "double precision", "default": 0 })
    ], Ride.prototype, "pickUpLng");
    __decorate([
        typeorm_1.Column({ type: "text" })
    ], Ride.prototype, "dropOffAddress");
    __decorate([
        typeorm_1.Column({ type: "double precision", "default": 0 })
    ], Ride.prototype, "dropOffLat");
    __decorate([
        typeorm_1.Column({ type: "double precision", "default": 0 })
    ], Ride.prototype, "dropOffLng");
    __decorate([
        typeorm_1.Column({ type: "double precision", "default": 0 })
    ], Ride.prototype, "price");
    __decorate([
        typeorm_1.Column({ type: "text" })
    ], Ride.prototype, "distance");
    __decorate([
        typeorm_1.Column({ type: "text" })
    ], Ride.prototype, "duration");
    __decorate([
        typeorm_1.Column({ type: "text" })
    ], Ride.prototype, "passengerId");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1["default"]; }, function (user) { return user.ridesAsPassenger; }),
        typeorm_1.JoinColumn()
    ], Ride.prototype, "passenger");
    __decorate([
        typeorm_1.RelationId(function (ride) { return ride.driver; })
    ], Ride.prototype, "driverId");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1["default"]; }, function (user) { return user.ridesAsDriver; }, { nullable: true }),
        typeorm_1.JoinColumn()
    ], Ride.prototype, "driver");
    __decorate([
        typeorm_1.RelationId(function (ride) { return ride.chat; })
    ], Ride.prototype, "chatId");
    __decorate([
        typeorm_1.OneToOne(function (type) { return Chat_1["default"]; }, function (chat) { return chat.ride; }, { nullable: true }),
        typeorm_1.JoinColumn()
    ], Ride.prototype, "chat");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Ride.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Ride.prototype, "updatedAt");
    Ride = __decorate([
        typeorm_1.Entity()
    ], Ride);
    return Ride;
}(typeorm_1.BaseEntity));
exports["default"] = Ride;
