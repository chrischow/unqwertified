import { useState, useEffect } from "react";
import TypingView from "./components/TypingView/TypingView";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { data } from "./data";

function App() {
  // State
  const [kbLayout, setKbLayout] = useState('Dvorak');
  const [text, setText] = useState('');
  const [textType, setTextType] = useState('');

  // Randomise texts
  const getText = (textPref) => {
    const nTexts = data[textPref].length;
    const randomIdx = Math.floor(Math.random() * nTexts);
    setTextType(textPref);
    setText(data[textPref][randomIdx]);
  }

  // Initialise texts
  useEffect(() => {
    getText('shortText');
  }, []);

  const kbLayouts = [
    { value: 'QWERTY', label: 'QWERTY' },
    { value: 'Dvorak', label: 'Dvorak' },
    { value: 'Colemak', label: 'Colemak' },
    { value: 'QWYRFM', label: 'Carpalx QWYRFM' },
    { value: 'QGMLWY', label: 'Carpalx QGMLWY' },
  ];

  return (
    <Container className="main mb-5">
      <div className="text-center">
        <h1>UNQWERTIFIED</h1>
      </div>
      <div className="info-panel text-center mt-4">
        <p>
          Randomise the text, choose a layout, click into the typing window, and start typing.
          <br />
          Reset (<code>ESC</code>) if you need to.
        </p>
      </div>
      <div className="justify-content-center d-flex mt-3">
        <Button className="btn-green" onClick={() => getText('shortText')}>
          Short Text (<code style={{ color: "var(--green-d2)" }}>F2</code>)
        </Button>
        <Button className="btn-purple" onClick={() => getText('mediumText')} style={{ marginLeft: "10px" }}>
          Medium Text (<code style={{ color: "var(--purple)" }}>F3</code>)
        </Button>
        <Button className="btn-red" onClick={() => getText('longText')} style={{ marginLeft: "10px" }}>
          Long Text (<code>F4</code>)
        </Button>
      </div>
      <Row className="justify-content-center mt-3">
        <Col xs={6} xl={4}>
          <Form.Select
            id="layout-select"
            onChange={event => setKbLayout(event.target.value)}
            value={kbLayout}
          >
            <option value="" disabled>Select a keyboard layout...</option>
            {kbLayouts.map(item => {
              return <option key={`select-${item.value}`} value={item.value}>{item.label}</option>
            })}
          </Form.Select>
        </Col>
      </Row>
      {text &&
        <TypingView
          layout={kbLayout}
          text={text}
          getText={getText}
          textType={textType}
        />
      }
    </Container>
  );
}

export default App;
