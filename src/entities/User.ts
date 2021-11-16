export interface IUser {

    txt: string;
    to: string;
}

class User implements IUser {


    public txt: string;
    public to: string;

    constructor(nameOrUser: string | IUser, txt?: string , to?: string) {
        if (typeof nameOrUser === 'string') {

            this.txt= txt || '';
            this.to= to || '';
        } else {

            this.txt= nameOrUser.txt;
            this.to= nameOrUser.to;
        }
    }
}

export default User;
