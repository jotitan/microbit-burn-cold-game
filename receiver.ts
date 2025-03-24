function changeRadioGroup(shift: number) {
    currentRG = (currentRG + shift + 255) % 255
    basic.showNumber(currentRG)
    radio.setGroup(currentRG)
    if (isAlreadyFound()) {
        basic.showIcon(IconNames.Yes)
    }
    // Could try with frequency also
}

function isAlreadyFound(): boolean {
    return tagFounded[currentRG] != null && tagFounded[currentRG];
}

let currentRG = 0;
let tagFounded: boolean[] = [];
function ConfigureReceiver() {

    radio.setGroup(currentRG)
    basic.clearScreen()
    // Next tag
    input.onButtonPressed(Button.A, () => {
        changeRadioGroup(-1)
    });
    input.onButtonPressed(Button.B, () => {
        changeRadioGroup(1)
    });

    // When tag is found (enough close, power > 90), validate target
    input.onLogoEvent(TouchButtonEvent.Pressed, () => {
        if (isAlreadyFound()) {
            return;
        }
        if (radio.receivedPacket(2) + 128 > 90) {
            // OK
            tagFounded[currentRG] = true;
            basic.showIcon(IconNames.Yes)
        }
    })
    // Previous tag

    radio.onReceivedString(msg => {
        if (isAlreadyFound()) {
            return;
        }
        if (msg.indexOf("TAG") !== 0) {
            basic.showIcon(IconNames.Target)
            return;
        }
        const signal = radio.receivedPacket(2) + 128;
        showReceiveLine(Math.floor(signal / 7))
    })
}

function showReceiveLineFive(line: number) {
    basic.clearScreen()
    for (let i = 0; i <= line; i++) {
        for (let j = 0; j <= 4; j++) {
            led.plot(i, j);
        }
    }
}

function showReceiveLine10(line: number) {
    basic.clearScreen()
    for (let i = 0; i <= line/2; i++) {
        const cLine = i === line/2 && line %2 === 0 ? 1 : 0
        for (let j = cLine; j <= 4 - cLine; j++) {
            led.plot(i, j);
        }
    }
}

// 0 to 15
function showReceiveLine(value: number) {
    basic.clearScreen()
    const line = Math.floor(value / 3)
    for (let i = 0; i <= line; i++) {
        const cLine = i === line ? 2 - value % 3 : 0
        for (let j = cLine; j <= 4 - cLine; j++) {
            led.plot(i, j);
        }
    }
}


//ConfigureReceiver()