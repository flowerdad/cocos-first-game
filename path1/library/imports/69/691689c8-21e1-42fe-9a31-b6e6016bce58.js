"use strict";
cc._RF.push(module, '69168nIIeFC/poxtuYBa85Y', 'main');
// script/main.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.car = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        var _this = this;
        setInterval(function () {
            _this.initCar();
        }, 2000);
    };
    NewClass.prototype.initCar = function () {
        var newStar = cc.instantiate(this.car);
        this.node.addChild(newStar);
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "car", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();