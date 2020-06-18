///<reference path="../index.d.ts" />

class button {
    dom:Element
    constructor(Fn) {
      this.dom =  this.createEl()
      this.clickFn(Fn)
    }

    createEl() : Element{
       return fx.createEl('button',
        {className:'classButton',innerHTML:"按钮"},
        {'data-id':"132"}
        )
    }

    clickFn(Fn){
      fx.addEvent(this.dom,"click",Fn)
    }

}

export default button