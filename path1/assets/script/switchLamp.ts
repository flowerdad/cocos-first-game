const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    button = null;
    onLoad() {
        this.button = this.getComponent(cc.Button)
        this.button.node.on('click', this.switchLamp, this);
    }

    start() {

    }

    switchLamp() {
        var node = this.button.node;
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
