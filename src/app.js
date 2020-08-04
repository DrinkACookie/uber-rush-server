"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var cors = require("cors");
var graphql_yoga_1 = require("graphql-yoga");
var helmet = require("helmet");
var logger = require("morgan");
var schema_1 = require("./schema");
var decodeJWT_1 = require("./utils/decodeJWT");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.middlewares = function () {
            _this.app.express.use(cors());
            _this.app.express.use(logger("dev"));
            _this.app.express.use(helmet());
            try {
                _this.app.express.use(_this.jwt);
            }
            catch (error) {
                console.log("error in jwt middleware: ", error);
            }
        };
        this.jwt = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.get("X-JWT");
                        if (!token) return [3 /*break*/, 2];
                        return [4 /*yield*/, decodeJWT_1["default"](token)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            req.user = user;
                        }
                        else {
                            req.user = undefined;
                        }
                        _a.label = 2;
                    case 2:
                        next();
                        return [2 /*return*/];
                }
            });
        }); };
        this.pubSub = new graphql_yoga_1.PubSub();
        this.pubSub.ee.setMaxListeners(99);
        this.app = new graphql_yoga_1.GraphQLServer({
            schema: schema_1["default"],
            context: function (req) {
                var _a = req.connection, _b = (_a === void 0 ? {} : _a).context, context = _b === void 0 ? null : _b;
                // = null or  = {} 을 사용하면 제대로 의미전달이 안될 수 있다고 함.
                // context에 defualt로 null 을 지정하고,  connection에는 default로 비어있는 값을 지정함
                // connection이 존재하지 않으면 { }을 default 로 가지고, context가 존재하지 않으면 null을 default로 가진다
                return {
                    req: req.request,
                    pubSub: _this.pubSub,
                    context: context
                };
            }
        });
        this.middlewares();
    }
    return App;
}());
exports["default"] = new App().app;
