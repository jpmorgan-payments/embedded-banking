| Key | Regex Pattern / Validation Rule | Description |
|-----|--------------------------------|-------------|
| firstName | `^[a-zA-Z0-9\s<special_chars>]*$` and `^\S*\S$` | Alphanumeric, spaces, allowed special characters; No leading/trailing whitespace; Max 30 characters |
| middleName | `^[a-zA-Z0-9\s<special_chars>]*$` | Alphanumeric, spaces, allowed special characters; Optional; Max 30 characters |
| lastName | `^[a-zA-Z0-9\s<special_chars>]*$` and `^\S*\S$` | Alphanumeric, spaces, allowed special characters; No leading/trailing whitespace; Max 30 characters |
| individualEmail | N/A | Valid email format; Max 50 characters |
| jobTitle | N/A | Required string |
| jobTitleDescription | `^[a-zA-Z0-9\s<special_chars>]*$` and `^(?!\s)(.*[^\s])(?<!\s)$` | Alphanumeric, spaces, allowed special characters; No leading/trailing whitespace; Required if jobTitle is 'Other'; Max 50 characters |
| ssn | `^\d{9}$` | Exactly 9 digits |
| addressLine1 | `^[a-zA-Z0-9\s<special_chars>]*$` and `.*[^\d].*` and `^\d.*$` and `^(?!\s)(.*[^\s])(?<!\s)$` | Alphanumeric, spaces, allowed special characters; Must contain non-digit; Must start with number; No leading/trailing whitespace; Max 34 characters |
| addressLine2 | `^[a-zA-Z0-9\s<special_chars>]*$` | Alphanumeric, spaces, allowed special characters; Optional; Max 34 characters |
| addressLine3 | `^[a-zA-Z0-9\s<special_chars>]*$` | Alphanumeric, spaces, allowed special characters; Optional; Max 34 characters; Empty if addressLine2 is empty |
| city | `^[a-zA-Z\s]*$` and `^(?!\s)(.*[^\s])(?<!\s)$` | Only letters and spaces; No leading/trailing whitespace; Max 34 characters |
| state | N/A | Required string; Max 30 characters |
| postalCode | `^\d{5}(?:[-\s]\d{4})?$` | 5 digits, optionally followed by hyphen/space and 4 more digits; Max 10 characters |
| phone | `^\d{10}$` | Exactly 10 digits; Valid US phone number |
| birthDate | N/A | Valid date; Age must be 18 or older |
| countryOfResidence | `oneOf(['US', 'Canada', 'UK'])` | Must be one of specified countries |

Note: 
1. `<special_chars>` in the regex patterns represents additional allowed characters defined by the `specialCharacters` parameter in the `createRegExpAndMessage` function. The exact characters are not visible in the provided code snippet.
2. The `createRegExpAndMessage` function escapes special regex characters (^-]\\) in the `specialCharacters` string before including them in the regex pattern.
3. Many fields combine multiple regex patterns for more specific validations.
4. Some fields have additional validation logic beyond regex patterns (e.g., birthDate age calculation).
