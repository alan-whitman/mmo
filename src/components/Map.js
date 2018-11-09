import React, { Component } from 'react';
import './Map.css';
import { requestNewPlayer, updatePlayerPos, updatePlayers } from '../socket/socket';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapWidth: 30,
            mapHeight: 30,
            mapGrid: [],
            player: {
                name: this.props.playerName,
                posx: 0,
                posy: 0,
                id: -1
            },
            otherPlayers: [],
            canMove: true,
            canRender: true
        }
        requestNewPlayer(this.props.playerName, (err, newPlayerData) => {
            this.setState({player: {...this.state.player, posx: newPlayerData.posx, posy: newPlayerData.posy, id: newPlayerData.id}, mapGrid: newPlayerData.map})
        });
        updatePlayers((err, players) => {
            this.setState({otherPlayers: players});
        });
        this.renderPlayer = this.renderPlayer.bind(this);
        this.renderMap = this.renderMap.bind(this);
        this.handleMovement = this.handleMovement.bind(this);
    }
    handleMovement(key) {
        if (!this.state.canMove)
            return;
        const { mapWidth, mapHeight, mapGrid } = this.state;
        const { posx, posy } = this.state.player;
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
        if (potentialx === -1 || potentialy === -1) {
            return;
        }
        else if (potentialx >= 0 && potentialx < mapWidth && potentialy >= 0 && potentialy < mapHeight) {
            if (mapGrid[potentialx][potentialy] === 0 ) {
                    this.setState({player: {...this.state.player, posx: potentialx, posy: potentialy}});
            }
        }
        updatePlayerPos(this.state.player);
        // this.state.canMove = false;
        // setTimeout(() => this.setState({canMove: true}), 200)
    }
    renderPlayer() {
        const { posx, posy } = this.state.player;
        return <div className="player" style={{left: posx * 20 + 2, top: posy * 20 + 2}}></div>

    }
    renderOtherPlayers() {
        let players = [];
        this.state.otherPlayers.forEach((player, i) => {
            if (i === this.state.player.id)
                return;
            const { posx, posy } = player;
            players.push(<div className="player" style={{left: posx * 20 + 2, top: posy * 20 + 2}}></div>)
        })
        return players;

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
                <div>You are {this.state.player.name}. Your player id is {this.state.player.id}</div>
                <div className="map" tabIndex="0" onKeyDown={e => this.handleMovement(e.key)}>
                    {this.state.mapGrid[0] ? this.renderMap() : false}
                    {this.renderPlayer()}
                    {this.renderOtherPlayers()}
                </div>
            </div>
        )
    }
}


export default Map;