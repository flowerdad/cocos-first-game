(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/lights.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fcd81MO95pLcLuRM1nleer4', 'lights', __filename);
// script/lights.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.positionType = 3;
        _this.type = 0;
        _this.spriteType = 1;
        // 其他碰撞节点暂存
        _this.othersPrite = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.update = function (dt) {
        if (this.othersPrite != null) {
            var ani = this.othersPrite.getComponent(cc.Animation);
            if (this.type == 1) {
                ani.resume();
                this.othersPrite = null;
            }
        }
    };
    NewClass.prototype.onCollisionEnter = function (other, self) {
        this.othersPrite = other;
    };
    __decorate([
        property
    ], NewClass.prototype, "positionType", void 0);
    __decorate([
        property
    ], NewClass.prototype, "type", void 0);
    __decorate([
        property
    ], NewClass.prototype, "spriteType", void 0);
    __decorate([
        property
    ], NewClass.prototype, "othersPrite", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=lights.js.map
        