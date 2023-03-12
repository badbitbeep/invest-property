export class CookieService {
  constructor() {
    this.entries = new Map(document.cookie.split("; ").map((entry) => entry.split("=")));
  }

  get(key) {
    const value = this.entries.get(key);
    return value ? JSON.parse(value) : undefined;
  }

  set(key, value) {
    let stringValue = JSON.stringify(value);
    this.entries.set(key, stringValue);
    document.cookie = `${key}=${stringValue}; max-age=31536000`;
  }
}
