export class Category{
    id: string;
    name : string;
    levels:Levels [];
}

export class Levels{
    id: string;
    name : string;
    sublevels: Sublevels[]
}

export class Sublevels{
    id: string;
    name : string;
}
