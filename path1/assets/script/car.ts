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

    // main
    @property
    main = null

    @property
    count = 0

    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }

    onLoad() {
        this.spriteNode = this.getComponent(cc.Sprite)
        this.selfNode = this.getComponent(cc.Animation)
        this.main=cc.find("Canvas").getComponent("main");
        var random = this.random(0, 3);
        // console.log(random);
        if (random == 2) { random = 0 }
        // this.selfNode.play('car' + random)
        this.selfNode.play('car0')
        this.selfNode.on('finished', this.removeNode, this);
    }

    start() {
        this.target.x = this.node.x;
        this.target.y = this.node.y;
    }

    update(dt) {
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

            if(this.othersPrite!=null){
                var ani=this.othersPrite.getComponent(cc.Animation)
                ani.on('resume', this.toresume, this);
            }

            
        }
    }

    // 判断前车状态,若前车顺利通过红绿灯且自己不碰撞红灯,当前车继续前行
    toresume(){
        // this.scheduleOnce(function(){
        //     this.selfNode.resume();
        // },1)
        this.selfNode.resume();
        this.othersPrite=null;
    }

    // 动画完事,销毁对象
    removeNode() {
        this.node.destroy();
    }

    onCollisionEnter(other, self) {
        this.count++;
        console.log('**************************************'+this.count)
        if (other.getComponent('lights') == null) {
            // 当碰撞到车,停止
            this.selfNode.pause();
            // 将碰撞到的对象记录给othersPrite
            this.othersPrite = other;
        } else {
            // 当碰撞到灯,判断是红绿灯
            var type = other.node.getComponent('lights').type
            console.log(type);
            if (type == 0) {
                this.selfNode.pause();
            } else {
                this.selfNode.resume();
            }
        }
        
    }
}
