const IMAGE_REGEX = "(https?:\/\/.*\.(?:png|jpg))"

export function validateImageURL(url: string): boolean {
  return !!url.match(IMAGE_REGEX)
}


