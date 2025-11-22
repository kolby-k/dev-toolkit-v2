function base64url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) {
    bin += String.fromCharCode(bytes[i]);
  }

  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, ""); // strip padding
}

export function generateApiKey(length: number = 32, prefix = ""): string {
  if (!Number.isInteger(length) || length < 10 || length > 99) {
    throw new Error("API key length must be an integer between 10 and 99.");
  }

  // number of 4-char base64 groups we need
  const groups = Math.ceil(length / 4);

  // make bytes a multiple of 3 so we don't get '=' padding
  const bytes = groups * 3;

  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);

  const raw = base64url(buf); // length = 4 * groups

  const key = raw.slice(0, length);

  return prefix ? `${prefix}.${key}` : key;
}

export function getCurrentStrengthLabel(keyLength: number) {
  if (!keyLength || keyLength < 10) {
    return "";
  } else if (keyLength < 20) {
    return "SAFE";
  } else if (keyLength < 32) {
    return "STRONG";
  } else if (keyLength < 43) {
    return "VERY STRONG";
  } else {
    return "EXTREMELY STRONG";
  }
}
