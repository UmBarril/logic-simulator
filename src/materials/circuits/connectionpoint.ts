import P5 from 'p5'

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
     * Desconecta o ponto de outro ponto de conexão.
     */
    disconnect(): void

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