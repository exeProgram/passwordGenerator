var passText = document.getElementById("password-smalltext");
var passOutput = document.getElementById("password-output");
var passWordLengthSlider = document.getElementById("password-length");
var passWordLengthSliderMaximum = 50000000;
var passWordLength = document.getElementById("password-length-number");
var upperCaseCheck = document.getElementById("upper-case-chars");
var lowerCaseCheck = document.getElementById("lower-case-chars");
var numbersToggle = document.getElementById("numbers-toggle");
var specialChars = document.getElementById("special-chars");
var generationFields = '';
var generatedString = '';
// Generate what strings / characters to use 
function passwordGeneration() {
    generationFields = '';
    var sliderLength = parseInt(passWordLengthSlider.value);
    if (upperCaseCheck.checked === true) {
        generationFields += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (lowerCaseCheck.checked === true) {
        generationFields += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (numbersToggle.checked === true) {
        generationFields += '0123456789';
    }
    if (specialChars.checked === true) {
        generationFields += '%^$@*!?{}().,';
    }
    generatedString = '';
    for (var i = 0; i < sliderLength; i++) {
        generatedString += generationFields.charAt(Math.floor(Math.random() * generationFields.length));
    }
    return generatedString;
}
function generatePassword() {
    var grabGeneratedPassword = passwordGeneration();
    passOutput.innerHTML = grabGeneratedPassword;
}
function clipboardEndS2() {
    var findCopiedBox = document.getElementById("clipboard-copy-notification");
    findCopiedBox.parentElement.removeChild(findCopiedBox);
}
function clipboardEndS1() {
    var findCopiedBox = document.getElementById("clipboard-copy-notification");
    findCopiedBox.style.opacity = "0";
    setTimeout(clipboardEndS2, 250);
}
function clipboardCopy() {
    var tempBox = document.createElement("textarea");
    document.body.appendChild(tempBox);
    tempBox.value = passOutput.innerHTML;
    tempBox.select();
    document.execCommand("Copy");
    document.body.removeChild(tempBox);
    var copiedBox = document.createElement("h3");
    copiedBox.innerHTML = "Copied to Clipboard!";
    document.getElementById("clipboard-copy").appendChild(copiedBox);
    copiedBox.id = "clipboard-copy-notification";
    copiedBox.className += "generated-copy-button";
    copiedBox.style.opacity = "1";
    setTimeout(clipboardEndS1, 2000);
}
// Observe the change in the password field to move the "No Password" text upward
var Observer = new MutationObserver(function (mutationRecords) {
    passFieldChecker(mutationRecords);
});
function passFieldChecker(args) {
    if (passOutput.innerHTML == "") {
        passText.style.fontSize = "clamp(25px,3vw,40px)";
        passText.style.transform = "translateY(50%)";
        passOutput.style.opacity = "0";
        passText.innerHTML = "No Password Generated";
    }
    else {
        passText.style.fontSize = "clamp(18px,3vw,20px)";
        passText.style.transform = "translateY(0px)";
        passOutput.style.opacity = "1";
        passText.innerHTML = "Generated Password";
    }
}
Observer.observe(passOutput, {
    childList: true,
    subtree: true,
    characterDataOldValue: true
});
// Password Slider Value Changed
passWordLengthSlider.addEventListener("change", function (e) {
    passWordLength.innerHTML = passWordLengthSlider.value + " / " + passWordLengthSliderMaximum;
});
function sliderChange(args) {
    passWordLength.innerHTML = args + " / " + passWordLengthSliderMaximum;
}
