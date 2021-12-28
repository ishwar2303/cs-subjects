'use strict';
export class Calculator {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    add() {
        return this.a + this.b;
    }

    sub() {
        return this.a - this.b;
    }

    mul() {
        return this.a*this.b;
    }

    div() {

        try {
            if(this.b == 0)
                throw('Denominator cannot be zero');
            return this.a/this.b;
        }catch(err) {
            console.error(err)
        }

    }
}

export class IncrementalAddition {

    result = 0;
    btn;
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.result = this.a + this.b;
        let btn = this.createDom();
        btn.innerText = this.result;
    }

    createDom() {
        let btn = document.createElement('button');
        document.body.appendChild(btn);
        this.btn = btn;
        return btn;
    }

    add(num) {
        this.btn.innerText = this.result += num;
        return this.result;
    }
}
