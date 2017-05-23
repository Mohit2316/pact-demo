class Guest {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
      }

    static fromJson(data) {
        return new Guest(data.id, data.name, data.age);
    }

}

module.exports = Guest;
