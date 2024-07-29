| Key | Regex Pattern | Description |
|-----|---------------|-------------|
| firstName | `^\S*\S$` | No leading/trailing whitespace |
| middleName | N/A | No specific regex, but uses `trim()` |
| lastName | `^\S*\S$` | No leading/trailing whitespace |
| individualEmail | N/A | Uses Yup's built-in email validation |
| jobTitle | N/A | No regex validation |
| jobTitleDescription | `^(?!\s)(.*[^\s])(?<!\s)$` | No leading/trailing whitespace (when jobTitle is 'Other') |
| ssn | `^\d{9}$` | Exactly 9 digits |
| addressLine1 | `.*[^\d].*` | Must contain at least one non-digit character |
|  | `^\d.*$` | Must start with a number |
|  | `^(?!\s)(.*[^\s])(?<!\s)$` | No leading/trailing whitespace |
| addressLine2 | N/A | No specific regex, but uses `trim()` |
| addressLine3 | N/A | No specific regex, but uses `trim()` |
| city | `^[a-zA-Z\s]*$` | Only letters and spaces |
|  | `^(?!\s)(.*[^\s])(?<!\s)$` | No leading/trailing whitespace |
| state | N/A | No regex validation |
| postalCode | `^\d{5}(?:[-\s]\d{4})?$` | 5 digits, optionally followed by hyphen/space and 4 more digits |
| phone | `^\d{10}$` | Exactly 10 digits |
| birthDate | N/A | Uses custom test function for age validation |
| countryOfResidence | N/A | Uses `oneOf()` for validation |

Note: Some fields also use custom regex patterns from `createRegExpAndMessage()` function, which are not visible in the provided code snippet.
