import React from 'react';

class Pixel extends React.PureComponent {
  render() {
    return (
      <div { ...this.props }>        
      </div>
    );
  }
}

export default Pixel;