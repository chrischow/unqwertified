# UNQWERTIFIED
UNQWERTIFIED is a simple React app to let users try out several different keyboard layouts without any prior training in each specific layout. It implements [Hanggjun Cho's (2014)](https://s-space.snu.ac.kr/handle/10371/123098) method of transposing the keys from alternative layouts to QWERTY.

## How It Works

### 1. Randomise Text
Some random facts are generated based on the list from the [`randfacts`](https://github.com/TabulateJarl8/randfacts) Python module. Your options:

- Short: 30 to 70 characters
- Medium: 90 to 120 characters
- Long: 140+ characters

### 2. Choose a Layout
There are several choices for alternative layouts to test. If you've never typed with these layouts before, don't fret. The pieces of text will be translated from each alternative layout to QWERTY.

1. [Dvorak](https://en.wikipedia.org/wiki/Dvorak_keyboard_layout)
2. [Colemak](https://colemak.com/)
3. [Carpalx QWYRFM](http://mkweb.bcgsc.ca/carpalx/?partial_optimization)
4. [Carpalx QGMLWY](http://mkweb.bcgsc.ca/carpalx/?full_optimization)

You will type gibberish, but you'll get a feel of what it's like to type on the provided alternative layouts.

## Cho's Method
Cho employed a character mapping method to transfer the user's knowledge of the familiar layout (QWERTY) to the new layout (Dvorak). He provides the example:

$$ f_{QWERTY}^{-1}(f_{Dvorak}(``computer")) = ``ismrfkdo"$$

Typing `ismrfkdo` in QWERTY would be equivalent to typing `computer` on a Dvorak keyboard. Using the nested function above, participants would not need to know Dvorak to type the same words on a keyboard.

Cho also applied a transformation to the QWERTY layout to remove the familiarity advantage in typing normal words using QWERTY. This was not implemented in UNQWERTIFIED since we are not comparing typing speed on QWERTY with the alternative layouts.


## References
H. Cho, [Comparing QWERTY and Dvorak Keyboard Speed: a Pilot Study](https://s-space.snu.ac.kr/handle/10371/123098) (2014).