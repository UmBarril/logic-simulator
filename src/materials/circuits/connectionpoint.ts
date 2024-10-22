import P5 from 'p5'
import { Circuit } from '../../logic/circuit'

export enum PointType {
    INPUT,
    OUTPUT
}

export interface ConnectionPoint {

    /**
     * Atualiza o valor do ponto de conexão.
     * @param value 
     */
    updateValue(value: boolean): void

    /**
     * Retorna o nome (id) do ponto de conexão.
     */
    getName(): string

    /**
     * Retorna o valor do ponto de conexão.
     * NOTA: talvez isso possa ser um valor inteiro no futuro... @todo
     */
    getValue(): boolean

    /**
     * Retorna a posição do ponto de conexão.
     */
    getConnectionPointPosition(): P5.Vector


    /**
     * Se este ponto de conexão é faz parte de um circuito pai (o que está sendo editado no momento).
     * TALVEZ TRANSFORMAR ISSO NUM TIPO DE DEPOIS @todo
     */
    getIsParent(): boolean

    /**
     * Retorna o circuito pai do ponto de conexão.
     */
    getCircuit(): Circuit
}