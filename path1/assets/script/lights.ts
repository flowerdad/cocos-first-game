const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    positionType = 3;

    @property
    type = 0;

    @property
    spriteType = 1

    // 其他碰撞节点暂存
    @property
    othersPrite = null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    update (dt) {
        if(this.othersPrite!=null){
            if(this.type==1){
                var ani=this.othersPrite.getComponent(cc.Animation)
                ani.resume()
            }
        }
    }

    onCollisionEnter(other, self) {
        this.othersPrite=other
    }
}
