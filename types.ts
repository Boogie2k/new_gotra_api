export type User = {
    _id: string;
    email: string;
    username: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;

}

export type Goal = {
    _id: string;
    title: string;
    description: string;
    user: string;
    createdAt: string;
    updatedAt: string;
    author: {_id: string, username: string, email:string}[];
    __v: number;

}

