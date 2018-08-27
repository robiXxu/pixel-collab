import React from 'react'
import Pixel from './Pixel';

const pixelSize = 10;
class Pixels extends React.PureComponent {
  render() {
    return (
      <div>
        {
          this.props.pixels && this.props.pixels.length ? 
            this.props.pixels.map(p => (
              <Pixel key={p.id} style={{
                position: 'fixed',
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: `${pixelSize}px`,
                height: `${pixelSize}px`,
                backgroundColor: `rgba(${p.color.r},${p.color.g},${p.color.b},${p.color.a})`
              }}/>
            )) : 
            null
        }
      </div>
    )
  }
}

export default Pixels;