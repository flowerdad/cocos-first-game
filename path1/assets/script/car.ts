const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // 上一帧 为了计算角度
    @property
    target = new cc.Vec2(0, 0);

    // 动画节点
    @property
    selfNode = null

    // 当前节点
    @property
    spriteNode = null

    // 当前节点type
    @property
    spriteType = 0

    // 其他碰撞节点暂存
    @property
    othersPrite = null

    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }

    onLoad() {
        this.spriteNode = this.getComponent(cc.Sprite)
        this.selfNode = this.getComponent(cc.Animation)
        var random = this.random(0, 3);
        console.log(random);
        // if (random == 2) { random = 1 }
        this.selfNode.play('car' + random)
        this.selfNode.on('finished', this.removeNode, this);
    }

    start() {
        this.target.x = this.node.x;
        this.target.y = this.node.y;
    }

    update(dt) {
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
                if (this.othersPrite.getComponent('lights').type == 1) {
                    this.selfNode.resume();
                }
            }

        }
    }

    removeNode() {
        console.log('动画完事')
        this.spriteNode.destroy();
    }

    onCollisionEnter(other, self) {

        // console.log('我被撞到了')
        // this.selfNode.stop();
        // console.log(other)
        // console.log(self)
        // console.log(other.getComponent('lights'))


        if (other.getComponent('lights') == null) {
            console.log('我是车')
        } else {
            console.log('我是灯')
            this.othersPrite = other;
            var type = other.getComponent('lights').type
            if (type == 0) {
                this.selfNode.pause();
            } else {
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
    }
}
