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
require('dotenv').config();
const http = require('http');
const app = require('./Main');
const server = http.createServer(app);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        server.listen(process.env.PORT, () => console.log('😎Hidden cms v1.0 running at port:', process.env.PORT));
    });
}
startServer()
    .then(() => console.log('started'))
    .catch(e => console.log(e));
