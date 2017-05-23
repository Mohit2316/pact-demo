class Guest {
    constructor(name, age, info) {
        this.name = name;
        this.age = age;
        this.info = info;
    }

    static fromJson(data) {
        return new Post(data.name, data.age, data.info);
    }

}

module.exports = Guest;
