class Weapon {
  constructor(models = 30,
              attacks = 1,
              hit = 4,
              hitReroll = 0,
              wound = 4,
              woundReroll = 0,
              rend = 0,
              damage = 1) {
    this.models = models;
    this.attacks = attacks;
    this.hit = hit;
    this.hitReroll = hitReroll;
    this.wound = wound;
    this.woundReroll = woundReroll;
    this.rend = rend;
    this.damage = damage;
  }
}

class Unit {
  constructor() {
    this.name = 'My Unit'
    this.weapons = [new Weapon()];
  }
  edit(element){
    const tr = document.createElement('tr');
    this.weapons.forEach(weapon => {
      this.__edit(tr, 'number', '50px', weapon.models);
      this.__edit(tr, 'text', '50px', weapon.attacks);
      this.__edit(tr, 'number', '30px', weapon.hit);
      //this.__edit(td, 'checkbox', '50px', weapon.hitReroll);
      this.__edit(tr, 'number', '50px', weapon.wound);
      //this.__edit(td, 'checkbox', '50px', weapon.woundReroll);
      this.__edit(tr, 'number', '50px', weapon.rend);
      this.__edit(tr, 'text', '50px', weapon.damage);

      const td = document.createElement('td');
      {
        const add = document.createElement('button');
        add.innerHTML='+';
      }
      tr.appendChild(td);
    });
    element.appendChild(tr);
  }

  __edit(element, type, width, value) {
    const td = document.createElement('td');
    const input = document.createElement('input');
    input.type= type;
    input.style.width = width;
    input.value = value;
    td.appendChild(input);
    element.appendChild(td);
  }

  display(element) {
    const tr = document.createElement('tr');
    this.weapons.forEach(weapon => {
      this.__display(tr, weapon.models);
      this.__display(tr, weapon.attacks);
      this.__display(tr, weapon.hit);
      //this.__edit(td, 'checkbox', '50px', weapon.hitReroll);
      this.__display(tr, weapon.wound);
      //this.__edit(td, 'checkbox', '50px', weapon.woundReroll);
      this.__display(tr, weapon.rend);
      this.__display(tr, weapon.damage);

      const td = document.createElement('td');
      {
        const add = document.createElement('button');
        add.innerHTML='+';
      }
      tr.appendChild(td);
    });
    element.appendChild(tr);
  }
  __display(element, value) {
    const td = document.createElement('td');
    td.innerHTML = value;
    element.appendChild(td);
  }
}