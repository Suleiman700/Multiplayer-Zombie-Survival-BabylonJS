

import Game from './Game.js';
import Scene from './Scene.js';
import Camera from './Camera.js';
import Loader from './Loader.js';
import Sky from './Environment/Sky.js';
import Socket from './socket/Socket.js';
import Keys from './Keys.js';
import ModMenu from './ModMenu.js';
import Updater from './Updater.js';
import AKM from './weapons/AKM.js';
import MovementEvent from './events/MovementEvent.js';
import Players from './Players.js';

Game.initCanvas()
Game.createDefaultEngine()

Scene.initScene()
await Loader.loadWeapons()
Scene.createScene('MAP_01')

await Loader.loadWeapons()
Camera.initCamera()


// Environment
Sky.initSky()

// register events
MovementEvent.register()

Socket.connect()


Keys.registerKeys()

var startRenderLoop = function (_engine, _canvas, _scene) {
    _engine.runRenderLoop(function () {
        if (_scene && _scene.activeCamera) {
            Scene.getScene().render();
            Updater.runUpdater()

            // draw players
            Players.drawPlayers()
        }
    });
}

startRenderLoop(Game.getEngine(), Game.getCanvas(), Scene.getScene());

// Resize
window.addEventListener("resize", function () {
    Game.getEngine().resize();
});




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
    // Keys.registerKeys()
};

// initFunction().then(() => {sceneToRender = scene});
// initFunction();

