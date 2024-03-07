// unicornAscii.test.js
import {unicornAscii} from "./../unicornAscii.js";

test("unicornAscii returns a string", () => {
  const result = unicornAscii();
  expect(typeof result).toBe("string");
});
