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
        console.log(random);
        // if (random == 2) { random = 1 }
        this.selfNode.play('car' + random);
        this.selfNode.on('finished', this.removeNode, this);
    };
    NewClass.prototype.start = function () {
        this.target.x = this.node.x;
        this.target.y = this.node.y;
    };
    NewClass.prototype.update = function (dt) {
        //计算出当前位置相对于X的偏移
        if (this.target.x != this.node.x) {
            var dx = this.target.x - this.node.x;
            var dy = this.target.y - this.node.y;
            var dir = cc.v2(dx, dy);
            var angle = dir.signAngle(cc.v2(1, 0));
            var degree = angle / Math.PI * 180;
            this.node.angle = -degree - 180;
            this.target.x = this.node.x;
            this.target.y = this.node.y;
            var manager = cc.director.getCollisionManager();
            manager.enabled = true;
            // manager.enabledDebugDraw = true;
            if (this.othersPrite != null) {
                var ani = this.othersPrite.getComponent(cc.Animation);
                // console.log(ani.getAnimationState())
            }
        }
    };
    NewClass.prototype.removeNode = function () {
        console.log('动画完事');
        this.node.destroy();
    };
    NewClass.prototype.onCollisionEnter = function (other, self) {
        // console.log('我被撞到了')
        // this.selfNode.stop();
        // console.log(other)
        // console.log(self)
        // console.log(other.getComponent('lights'))
        if (other.getComponent('lights') == null) {
            this.selfNode.pause();
            console.log(this.selfNode.node.getAnimationState());
            this.othersPrite = other;
        }
        else {
            var type = other.node.getComponent('lights').type;
            console.log(type);
            if (type == 0) {
                this.selfNode.pause();
            }
            else {
                this.selfNode.resume();
            }
        }
        // // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        // var world = self.world;
        // console.log(world)
        // // 碰撞组件的 aabb 碰撞框
        // var aabb = world.aabb;
        // console.log(aabb)
        // // 节点碰撞前上一帧 aabb 碰撞框的位置
        // var preAabb = world.preAabb;
        // // 碰撞框的世界矩阵
        // var t = world.transform;
        // // 以下属性为圆形碰撞组件特有属性
        // var r = world.radius;
        // var p = world.position;
        // // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        // var ps = world.points;
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
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();