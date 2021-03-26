"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
// setup express
var PORT = process.env.PORT;
var app = express_1.default();
app.enable("trust proxy");
dotenv_1.default.config({ path: '../env' });
// middleware 
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
// error handler
app.use(function (error, req, res, next) {
    res.status(500);
    if (process.env.NODE_ENV === 'production') {
        return res.json({
            error: 'Internal Error Occured🥞'
        });
    }
    return res.json({
        error: error.stack
    });
});
// routes
app.get('/', function (req, res) {
    console.log(req.cookies);
});
// app listener
app.listen(PORT || 3000, function () {
    console.log('app Running!');
});
