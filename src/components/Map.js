import React, { Component } from 'react';
import './Map.css';

class Map extends Component {
    constructor() {
        super();
        this.state = {
            mapWidth: 30,
            mapHeight: 30,
            posx: 0,
            posy: 0,
            mapGrid: []
        }
        this.renderPlayer = this.renderPlayer.bind(this);
        this.renderMap = this.renderMap.bind(this);
        this.handleMovement = this.handleMovement.bind(this);
        this.generateMap = this.generateMap.bind(this);
    }
    componentDidMount() {
        this.generateMap();
    }
    handleMovement(key) {
        const { posx, posy, mapWidth, mapHeight, mapGrid } = this.state;
        let potentialx = -1;
        let potentialy = -1;
        switch (key) {
            case 'ArrowLeft':
                potentialx = posx - 1;
                potentialy = posy;
                break;
            case 'ArrowRight':
                potentialx = posx + 1;
                potentialy = posy;
                break;
            case 'ArrowUp':
                potentialx = posx;
                potentialy = posy - 1;
                break;
            case 'ArrowDown':
                potentialx = posx;
                potentialy = posy + 1;
                break;
            default:
                return;
        }
        // && potentialx > 0 && potentialy > 0 && potentialx < mapWidth && potentialy < mapHeight
        if (!mapGrid[potentialx][potentialy])
            this.setState({posx: potentialx, posy: potentialy});
        else
            return;

    }
    generateMap() {
        console.log('generating map...');
        let mapGrid = [];
        let rand = 0;
        for (let column = 0; column < this.state.mapHeight; column++) {
            mapGrid[column] = [];
            for (let row = 0; row < this.state.mapWidth; row++) {
                rand = Math.random() * 100;
                mapGrid[column][row] = rand < 10 ? 1 : 0;
            }
        }
        this.setState({mapGrid});
    }
    renderPlayer() {
        const { posx, posy } = this.state;
        return <div className="player" style={{left: posx * 20 + 2, top: posy * 20 + 2}}></div>
    }
    renderMap() {
        const { mapGrid: mg } = this.state;
        let whichStyle = 'mapTileEmpty';
        let mapGrid = [];
        for (let column = 0; column < this.state.mapHeight; column++) {
            mapGrid[column] = [];
            for (let row = 0; row < this.state.mapWidth; row++) {
                whichStyle = mg[row][column] ? 'mapTileFilled' : 'mapTileEmpty'
                mapGrid[column][row] = <div key={'' + column + row} style={{left: row * 20, top: column * 20}} className={whichStyle} />;
            }
        }
        return mapGrid;
    }
    render() {
        return (
            <div className="Map">
                <div className="map" tabIndex="0" onKeyDown={e => this.handleMovement(e.key)}>
                    {this.state.mapGrid[0] ? this.renderMap() : false}
                    {this.renderPlayer()}
                </div>
            </div>
        )
    }
}


export default Map;