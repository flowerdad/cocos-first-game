(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/switchLamp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bd1b3mizqxAho4mcgxChw8n', 'switchLamp', __filename);
// script/switchLamp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.button = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.onLoad = function () {
        this.button = this.getComponent(cc.Button);
        this.button.node.on('click', this.switchLamp, this);
    };
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.switchLamp = function () {
        var node = this.button.node;
        node.children.forEach(function (element) {
            if (element.getComponent('lights').type == 0) {
                element.getComponent('lights').type = 1;
                element.color = new cc.Color(0, 255, 0);
            }
            else {
                element.getComponent('lights').type = 0;
                element.color = new cc.Color(255, 0, 0);
            }
        });
    };
    __decorate([
        property
    ], NewClass.prototype, "button", void 0);
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
        //# sourceMappingURL=switchLamp.js.map
        