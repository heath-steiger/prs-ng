export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    reviewer: boolean;
    admin: boolean;

    constructor(id: number = 0, username: string ='', password: string = '', firstName: string = '', 
        lastName: string = '', admin: boolean = false, phoneNumber: string = '', 
        email: string = '', reviewer: boolean = false
){
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.admin = admin;
        this.reviewer = reviewer;
    }
}