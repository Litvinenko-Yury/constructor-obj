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
ivan.printInfo(); // вывести в консоль name, age и gender персонажа
ivan.addChildren(5); //добавить n детей в массив children у персонажа
ivan.printChildren(); // вывести  в консоль детей персонажа

/*********************************/
/*тест метода .incrementAge() на Иване*/
console.log(`Возраст Ивана, старое значение = ${ivan.age}`);
ivan.incrementAge(); //добавить возраст Ивану
console.log(`Возраст Ивана, новое значение = ${ivan.age}`);

/*********************************/
/*тест дескрипторы gender на Иване*/
let descriptorIvan = Object.getOwnPropertyDescriptor(ivan, '_gender'); // посмотреть дескрипторы для gender
console.log(`*******************`);
console.log(`Дескриптор для ivan._gender:`);
console.log(descriptorIvan);

/*********************************/
/*тест изменения ivan.age*/
/************************** */
/****для ivan добавил Proxy***/
//target - это сам объект
//property - имя свойства, которое нужно прочесть;
//value - значение свойства
ivan = new Proxy(ivan, {
  set(target, property, value) { // перехватываем запись свойства
    //console.log(typeof (property)); // имя свойства, которое читаем
    //console.log(typeof (target[property])); // сейчас там 25
    //console.log(typeof (value)); // записываем
    if (property.startsWith('age') && (target[property] > value)) {
      throw new Error("Отказано в доступе на запись");
    } else {
      target[property] = value; // записать новое значение а свойство
      return true;
    }
  },
  deleteProperty(target, property) { // перехватываем удаление свойства
    if (property.startsWith('_')) {
      throw new Error("Отказано в доступе на удаление");
    } else {
      delete target[property];
      return true;
    }
  }
});

ivan.age = 75; // значение  75 - можно записать
console.log(`ivan.age = ${ivan.age}`);

ivan.age = 20; // а вот 20 -нельзя записать, будет ошибка
console.log(ivan.age);


