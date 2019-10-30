const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.button = this.getComponent(cc.Button)
        this.button.node.on('click', this.switchLamp, this);
    }

    start() {

    }

    switchLamp() {
        console.log(this.button);
        var node = this.button.node;
        var type = node.children[0].getComponent('lights').type
        console.log(type)
        node.children.forEach(element => {
            if (element.getComponent('lights').type == 0) {
                element.getComponent('lights').type = 1
                element.color = new cc.Color(0, 255, 0);
            } else {
                element.getComponent('lights').type = 0
                element.color = new cc.Color(255, 0, 0);
            }
        });
    }
    // update (dt) {}
}
