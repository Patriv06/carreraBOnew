import { Autodromos } from "../autodromos/autodromos";
import { Categorias } from "../categorias/categorias";

export class Carreras {
    public idCarreras!: number;
    public temporadaCarrera!:string;
    public cantPilCarrera!:number;
    public multiplCarrera!:number;
    public fechaCarrera!:Date;
    public autodromo!:Autodromos;
    public categorias!:Categorias;

}
