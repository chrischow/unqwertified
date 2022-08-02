import { useMemo, useState, useRef } from "react";
import useTypingGame from "react-typing-game-hook";
import Button from "react-bootstrap/Button";
import translateText from "../../helpers/translateText";
import './TypingView.css';

export default function TypingView(props) {
  // State
  const letterElements = useRef(null);
  const [focused, setFocused] = useState(false);

  // Configure text
  let textTransposed = translateText(props.text, props.layout);

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
    <div className="mt-5">
      {props.layout !== 'QWERTY' && phase !== 2 && 
        <>
          <div className="mt-5">
            <h3>{props.layout} output:</h3>
          </div>
          <div className="typing-test mt-3">
            <div className="text-display">
              {phase !== 2 && props.text.split("").map((char, index) => {
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
      {phase !== 2 && <div className="true-text-header mt-5">
        <h3>{props.layout === 'QWERTY' ? "Type:" : `${props.layout} using QWERTY:`}</h3>
      </div>}
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
        {phase !== 2 && <div className="main-text">
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
        </div>}
      </div>
      {phase === 2 &&
        <div className="text-center mt-5">
          <h3>And you're done!</h3>
          <p>How was the {props.layout} layout?</p>
          <Button variant="outline-light" onClick={() => resetTyping()}>Restart</Button>
        </div>
      }
    </div>

  );
}