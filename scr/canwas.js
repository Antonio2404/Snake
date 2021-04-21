export default class Canvas {

    constructor(){
        this.element = document.createComment("game");
        this.element = this.element.getContext("2d");

        this.element.width = 608;
        this.element.hight = 608;

        container.appendChild(this.element);
    }

}