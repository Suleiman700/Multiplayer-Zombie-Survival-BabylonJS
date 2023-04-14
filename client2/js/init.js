

import Game from './Game.js';
Game.initCanvas()
Game.createDefaultEngine()

import Scene from './Scene.js';
Scene.initScene()
Scene.createScene('MAP_01')

import Camera from './Camera.js';
Camera.initCamera()

import Loader from './Loader.js';
await Loader.loadWeapons()

// Environment
import Sky from './Environment/Sky.js';
Sky.initSky()

// register events
import MovementEvent from './events/MovementEvent.js';
import Players from './Players.js';
MovementEvent.register()

import Socket from './socket/Socket.js';
Socket.connect()

import Keys from './Keys.js';
import ModMenu from './ModMenu.js';
import Updater from './Updater.js';


var startRenderLoop = function (_engine, _canvas, _scene) {
    _engine.runRenderLoop(function () {
        if (_scene && _scene.activeCamera) {
            Scene.getScene().render();
            // Updater.runUpdater()

            // draw players
            // Players.drawPlayers()
        }
    });
}

window.initFunction = async function() {
    var asyncEngineCreation = async function() {
        try {
            return Game.createDefaultEngine()
            // return createDefaultEngine();
        } catch(e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return Game.createDefaultEngine()
            // return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
    if (!Game.getEngine()) throw 'engine should not be null.';
    startRenderLoop(Game.getEngine(), Game.getCanvas(), Scene.getScene());
    // window.scene = Scene.getScene()

    // register canvas keys
    Keys.registerKeys()
};

// initFunction().then(() => {sceneToRender = scene});
initFunction().then();

// Resize
window.addEventListener("resize", function () {
    Game.getEngine().resize();
});