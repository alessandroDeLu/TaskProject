export class Task{

    id: any;

    constructor(public descrizione: string, public dataScadenza: any, public completata: boolean, public taskPriority: boolean, public user: any) {}

    setId(taskId: any){
        this.id = taskId;
    }

}