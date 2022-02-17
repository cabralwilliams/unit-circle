export function formatTime(inputTime = 120000) {
    let output = "";
    let remaining = inputTime;
    output += Math.floor(remaining/60000) + ":";
    remaining -= Math.floor(remaining/60000)*60000;
    if(remaining >= 10000) {
        output += Math.floor(remaining/10000);
        remaining -= Math.floor(remaining/10000)*10000;
    } else {
        output += "0";
    }
    output += Math.floor(remaining/1000);
    remaining -= Math.floor(remaining/1000)*1000;
    if(inputTime < 30000) {
        output += `.${Math.floor(remaining/100)}`;
    }
    return output;
}