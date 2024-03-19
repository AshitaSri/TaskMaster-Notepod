export class Todo {
    _id!: string;
    editMode: boolean = false; // Move editMode property to the Todo class
  
    constructor(
      public sno: number,
      public title: string,
      public desc: string,
      public active: boolean
    ) {}
  }