const LIKED_PROPERTIES_COOKIE_KEY = "user-liked-properties";

export class UserDatabase {
  constructor() {
    this.userLikedProperties = new Set();
    this.cookieService = undefined;
  }

  loadDatabase(cookieService) {
    this.cookieService = cookieService;
    this.userLikedProperties = new Set(cookieService.get(LIKED_PROPERTIES_COOKIE_KEY) ?? []);
    return Promise.resolve();
  }

  isPropertyLiked(propertyId) {
    return this.userLikedProperties.has(propertyId);
  }

  likeProperty(propertyId) {
    if (this.userLikedProperties.has(propertyId)) return;
    this.userLikedProperties.add(propertyId);
    this.cookieService?.set(LIKED_PROPERTIES_COOKIE_KEY, [...this.userLikedProperties.keys()]);
  }

  unlikeProperty(propertyId) {
    this.userLikedProperties.delete(propertyId);
    this.cookieService?.set(LIKED_PROPERTIES_COOKIE_KEY, [...this.userLikedProperties.keys()]);
  }
}
