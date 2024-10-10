// class NamedState {
//     id: number; // int
//     name: String;
//     value: boolean;

//     constructor(id: number, name: String,value: boolean) {
//         this.id = id;
//         this.name = name;
//         this.value = value;
//     }
// }

// // Cada LogicUnit faz parte de uma árvore lógica
// class LogicUnit {
//     id: number
//     name: String

//     constructor(id: number, name: String) {
//         this.name = name
//         this.id = id
//     }

//     // Cada LogicUnit tem uma lista de inputs conectados a ele
//     // Cada input tem uma string como nome
//     logicConnections: {id: string, unit: LogicUnit}[] = []

//     addLogicUnit(inputs: string[], unit: LogicUnit)  {
//         inputs.forEach(input => {
//             this.logicConnections.push({id: input, unit: unit})
//         })
//     }

//     //   Portas 
//     //  v v  v v
//     //  1 2  3 4
//     //   |    |
//     //   u1   u2
//     //   ^    ^
//     // Logic units

//     run(inputs: NamedState[]): NamedState[] {
//         // Pegar todos os inputs conectados a este LogicUnit
//         let logicUnitsAndTheirInputs = new Map<LogicUnit, NamedState[]>();
//         for (let i = 0; i < inputs.length; i++) {
//             let input = inputs[i]
//             let connection = this.logicConnections[i]
//             if (connection == null) {
//                 throw new Error("Input not found")
//             }
//             if (logicUnitsAndTheirInputs.has(connection.unit)) {
//                 logicUnitsAndTheirInputs.get(connection.unit)?.push(input)
//             } else {
//                 logicUnitsAndTheirInputs.set(connection.unit, [input])
//             }
//         }

//         // Processar os inputs
//         logicUnitsAndTheirInputs.forEach((inputs, unit) => {
//             unit.run(inputs)
//         }

//         return false;
//     }
// }