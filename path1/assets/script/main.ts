const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    car: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        setInterval(() => {
            this.initCar();
        }, 1500);
    }

    initCar() {
        var newStar = cc.instantiate(this.car);
        this.node.addChild(newStar);
    }
}
