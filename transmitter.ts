// Two cases : bound for position or client who searching position

function ConfigureTagTransmitter(group: number) {
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
    basic.forever(() => {
        radio.sendString("TAG")
        basic.pause(500);
    })
}

class ChooseTagGroupRadio {
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

//new ChooseTagGroupRadio(ConfigureTagTransmitter)