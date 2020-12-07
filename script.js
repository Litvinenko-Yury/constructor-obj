/*Конструктор объектов*/

'use strict';

function Person(name, age, gender) {
  //это функция-конструктор. Она конструирует объекты. H-р, новых персон
  this.name = name;
    this.age = age;
    this._gender = gender;
    Object.defineProperty(this, "_gender", { writable: false }); // изменить дескриптор
    this.children = [];

    this.printInfo = function () {
      console.log(`*******************`);
      console.log(`данные по: ${this.name}`);
      console.log(`name = ${this.name}`);
      console.log(`age = ${this.age}`);
      console.log(`gender = ${this._gender}`);
      console.log(`*******************`);
    };

    this.printChildren = function () {
      console.log(`*******************`);
      console.log(`Дети ${this.name}:`);
      console.log(this.children);
      console.log(`*******************`);
    };

    this.incrementAge = function () {
      this.age = this.age + 1;
    };

    this.addChildren = function (n) {
      for (let i = 0; i < n; i++) {
        let nameChild = `реб${i + 1}`;
        this.children.push(nameChild);
      }
    };
}


/*********************************/
/**создаем новых людей*/
let ivan = new Person('Ivan', 25, 'men'),
  alex = new Person('Alex', 22, 'men'),
  helen = new Person('Helen', 28, 'women');

/*********************************/
/**смотрим, что люди создались */
console.log(ivan);
console.log(alex);
console.log(helen);

/*********************************/
/*тест методов на Иване*/
ivan.printInfo(); // вывести name, age и gender персонажа
ivan.addChildren(5); //добавить n детей в массив children у персонажа
ivan.printChildren(); // вывести детей персонажа

/*********************************/
/*тест метода .incrementAge() на Иване*/
console.log(`Возраст Ивана, старое значение = ${ivan.age}`);
ivan.incrementAge(); //добавить n детей в массив children
console.log(`Возраст Ивана, новое значение = ${ivan.age}`);

/*********************************/
/*тест дескрипторы gender на Иване*/
let descriptorIvan = Object.getOwnPropertyDescriptor(ivan, '_gender'); // посмотреть дескрипторы для gender
console.log(`*******************`);
console.log(`Дескриптор для ivan._gender:`);
console.log(descriptorIvan);

/*********************************/
/*тест изменения ivan.age*/
ivan.age = 50;
console.log(`*******************`);
console.log(`ivan.age = ${ivan.age}`); // оно изменилось...
console.log(`оно изменилось...`);

ivan = new Proxy(ivan, {
  set(target, prop, val) { // перехватываем запись свойства
    if (prop.startsWith('_')) {
      throw new Error("Отказано в доступе на запись");
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) { // перехватываем удаление свойства
    if (prop.startsWith('_')) {
      throw new Error("Отказано в доступе на удаление");
    } else {
      delete target[prop];
      return true;
    }
  }
});

ivan.age = 75;
console.log(`*******************`);
console.log(`ivan.age = ${ivan.age}`); // оно ОПЯТЬ изменилось...
console.log(`оно ОПЯТЬ изменилось...`);
console.log(`*******************`);
console.log(`ЭТО ФИАСКО, БРАТАН...`);
