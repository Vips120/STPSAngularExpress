export interface Iregister {
    firstname: string;
    lastname: string;
    Age: number;
    Address: string;
    UserLogin: {
        emailid: string;
        password: string;
    }
};


export interface Ilogin {
    UserLogin: {
        emailid: string;
        password: string;
    }
}