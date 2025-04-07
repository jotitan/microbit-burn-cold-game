// Change group radio
function changeRadioGroup(shift: number){

}

function ConfigureReceiver() {

    // Previous tag
    input.onButtonPressed(Button.A, () => {
        changeRadioGroup(-1)
    });
    // Next tag
    input.onButtonPressed(Button.B, () => {
        changeRadioGroup(1)
    });


    radio.onReceivedString(msg => {
        // Only received TAG message
	// Get signal and show it
    })
}

ConfigureReceiver()
