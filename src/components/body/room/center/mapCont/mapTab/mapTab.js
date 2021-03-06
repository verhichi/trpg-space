import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPE_CONFIRM, MODAL_TYPE_NEW_MAP, MODAL_TYPE_EDIT_MAP, MODAL_TYPE_IMPORT_MAP } from '../../../../../../constants/constants';
import { showModal, hideModal } from '../../../../../../redux/actions/modal';
import { removeMap } from '../../../../../../redux/actions/map';
import { removeAllCharFromSelMap } from '../../../../../../redux/actions/mapChar';
import { setDisplayMap } from '../../../../../../redux/actions/display';
import socket from '../../../../../../socket/socketClient';
import jszip from 'jszip'
import { saveAs } from 'file-saver';
import { createMapModalTitle, editMapModalTitle, importMapModalTitle, deleteMapMessage } from './mapTab.i18n'

// Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import './mapTab.scss';

// Redux Map State to Props
const mapStateToProps = (state) => {
  return {
    displaySetting: state.displaySetting,
    global:         state.global,
    mapList:        state.mapList,
    geoList:        state.geoList
  };
};

// Redux Map Dispatch To Props
const mapDispatchToProps = (dispatch) => {
  return {
    setDisplayMap:           (mapId)                => dispatch(setDisplayMap(mapId)),
    hideModal:               ()                     => dispatch(hideModal()),
    removeMap:               (mapId)                => dispatch(removeMap(mapId)),
    showModal:               (modalType, modalProp) => dispatch(showModal(modalType, modalProp)),
    removeAllCharFromSelMap: (mapId)                => dispatch(removeAllCharFromSelMap(mapId))
  };
};

class MapTab extends Component {
  constructor (props){
    super(props);

    this.mapTabWrapRef          = React.createRef();
    this.handleRightScrollClick = this.handleRightScrollClick.bind(this);
    this.handleLeftScrollClick  = this.handleLeftScrollClick.bind(this);
    this.handleTouchMove        = this.handleTouchMove.bind(this);
    this.handleNewMapClick      = this.handleNewMapClick.bind(this);
    this.handleImportClick      = this.handleImportClick.bind(this);
  }

  createExportFile (mapData){
    const file = new Blob([JSON.stringify({
      mapData: {
        ownerId: '',
        mapId: '',
        src: mapData.src,
        name: mapData.name,
        fileName: mapData.fileName,
        private: mapData.private
      },
      geoList: this.props.geoList.filter(geo => geo.mapId === mapData.mapId).map(geo => {
        return {
          ...geo,
          mapId: ''
        }
      })
    })], {type: 'application/json'});
    const zip = jszip().file(`map_${mapData.name}.json`, file)
    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, `map_${mapData.name}.zip`)
    })
  }

  handleImportClick (){
    this.props.showModal(MODAL_TYPE_IMPORT_MAP, {
      title:        importMapModalTitle[this.props.global.lang],
      displayClose: true
    });
  }

  handleTabClick (e, mapId){
    e.stopPropagation();
    this.props.setDisplayMap(mapId);
  }

  handleNewMapClick (e){
    e.stopPropagation();

    this.props.showModal(MODAL_TYPE_NEW_MAP, {
      title:        createMapModalTitle[this.props.global.lang],
      displayClose: true
    });
  }

  handleLeftScrollClick (e){
    this.mapTabWrapRef.current.scrollLeft -= 175;
  }

  handleRightScrollClick (e){
    this.mapTabWrapRef.current.scrollLeft += 175;
  }

  handleEditMapClick (e, mapId){
    e.stopPropagation();

    this.props.showModal(MODAL_TYPE_EDIT_MAP, {
      title:        editMapModalTitle[this.props.global.lang],
      displayClose: true,
      mapId
    });
  }

  handleRemoveMapClick (e, mapId){
    e.stopPropagation();

    this.props.showModal(MODAL_TYPE_CONFIRM, {
      title:        '',
      displayClose: false,
      confirmText:  deleteMapMessage[this.props.global.lang],
      accept: [
        this.props.setDisplayMap.bind(this, ''),
        this.props.removeAllCharFromSelMap.bind(this, mapId),
        this.props.removeMap.bind(this, mapId),
        socket.emit.bind(socket, 'delMap', this.props.global.roomId, mapId),
        this.props.hideModal
      ],
      decline:      this.props.hideModal
    });
  }

  handleTouchMove (e){
    e.stopPropagation();
  }

  render() {
    const mapTabList = this.props.mapList.map(mapTab => {
    const activeClass = this.props.displaySetting.displayMap === mapTab.mapId
                          ? 'is-active'
                          : '';
      return (
        <div className={`map-tab p-1 d-flex f-align-items-center cursor-pointer ${activeClass}`} key={mapTab.mapId} onClick={e => this.handleTabClick(e, mapTab.mapId)}>
          <div className="map-tab-name f-grow-1 one-line-ellipsis">{mapTab.name}</div>
          {this.props.global.id === mapTab.ownerId &&
            (<div className="map-tab-btn mr-1 ml-1" onClick={e => this.handleEditMapClick(e, mapTab.mapId)}>
              <FontAwesomeIcon icon="pen-square"/>
            </div>)}
          {this.props.global.id === mapTab.ownerId &&
            (<div className="map-tab-btn mr-1 ml-1" onClick={() => this.createExportFile(mapTab)}>
              <FontAwesomeIcon icon="file-export"/>
            </div>)}
          {this.props.global.id === mapTab.ownerId &&
            (<div className="map-tab-btn mr-1 ml-1" onClick={e => this.handleRemoveMapClick(e, mapTab.mapId)}>
              <FontAwesomeIcon icon="window-close"/>
            </div>)}
        </div>
      );
    });

    return (
      <div className="map-tab-cont d-flex">
        <div className="map-tab-new btn-hot p-1 f-shrink-0 align-center cursor-pointer" onClick={this.handleNewMapClick}>
          <FontAwesomeIcon icon="plus"/>
        </div>
        <div className="map-tab-new p-1 btn-hot f-shrink-0 align-center cursor-pointer" onClick={this.handleImportClick}>
          <FontAwesomeIcon icon="file-import"/>
        </div>
        <div className="map-tab-scroll p-1 f-shrink-0 align-center cursor-pointer" onClick={this.handleLeftScrollClick}>
          <FontAwesomeIcon icon="angle-left"/>
        </div>
        <div className="map-tab-wrap d-flex f-grow-1" onTouchMove={this.handleTouchMove} ref={this.mapTabWrapRef}>
          { mapTabList }
        </div>
        <div className="map-tab-scroll p-1 f-shrink-0 align-center cursor-pointer" onClick={this.handleRightScrollClick}>
          <FontAwesomeIcon icon="angle-right"/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapTab);
