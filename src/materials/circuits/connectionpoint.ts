import P5 from 'p5'
import { IOState } from '../../logic/iostate'

export enum PointType {
    INPUT,
    OUTPUT
}

export interface ConnectionPoint {

    /**
     * Conecta um ponto de conexão a outro ponto de conexão.
     * @param connectionPoint 
     */
    connect(connectionPoint: ConnectionPoint): void

    /**
     * Desconecta um ponto de conexão de outro ponto de conexão.
     * @param connectionPoint 
     */
    disconnect(connectionPoint: ConnectionPoint): void

    /**
     * Atualiza o valor do ponto de conexão.
     * @param value 
     */
    updateValue(value: boolean): void

    /**
     * Retorna o estado do ponto de conexão.
     */
    getState(): IOState

    /**
     * Retorna o valor do ponto de conexão.
     * NOTA: talvez isso possa ser um valor inteiro no futuro... @todo
     */
    getValue(): boolean

    /**
     * Retorna se o ponto de conexão é um ponto de entrada ou saída.
     */
    getPointType(): PointType

    /**
     * Retorna o ponto de conexão conectado a este ponto de conexão.
     */
    getConnectedConnectionPoint(): ConnectionPoint | null

    /**
     * Retorna a posição do ponto de conexão.
     */
    getConnectionPointPosition(): P5.Vector

}