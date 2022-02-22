export class User {

    // cara kedua
    constructor(
        public id: number = 0,
        public first_name: string = '',
        public last_name: string = '',
        public email: string = '',
    ) {
    }
    
    // cara pertama
    // constructor() {
    //     this.id = 0;
    //     this.first_name = '';
    //     this.last_name = '';
    //     this.email = '';
    // }

    // bisa jadi property ( kalau pake get ), bisa jad function ( kalau tanpa get )
    // kalo jadi function harus user.name()
    get name() {
        return this.first_name + ' ' + this.last_name;
    }
    
}