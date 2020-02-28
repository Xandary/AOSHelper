
class DiceRoller {
    constructor(side=6) {
        this.side = side;
        this.p = 1;
        this.q = 1;
    }

    roll(dices) {
        this.dices = dices;
        return this;
    }

    success(val) {
        this.p = this.p*(7-val)/6;
        this.q = (1-this.p);
        console.log(this.q, this.p);
        return this;
    }

    fail(val) {
        this.p = this.p*(1-(7-val)/6);
        this.q = (1-this.p);
        return this;
    }
    result() {
        console.log(Array.from(new Array(this.dices+1), (_, i) => 100*this.binomial(this.dices,i)*Math.pow(this.p, i)*Math.pow(this.q, this.dices - i)));
        return Array.from(new Array(this.dices+1), (_, i) => 100*this.binomial(this.dices, i)*(this.p**i)*(this.q**(this.dices - i)));
    }

    factorial(n) {
        return (n<= 1) ? 1 : n*this.factorial(n-1);
    }

    binomial(n, k) {
        return this.factorial(n)/(this.factorial(k)*this.factorial(n-k));
    }

    copy () {
      const roll = new DiceRoller(this.side);
      roll.dices = this.dices;
      roll.q= this.q;
      roll.p = this.p;
      return roll;
    }

}