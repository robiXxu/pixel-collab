import React from 'react';
import Github from 'react-color/lib/components/github/Github';
import { pixelsdb, setPixel } from './Firebase';
import Pixels from './Pixels';


class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showColorPicker: false,
      pixels: props.pixels || [],
      selectedPixel: {
        x: 0,
        y: 0,
        color: null
      }
    };
  }

  componentDidMount = () => {
    this.listenForPixels();
  }

  listenForPixels = () => {
    pixelsdb.on('child_added', (data) => {
      const found = this.state.pixels.filter(p => p.id === data.key);
      if(found.length === 0){
        this.setState((prevState) => ({
          pixels: [
            ...prevState.pixels,
            { 
              id: data.key,
              ...data.val()
            }
          ]
        }))
      }
    })
  }

  _addPicker = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    this.setState((prevState) => ({
      showColorPicker: true,
      selectedPixel: {
        x,
        y,
        color: null
      }
    }));
  }

  _removePicker = (e) => {
    this.setState(() => ({
      showColorPicker: false,
      selectedPixel: {
        x: 0,
        y: 0,
        color: null
      }
    }));
  }

  _getPickerStyle = () => {
    const padding = 15;
    const style = {
      position: 'fixed',
      top: `${(this.state.selectedPixel.y + padding)}px`,
      left: `${(this.state.selectedPixel.x - padding)}px`,
    }
    return style;
  }

  _pickColor = (color) => {
    const pixel = this.state.selectedPixel;
    pixel.color = color.rgb;
    setPixel(pixel);
  }

  render() {
    return (
      <div
        className="container"
        onDoubleClick={ this._addPicker }
        onClick={ this._removePicker }>
        {
          this.state.showColorPicker ? (
            <div style={ this._getPickerStyle() } >
              <Github onChange={ this._pickColor }/>
            </div>
          ) : null
        }
        {
          <Pixels pixels={ this.state.pixels } />
        }
      </div>
    );
  }
}

export default App;
