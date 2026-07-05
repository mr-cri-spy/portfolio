const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts an optional leading +, then 7-15 digits, allowing spaces/dashes/parens/dots as separators.
const PHONE_PATTERN = /^\+?[0-9][0-9\s\-().]{5,18}[0-9]$/;
const PHONE_DIGIT_COUNT_MIN = 7;
const PHONE_DIGIT_COUNT_MAX = 15;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!PHONE_PATTERN.test(trimmed)) return false;
  const digitCount = trimmed.replace(/\D/g, "").length;
  return digitCount >= PHONE_DIGIT_COUNT_MIN && digitCount <= PHONE_DIGIT_COUNT_MAX;
}
