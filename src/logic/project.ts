import P5 from 'p5';
import { Circuit } from './circuit';


/**
 * Um Project tem um nome e uma lista de circuitos.
 * Além disso, um projeto pode ser salvo e carregado.
 * 
 * Ele também deve controlar o circuito sendo projetado atualmente.
 * 
 * @todo Implementar
 */
export class Project {

    circuits: Circuit[] = []
    currentCircuit: Circuit | null = null

    constructor(public name: string) { }

    /**
     * Adiciona um circuito ao projeto.
     * @param circuit 
     */
    addCircuit(circuit: Circuit) {
        this.circuits.push(circuit) 
    }

    /**
     * Define o circuito atual.
     * @param circuit 
     */
    setCurrentCircuit(circuit: Circuit) {
        this.currentCircuit = circuit
    }

    /**
     * Salva o projeto.
     * @todo Implementar
     */
    save() {
        // TODO
    }

    /**
     * Carrega o projeto.
     * @todo Implementar
     */
    load() {
        // TODO
    }
}