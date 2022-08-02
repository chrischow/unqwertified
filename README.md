# UNQWERTIFIED
UNQWERTIFIED is a simple React app to let users try out several different keyboard layouts. It implements [Hanggjun Cho's (2014) proposed method](https://s-space.snu.ac.kr/handle/10371/123098) for overcoming the difficult of comparing QWERTY and Dvorak layouts on users who are equally skilled in QWERTY and Dvorak.

## Keyboard Layouts

1. QWERTY
2. [Dvorak](https://en.wikipedia.org/wiki/Dvorak_keyboard_layout)
3. [Colemak](https://colemak.com/)
4. [Carpalx QWYRFM](http://mkweb.bcgsc.ca/carpalx/?partial_optimization)
5. [Carpalx QGMLWY](http://mkweb.bcgsc.ca/carpalx/?full_optimization)

## Cho's Method
Cho employed a character mapping method to transfer the user's knowledge of the familiar layout (QWERTY) to the new layout (Dvorak). He provides the example:

$$ f_{QWERTY}^{-1}(f_{Dvorak}(``computer")) = ``ismrfkdo"$$

Typing `ismrfkdo` in QWERTY would be equivalent to typing `computer` on a Dvorak keyboard. Using the nested function above, participants would not need to know Dvorak to type the same words on a keyboard.

Cho also applied a transformation to the QWERTY layout to remove the familiarity advantage in typing normal words using QWERTY. This was not implemented in UNQWERTIFIED since we are not comparing typing speed on QWERTY with the alternative layouts.


## References
H. Cho, [Comparing QWERTY and Dvorak Keyboard Speed: a Pilot Study](https://s-space.snu.ac.kr/handle/10371/123098) (2014).