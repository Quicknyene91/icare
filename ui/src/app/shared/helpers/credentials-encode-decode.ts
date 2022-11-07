

export function encodeToBase64(text){
    return btoa(text);
} 
export function decodeFromBase64(cipher){
    return atob(cipher)
}

export function base64ToHexa(base64String) {
  for (
    var i = 0,
      bin = atob(base64String.replace(/[ \r\n]+$/, "")),
      hex = [];
    i < bin.length;
    ++i
  ) {
    var tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = "0" + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join(" ");
} 

export function hexaToBase64(hexaString) {
  return String.fromCharCode.apply(
    null,
    hexaString
      .replace(/\r|\n/g, "")
      .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
      .replace(/ +$/, "")
      .split(" ")
  );
}