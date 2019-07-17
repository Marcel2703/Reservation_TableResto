import { DateTime } from "ionic-angular";
import { Table } from "./table";
import { Client } from "./client";

export class Reservation {
    id: string;
    reservationCode: string;
    dateReservation:DateTime;
    guestNumber:number;
    commentary:string;
    clientId:string;
    employeeId:string;
    motifId:string;
    listeTable:Array<Table>;
    listePartageClient:Array<Client>;
    status:string;
    }

