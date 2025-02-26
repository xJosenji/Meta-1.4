const readline = require('readline');

// Definir las posibles líneas de código
const codeLines = [
    'a = 1 + 2;',
    'console.log("1+2");',
    'console.log(a);',
    'b = 3 + 4;',
    'console.log("3+4");',
    'console.log(b);',
    'c = 5 + 6;',
    'console.log("5+6");',
    'console.log(c);'
];

// Función para obtener una línea de código aleatoria
function getRandomCodeLine() {
    return codeLines[Math.floor(Math.random() * codeLines.length)];
}

// Función para inicializar los procesos
function initializeProcesses(numProcesses) {
    let processes = [];
    for (let i = 1; i <= numProcesses; i++) {
        let numLines = Math.floor(Math.random() * 3) + 2; // Entre 2 y 4 líneas de código
        let lines = [];
        for (let j = 0; j < numLines; j++) {
            lines.push(getRandomCodeLine());
        }
        processes.push({ id: i, lines });
    }
    return processes;
}

// Función para simular la ejecución Round Robin
function runSimulation(processes) {
    let activeProcesses = processes.filter(p => p.lines.length > 0);
    while (activeProcesses.length > 0) {
        for (let process of activeProcesses) {
            if (process.lines.length > 0) {
                console.log(`Proceso ${process.id}`);
                console.log(`Línea de código: ${process.lines.shift()}`);
                if (process.lines.length === 0) {
                    console.log(`Proceso ${process.id} Terminado`);
                }
            }
        }
        activeProcesses = activeProcesses.filter(p => p.lines.length > 0);
    }
}

// Leer el número de procesos desde la línea de comandos
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Ingrese el número de procesos a simular: ', (answer) => {
    let numProcesses = parseInt(answer);
    if (!isNaN(numProcesses) && numProcesses > 0) {
        let processes = initializeProcesses(numProcesses);
        console.log('\nIniciando simulación...\n');
        runSimulation(processes);
    } else {
        console.log('Número inválido. Intente de nuevo.');
    }
    rl.close();
});
