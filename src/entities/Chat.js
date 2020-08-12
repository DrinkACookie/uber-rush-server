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
var Message_1 = require("./Message");
var User_1 = require("./User");
var Ride_1 = require("./Ride");
var Chat = /** @class */ (function (_super) {
    __extends(Chat, _super);
    function Chat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Chat.prototype, "id");
    __decorate([
        typeorm_1.OneToMany(function (type) { return Message_1["default"]; }, function (messages) { return messages.chat; })
    ], Chat.prototype, "messages");
    __decorate([
        typeorm_1.RelationId(function (chat) { return chat.ride; })
    ], Chat.prototype, "rideId");
    __decorate([
        typeorm_1.OneToOne(function (type) { return Ride_1["default"]; }, function (ride) { return ride.chat; })
    ], Chat.prototype, "ride");
    __decorate([
        typeorm_1.RelationId(function (chat) { return chat.passenger; })
    ], Chat.prototype, "passengerId");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1["default"]; }, function (user) { return user.chatsAsPassenger; })
    ], Chat.prototype, "passenger");
    __decorate([
        typeorm_1.RelationId(function (chat) { return chat.driver; })
    ], Chat.prototype, "driverId");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1["default"]; }, function (user) { return user.chatsAsDriver; })
    ], Chat.prototype, "driver");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Chat.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Chat.prototype, "updatedAt");
    Chat = __decorate([
        typeorm_1.Entity()
    ], Chat);
    return Chat;
}(typeorm_1.BaseEntity));
exports["default"] = Chat;
