// Simple ID counter for generating sequential IDs at runtime
let idCounter = 1

export function generateId(): string {
  return String(idCounter++)
}
