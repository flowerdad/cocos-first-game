"use strict";
cc._RF.push(module, 'd1345OATPVByq7jEni+lxQC', 'car');
// script/car.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 上一帧 为了计算角度
        _this.target = new cc.Vec2(0, 0);
        // 动画节点
        _this.selfNode = null;
        // 当前节点
        _this.spriteNode = null;
        // 当前节点type
        _this.spriteType = 0;
        // 其他碰撞节点暂存
        _this.othersPrite = null;
        // main
        _this.main = null;
        _this.count = 0;
        return _this;
    }
    NewClass.prototype.random = function (lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    };
    NewClass.prototype.onLoad = function () {
        this.spriteNode = this.getComponent(cc.Sprite);
        this.selfNode = this.getComponent(cc.Animation);
        this.main = cc.find("Canvas").getComponent("main");
        var random = this.random(0, 3);
        // console.log(random);
        if (random == 2) {
            random = 0;
        }
        // this.selfNode.play('car' + random)
        this.selfNode.play('car0');
        this.selfNode.on('finished', this.removeNode, this);
    };
    NewClass.prototype.start = function () {
        this.target.x = this.node.x;
        this.target.y = this.node.y;
    };
    NewClass.prototype.update = function (dt) {
        if (this.target.x != this.node.x) {
            //汽车转弯逻辑
            var dx = this.target.x - this.node.x;
            var dy = this.target.y - this.node.y;
            var dir = cc.v2(dx, dy);
            var angle = dir.signAngle(cc.v2(1, 0));
            var degree = angle / Math.PI * 180;
            this.node.angle = -degree - 180;
            this.target.x = this.node.x;
            this.target.y = this.node.y;
            // 动画状态
            var manager = cc.director.getCollisionManager();
            manager.enabled = true;
            manager.enabledDebugDraw = true;
            // 实时判断碰撞体是否生效
            // if(this.othersPrite!=null){
            //     if (this.othersPrite.getComponent('lights') == null) {
            //         // 当碰撞为车,判断前车状态,若前车停止则激活当前车行驶
            //         var ani=this.othersPrite.getComponent(cc.Animation)
            //         ani.on('resume', this.toresume, this);
            //     } else {
            //         // 当碰撞为灯
            //         var type = this.othersPrite.getComponent('lights').type
            //         if (type == 0) {
            //             this.selfNode.pause();
            //         } else {
            //             this.selfNode.resume();
            //         }
            //     }
            //     this.othersPrite=null;
            // }
            if (this.othersPrite != null) {
                var ani = this.othersPrite.getComponent(cc.Animation);
                ani.on('resume', this.toresume, this);
            }
        }
    };
    // 判断前车状态,若前车顺利通过红绿灯且自己不碰撞红灯,当前车继续前行
    NewClass.prototype.toresume = function () {
        // this.scheduleOnce(function(){
        //     this.selfNode.resume();
        // },1)
        this.selfNode.resume();
        this.othersPrite = null;
    };
    // 动画完事,销毁对象
    NewClass.prototype.removeNode = function () {
        this.node.destroy();
    };
    NewClass.prototype.onCollisionEnter = function (other, self) {
        this.count++;
        console.log('**************************************' + this.count);
        if (other.getComponent('lights') == null) {
            // 当碰撞到车,停止
            this.selfNode.pause();
            // 将碰撞到的对象记录给othersPrite
            this.othersPrite = other;
        }
        else {
            // 当碰撞到灯,判断是红绿灯
            var type = other.node.getComponent('lights').type;
            console.log(type);
            if (type == 0) {
                this.selfNode.pause();
            }
            else {
                this.selfNode.resume();
            }
        }
    };
    __decorate([
        property
    ], NewClass.prototype, "target", void 0);
    __decorate([
        property
    ], NewClass.prototype, "selfNode", void 0);
    __decorate([
        property
    ], NewClass.prototype, "spriteNode", void 0);
    __decorate([
        property
    ], NewClass.prototype, "spriteType", void 0);
    __decorate([
        property
    ], NewClass.prototype, "othersPrite", void 0);
    __decorate([
        property
    ], NewClass.prototype, "main", void 0);
    __decorate([
        property
    ], NewClass.prototype, "count", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();