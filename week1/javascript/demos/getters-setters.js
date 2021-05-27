let Person = function(n, a) {
    let name = n;
    let age = a;

    const obj = {
        getName() {
            return name;
        },

        setName(newName) {
            name = newName;
        },

        getAge() {
            return age;
        },

        setAge(newAge) {
            age = newAge;
        },
    }

    obj.__proto__ = this;

    return obj;
}

let larry = new Person("Larry", 25);

console.log(larry);
console.log(larry.getName());
console.log(larry.getAge());
larry.setAge(55);
console.log(larry.getAge());

let chad = new Person("Chad", 23);

console.log(chad.getAge());
console.log(larry.getAge());