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
  const [kbLayout, setKbLayout] = useState('QWERTY');
  const [text, setText] = useState()

  // Randomise texts
  const getText = (textType) => {
    const nTexts = data[textType].length;
    const randomIdx = Math.floor(Math.random() * nTexts);
    return data[textType][randomIdx];
  }

  // Initialise texts
  useEffect(() => {
    setText(getText('shortText'));
  }, []);

  const kbLayouts = [
    {value: 'QWERTY', label: 'QWERTY'},
    {value: 'Dvorak', label: 'Dvorak'},
    {value: 'Colemak', label: 'Colemak'},
    {value: 'QWYRFM', label: 'Carpalx QWYRFM'},
    {value: 'QGMLWY', label: 'Carpalx QGMLWY'},
  ];

  return (
    <Container className="main mb-5">
      <div className="text-center">
        <h1>UNQWERTIFIED</h1>
      </div>
      <div className="info-panel text-center mt-4">
        <p>Randomise the text, choose a layout, click into the typing window, and start typing.</p>
        <p>Hit <code>ESC</code> to restart the sequence.</p>
      </div>
      <div className="justify-content-center d-flex mt-3">
        <Button className="btn-green" onClick={() => setText(getText('shortText'))}>Short Text</Button>
        <Button className="btn-purple" onClick={() => setText(getText('mediumText'))} style={{marginLeft: "10px"}}>Medium Text</Button>
        <Button className="btn-red" onClick={() => setText(getText('longText'))} style={{marginLeft: "10px"}}>Long Text</Button>
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
      {text && <TypingView layout={kbLayout} text={text} />}
    </Container>
  );
}

export default App;
