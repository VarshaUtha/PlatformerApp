import {Scene} from 'phaser';

export class MainMenu extends Scene{
    constructor(){
        super({key:'MainMenu'});
    }

    preload(){
        
    }

    create(){
        this.add.image();
        this.logo = this.add.image().setDepth(100);
        this.add.text()
    }

}