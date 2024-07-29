| Key | Regex Pattern / Validation Rule | Description |
|-----|--------------------------------|-------------|
| organizationName | `^[a-zA-Z0-9\s<special_chars>]*$` and `^(?!\s)(.*[^\s])(?<!\s)$` | Alphanumeric, spaces, allowed special characters; No leading/trailing whitespace |
| dbaName | `^[a-zA-Z0-9\s<special_chars>]*$` | Alphanumeric, spaces, allowed special characters; Uses `trim()`, optional |
| organizationType | `oneOf()` | Must be one of specified business types |
| businessEmail | N/A | Uses Yup's built-in email validation, optional |
| countryOfFormation | `oneOf(['US', 'Canada', 'UK'])` | Must be one of specified countries |
| yearOfFormation | N/A | Number between 1900 and current year |
| website | `/^http(s)?:\/\/www\.[a-zA-Z0-9-@!"#$%&'()*+,/:;<=>?[\]_`{|}~.]{1,256}\.[a-z]{2,63}\b([a-zA-Z0-9-@!"#$%&'()*+,/:;<=>?[\]_`{|}~.\\]*)$/` | Valid URL format with specific requirements |
| websiteAvailable | N/A | Boolean |
| organizationDescription | `^[a-zA-Z0-9\s<special_chars>]*$` and `/^\s+|\s+$/` (inverse) and not including `\n` | Alphanumeric, spaces, allowed special characters; No leading/trailing whitespace; No newline characters |
| businessAddressLine1 | `^[a-zA-Z0-9\s<special_chars>]*$` and `^(?!\s)(.*[^\s])(?<!\s)$` and `/.*[^\d].*/` and `/^\d.*$/` | Alphanumeric, spaces, allowed special characters; No leading/trailing whitespace; Must contain at least one non-digit; Must start with a number |
| businessAddressLine2 | `^[a-zA-Z0-9\s<special_chars>]*$` | Alphanumeric, spaces, allowed special characters; Uses `trim()`, optional |
| businessAddressLine3 | `^[a-zA-Z0-9\s<special_chars>]*$` | Alphanumeric, spaces, allowed special characters; Uses `trim()`, optional |
| businessCity | `/^[a-zA-Z\s]*$/` and `^(?!\s)(.*[^\s])(?<!\s)$` | Only letters and spaces; No leading/trailing whitespace |
| businessState | N/A | No specific regex |
| businessPostalCode | `/^\d{5}(?:[-\s]\d{4})?$/` | 5 digits, optionally followed by hyphen/space and 4 more digits |
| businessPhone | `/^\d{10}$/` | Exactly 10 digits |
| industryType | N/A | Required string |
| industryCategory | N/A | Required string |

Note: 
1. `<special_chars>` in the regex patterns represents additional allowed characters defined by the `specialCharacters` parameter in the `createRegExpAndMessage` function. The exact characters are not visible in the provided code snippet.
2. Some validations are conditional based on other field values (e.g., `businessAddressSameAsController`).
3. The `createRegExpAndMessage` function escapes special regex characters (^-]\\) in the `specialCharacters` string before including them in the regex pattern.
