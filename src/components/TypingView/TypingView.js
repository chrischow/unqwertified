import { useMemo, useState, useRef, useEffect } from "react";
import useTypingGame from "react-typing-game-hook";
import translateText from "../../helpers/translateText";
import './TypingView.css';

export default function TypingView(props) {
  // State
  const letterElements = useRef(null);
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    setText(props.text);
  }, [props.text]);

  // Configure text
  const textTransposed = translateText(text, props.layout);

  // Create game object
  const {
    states: {
      charsState,
      // length,
      currIndex,
      // currChar,
      // correctChar,
      phase,
      // startTime,
      // endTime
    },
    actions: { insertTyping, resetTyping, deleteTyping }
  } = useTypingGame(textTransposed, {
    skipCurrentWordOnSpace: false,
    pauseOnError: true
  });

  // Handle keydowns
  const handleKey = (key) => {
    if (key === 'Escape') {
      resetTyping();
    } else if (key === 'Backspace') {
      deleteTyping(false);
    } else if (key.length === 1) {
      insertTyping(key)
    } else if (key === 'F2') {
      props.getText("shortText");
    } else if (key === 'F3') {
      props.getText("mediumText");
    } else if (key === 'F4') {
      props.getText("longText");
    }
  };

  // Set cursor
  const pos = useMemo(() => {
    if (currIndex !== -1 && letterElements.current) {
      let spanref = letterElements.current.children[currIndex];
      let left = spanref.offsetLeft + spanref.offsetWidth - 2;
      let top = spanref.offsetTop - 1;
      return { left, top };
    } else {
      return {
        left: 20,
        top: 20
      };
    }
  }, [currIndex]);

  return (
    <div className="mt-3">
      {props.layout !== 'QWERTY' &&
        <>
          <div className="mt-3">
            <h3>{props.layout} output:</h3>
          </div>
          <div className="typing-test mt-3">
            <div className="text-display">
              {props.text.split("").map((char, index) => {
                let state = charsState[index];
                let color = state === 0 ? "var(--light-grey-d5)" : state === 1 ? "var(--green)" : "var(--red)";
                return (
                  <span key={char + index}
                    style={{ color }}
                    className={currIndex + 1 === index ? "curr-letter" : ""}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
        </>
      }
      <div className="true-text-header mt-4">
        <h3>
          Type here:
          {props.layout !== 'QWERTY' &&
            <code style={{ marginLeft: "25px", color: "var(--bs-code-color)", fontSize: "1.2rem" }}>
              [{props.layout} mapped to QWERTY]
            </code>
          }
        </h3>
      </div>
      <div
        className="typing-test mt-3"
        onKeyDown={event => {
          handleKey(event.key);
          event.preventDefault();
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        tabIndex={0}
      >
        <div className="main-text">
          <div ref={letterElements} tabIndex={0}>
            {textTransposed.split("").map((char, index) => {
              let state = charsState[index];
              let color = state === 0 ? "var(--light-grey-l3)" : state === 1 ? "#27DDCB" : "#FF5364";
              return (
                <span key={char + index}
                  style={{ color }}
                  className={currIndex + 1 === index ? "curr-letter" : ""}
                >
                  {char}
                </span>
              );
            })}
          </div>
          {phase !== 2 && focused && <div
            style={{
              position: "absolute",
              left: pos.left,
              top: pos.top
            }}
            className="caret"
          >
            &nbsp;
          </div>}
        </div>
      </div>
      {phase === 2 &&
        <div className="text-center mt-4">
          <h3 style={{ color: "#27ddcb" }}>And you're done!</h3>
          <p>
            Hit <code>ESC</code> to restart, or <code style={{ color: "var(--green-d2)" }}>F2</code> / <code style={{ color: "var(--purple)" }}>F3</code> / <code>F4</code> to get new text.
          </p>
        </div>
      }
    </div>

  );
}