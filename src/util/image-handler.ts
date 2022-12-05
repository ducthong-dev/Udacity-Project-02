class ImageHandler {
  public constructor() { }

  validateImageURL(url: string): boolean {
    return !!url.match(IMAGE_REGEX)
  }
}

