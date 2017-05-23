class GuestRepository {

    constructor() {
        this.guests = [];
    }

    fetchAll() {
        return this.guests;
    }

    getById(guestId) {
        return this.guests[0];
    }

    insert(guest) {
        this.guests.push(guest);
    }

    clear() {
        this.guests = [];
    }
}

module.exports = GuestRepository;
