/**скрипт-макет для опробования разных приёмов*/

'use strict';

function User(name, age) {
  this.name = name;
  this.age = age;
}

/**создаем новых людей*/
let user = new User('Ivan', 25);
console.log(user);

/************************** */
/****для user добавил Proxy***/
//***
//target - это сам объект
//property - имя свойства, которое нужно прочесть;
//value - значение свойства
user = new Proxy(user, {
  set(target, property, value) { // перехватываем запись свойства
    console.log(typeof (property)); // имя свойства, которое читаем
    console.log(typeof (target[property])); // сейчас там 25
    console.log(typeof (value)); // записываем
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

/**меняем _age*/
user.age = 20;
console.log(user);
