import { Lineitem } from "./lineitem";
import { User } from "./user";

export class Request {
    id: number;
    user: User;
    description: string;
    dateNeeded: string;
    deliveryMode: string;
    justification: string;
    status: string;
    total: string;
    submittedDate;
    reasonForRejection: string;

    constructor(id: number = 0, user: User = new User(), description: string = '', dateNeeded: string = '', 
        deliveryMode: string = '', justification: string = '', status: string = ''
        , total: string = '', submittedDate: string = '', reasonForRejection: string = ''
){
        this.id = id;
        this.user = user;
        this.description = description;
        this.dateNeeded = dateNeeded;
        this.deliveryMode = deliveryMode ;
        this.justification = justification ;
        this.status = status;
        this.total = total;
        this.submittedDate = submittedDate;
        this.reasonForRejection = reasonForRejection;
    } 
}