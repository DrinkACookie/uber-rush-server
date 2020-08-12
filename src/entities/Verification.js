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
var Verification = /** @class */ (function (_super) {
    __extends(Verification, _super);
    function Verification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Verification.prototype.createKey = function () {
        if (this.target === "PHONE") {
            this.key = Math.floor((Math.random() * 100000)).toString();
        }
        else if (this.target === "EMAIL") {
            this.key = Math.random().toString(36).substr(2);
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Verification.prototype, "id");
    __decorate([
        typeorm_1.Column({ type: "text", "enum": ["PHONE", "EMAIL"] })
    ], Verification.prototype, "target");
    __decorate([
        typeorm_1.Column({ type: "text" })
    ], Verification.prototype, "payload");
    __decorate([
        typeorm_1.Column({ type: "text" })
    ], Verification.prototype, "key");
    __decorate([
        typeorm_1.Column({ type: "boolean", "default": false })
    ], Verification.prototype, "verified");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Verification.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Verification.prototype, "updatedAt");
    __decorate([
        typeorm_1.BeforeInsert()
    ], Verification.prototype, "createKey");
    Verification = __decorate([
        typeorm_1.Entity()
    ], Verification);
    return Verification;
}(typeorm_1.BaseEntity));
exports["default"] = Verification;
