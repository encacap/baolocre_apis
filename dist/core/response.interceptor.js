"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            const statusCode = context.switchToHttp().getResponse().statusCode;
            const standardizedData = data?.toObject?.() || data;
            if (typeof standardizedData !== 'string') {
                if ('_id' in standardizedData) {
                    standardizedData.id = standardizedData._id;
                    delete standardizedData._id;
                }
                if ('__v' in standardizedData) {
                    delete standardizedData.__v;
                }
            }
            const response = {
                statusCode,
                errors: null,
                message: 'Success',
                data: standardizedData,
            };
            return response;
        }));
    }
};
TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
exports.TransformInterceptor = TransformInterceptor;
//# sourceMappingURL=response.interceptor.js.map