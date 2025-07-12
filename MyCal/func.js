/**
 * Modern Calculator Application
 * Developed by Ahsan Fayyaz
 * BSCS Student - 4th Semester
 */

const display = document.getElementById('inputBox');
let currentInput = '0';
let shouldResetDisplay = false;

// Initialize display
updateDisplay();

function updateDisplay() {
    display.value = currentInput;
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }

    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function toggleSign() {
    if (currentInput !== '0') {
        currentInput = currentInput.startsWith('-') ?
            currentInput.substring(1) :
            '-' + currentInput;
        updateDisplay();
    }
}

function calculate() {
    try {
        let expression = currentInput.replace(/(\d+)%/g, '($1/100)');
        const result = eval(expression);

        if (!isFinite(result)) {
            throw new Error('Invalid operation');
        }

        currentInput = result.toString();
        shouldResetDisplay = true;
        updateDisplay();

    } catch (error) {
        currentInput = 'Error';
        updateDisplay();

        setTimeout(() => {
            currentInput = '0';
            updateDisplay();
        }, 1500);
    }
}

// Enhanced keyboard support
document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
        return;
    }

    switch (key) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            appendToDisplay(key);
            break;
        case '.':
            if (!currentInput.includes('.')) {
                appendToDisplay(key);
            }
            break;
        case 'Enter':
        case '=':
            event.preventDefault();
            calculate();
            break;
        case 'Escape':
        case 'c':
        case 'C':
            clearAll();
            break;
        case 'Backspace':
            deleteLast();
            break;
    }
});