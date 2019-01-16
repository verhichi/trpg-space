import React, { Component } from 'react';
import { connect } from 'react-redux';

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './charDot.scss';

// Redux Map State To Prop
const mapStateToProps = (state) => {
  return { id: state.id };
};

class CharDot extends Component {

  constructor (props){
    super(props);
    this.handleDragStart = this.handleDragStart.bind(this, this.props.charData.charId);
  }

  handleDragStart (charId, e){
    e.dataTransfer.setData('charId', charId);
  }

  render() {
    const isOwnCharacter = this.props.id === this.props.charData.ownerId;
    const toggleGrabClass = isOwnCharacter ? 'cursor-grabbable' : '';

    const showName = this.props.charData.general.privacy <= 1 || this.props.charData.ownerId === this.props.id;
    const showStat = this.props.charData.general.privacy <= 0 || this.props.charData.ownerId === this.props.id;

    const charName = showName ? this.props.charData.general.name : 'UNKNOWN';

    const statList = this.props.charData.status.map(status => {
      if (status.type === 'value'){
        return(<div className="font-size-sm one-line-ellipsis">{status.label}: {showStat ? status.value : '???'}</div>);
      } else {
        return(<div className="font-size-sm one-line-ellipsis">{status.label}: {showStat ? status.value : '???'} / {showStat ? status.maxValue : '???'}</div>);
      }
    });

    return (
      <div className={`map-char p-relative ${toggleGrabClass}`} draggable={isOwnCharacter} onDragStart={this.handleDragStart} style={{backgroundColor: this.props.charData.general.color, left: this.props.charData.map.x, top: this.props.charData.map.y}}>
        <div className="map-char-balloon p-absolute p-1 align-left cursor-default">
          <div className="font-size-md font-weight-bold pb-1 one-line-ellipsis">{charName}</div>
          { statList }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CharDot);
