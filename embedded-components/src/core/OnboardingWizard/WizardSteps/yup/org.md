| Key | Regex Pattern / Validation Rule | Description |
|-----|--------------------------------|-------------|
| organizationName | `^(?!\s)(.*[^\s])(?<!\s)$` | No leading/trailing whitespace |
| dbaName | N/A | Uses `trim()`, optional |
| organizationType | `oneOf()` | Must be one of specified business types |
| businessEmail | N/A | Uses Yup's built-in email validation, optional |
| countryOfFormation | `oneOf(['US', 'Canada', 'UK'])` | Must be one of specified countries |
| yearOfFormation | N/A | Number between 1900 and current year |
| website | `/^http(s)?:\/\/www\.[a-zA-Z0-9-@!"#$%&'()*+,/:;<=>?[\]_`{|}~.]{1,256}\.[a-z]{2,63}\b([a-zA-Z0-9-@!"#$%&'()*+,/:;<=>?[\]_`{|}~.\\]*)$/` | Valid URL format with specific requirements |
| websiteAvailable | N/A | Boolean |
| organizationDescription | `/^\s+|\s+$/` (inverse) | No leading/trailing whitespace |
|  | Not including `\n` | No newline characters |
| businessAddressLine1 | `^(?!\s)(.*[^\s])(?<!\s)$` | No leading/trailing whitespace |
|  | `/.*[^\d].*/` | Must contain at least one non-digit character |
|  | `/^\d.*$/` | Must start with a number |
| businessAddressLine2 | N/A | Uses `trim()`, optional |
| businessAddressLine3 | N/A | Uses `trim()`, optional |
| businessCity | `/^[a-zA-Z\s]*$/` | Only letters and spaces |
|  | `^(?!\s)(.*[^\s])(?<!\s)$` | No leading/trailing whitespace |
| businessState | N/A | No specific regex |
| businessPostalCode | `/^\d{5}(?:[-\s]\d{4})?$/` | 5 digits, optionally followed by hyphen/space and 4 more digits |
| businessPhone | `/^\d{10}$/` | Exactly 10 digits |
| industryType | N/A | Required string |
| industryCategory | N/A | Required string |

Note: Many fields use custom regex patterns from `createRegExpAndMessage()` function, which are not visible in the provided code snippet. Some validations are conditional based on other field values (e.g., `businessAddressSameAsController`).
