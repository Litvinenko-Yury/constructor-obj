'use strict';

function User(name, age) {
  this.name = name;
    this._age = age;
}

/**создаем новых людей*/
let user = new User('Ivan', '25');

user = new Proxy(user, {
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


/**смотрим, что люди создались */
console.log(user);

/*тест изменения user.age*/
user.age = 50;
console.log(`*******************`);
console.log(`ivan.age = ${user.age}`); // оно изменилось...






/****************** */
/****************** */
// "set" не позволяет записать _password
try {
  user._password = "test"; // Error: Отказано в доступе
} catch (e) { console.log(e.message); }

// "deleteProperty" не позволяет удалить _password
try {
  delete user._password; // Error: Отказано в доступе
} catch (e) { console.log(e.message); }

