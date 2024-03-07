import chalk from "chalk";
import figlet from "figlet";
import { introText } from "./introText.js";

export function unicornAscii() {
  // Unicorn ASCII art
  const unicornAscii = chalk.magenta(`
                               /                      /
                          ,.. /                  ,.. /
                        ,'   ';                ,'   ';
             ,,.__    _,' /';  .    ,,.__    _,' /';  .
            :','  ~~~~    '. '~    :','  ~~~~    '. '~
           :' (   )         ):,   :' (   )         )::,
           '. '. .=----=..-~ .;'  '. '. .=----=..-~  .;'
            '  ;' ::    ':. '"     '  ;'  ::   ':.  '"
              (:  ':     ;)          (:   ':    ;)
               \\  '"   ./            \\   '"  ./
                '"      '"             '"      '"
`);
  console.log(
    chalk.magenta(
      figlet.textSync("UnicornCoder!", {
        font: "speed",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 200,
        whitespaceBreak: false,
      })
    )
  );
  console.log(unicornAscii);
  console.log(introText);
  return '';
}
