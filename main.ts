// Two cases : bound for position or client who searching position

class Configuration {
    constructor(private isBoundary: boolean = true) {
        new KindConfig((isBoundary: boolean) => this.finishConfig(isBoundary));
    }
    finishConfig(isBoundary: boolean) {
        this.isBoundary = isBoundary;
        if (this.isBoundary) {
            new ChooseTagGroupRadio(ConfigureTagTransmitter)
        } else {
            ConfigureReceiver();
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

new Configuration()