import P5 from 'p5'

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
     * Retorna o valor do ponto de conexão.
     * NOTA: talvez isso possa ser um valor inteiro no futuro... @todo
     */
    getValue(): boolean

    /**
     * Retorna se o ponto de conexão é um ponto de entrada ou saída.
     */
    getPointType(): PointType

    /**
     * Retorna a posição do ponto de conexão.
     */
    getConnectionPointPosition(): P5.Vector

}