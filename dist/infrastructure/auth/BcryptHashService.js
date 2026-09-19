"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptHashService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class BcryptHashService {
    rounds = 10;
    async hash(password) {
        return await bcryptjs_1.default.hash(password, this.rounds);
    }
    async comparar(password, hash) {
        return await bcryptjs_1.default.compare(password, hash);
    }
}
exports.BcryptHashService = BcryptHashService;
