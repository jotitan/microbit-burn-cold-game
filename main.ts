// Two cases : bound for position or client who searching position

function ConfigureTag(group: number) {
    basic.clearScreen()
    radio.setGroup(group);
    radio.setTransmitSerialNumber(true)
    basic.showNumber(group)
    let transmitPower = 6;
    
    //Change transmit power
    input.onButtonPressed(Button.A, () => {
        transmitPower = (transmitPower + 1) % 8
        radio.setTransmitPower(transmitPower)
        basic.showNumber(transmitPower)
    })

    input.onLogoEvent(TouchButtonEvent.Pressed, () => basic.showNumber(group))
   
   // Send message every second
   basic.forever(()=> {
       radio.sendString("TAG")
       basic.pause(1000);
   })
}

function changeGroup(shift: number){
    currentRadioGroup = (currentRadioGroup + shift + 255) % 255
    basic.showNumber(currentRadioGroup)
    radio.setGroup(currentRadioGroup)
    if(alreadyFound()){
        basic.showIcon(IconNames.Yes)
    }
    // Could try with frequency also
}

function alreadyFound():boolean {
    return results[currentRadioGroup] != null && results[currentRadioGroup];
}

let currentRadioGroup = 0;
let results: boolean[] = [];
function ConfigureClient() {
    
    radio.setGroup(currentRadioGroup)

    basic.clearScreen()
    let strengths = [0, 0, 0]
    let count = 0
    // Next tag
    input.onButtonPressed(Button.A, () => {
        changeGroup(-1)
    });
    input.onButtonPressed(Button.B, () => {
        changeGroup(1)
    });

    // When tag is found (enough close, power > 90), validate target
    input.onLogoEvent(TouchButtonEvent.Pressed,()=> {
        if(alreadyFound()){
            return;
        }
        if(radio.receivedPacket(2) + 128 > 90){
            // OK
            results[currentRadioGroup] = true;
            basic.showIcon(IconNames.Yes)
        }
    })
    // Previous tag

    radio.onReceivedString(msg => {
        if (alreadyFound()){
            return;
        }
        if (msg.indexOf("TAG") !== 0) {
            basic.showIcon(IconNames.Target)
            return;
        }
        const signal = radio.receivedPacket(2) + 128;
        showLine(Math.floor(signal / 20))
    })
}

function showLine(line: number){
    basic.clearScreen()
    for(let i = 0 ; i <= line ; i++){
        for(let j = 0 ; j <= 4 ; j++){
            led.plot(i,j);
        }
    }
}

function showReception(value: number) {
    basic.clearScreen();
    led.plot(0, 0)
    if (value > 1) {
        led.plot(1, 0)
    }
    if (value > 2) {
        led.plot(2, 0)
    }
}

class Configuration {
    constructor(private isBoundary: boolean = true) {
        new KindConfig((isBoundary: boolean) => this.finishConfig(isBoundary));
    }
    finishConfig(isBoundary: boolean) {
        this.isBoundary = isBoundary;
        if (this.isBoundary) {
            new ChooseTagGroup(ConfigureTag);
        } else {
            ConfigureClient();
        }
    }
}

class KindConfig {
    constructor(next: (isBoudary: boolean) => void, private isBoundary: boolean = true) {
        input.onButtonPressed(Button.A, () => this.changeKind());
        input.onButtonPressed(Button.B, () => next(this.isBoundary));
        this.show();
    }
    changeKind() {
        this.isBoundary = !this.isBoundary;
        this.show();
    }
    show() {
        if (this.isBoundary) {
            basic.showIcon(IconNames.Square)
        } else {
            basic.clearScreen()
            led.plot(2, 2)
        }
    }
}

class ChooseTagGroup {
    constructor(next: (group: number) => void, private group: number = 0) {
        input.onButtonPressed(Button.A, () => this.changeGroup());
        input.onButtonPressed(Button.B, () => next(this.group));
        this.show();
    }
    changeGroup() {
        this.group = (this.group + 1) % 255;
        this.show();
    }
    show() {
        basic.showNumber(this.group);
    }
}

new Configuration()