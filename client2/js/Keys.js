
import Game from './Game.js';
import Scene from './Scene.js';
import Player from './Player.js';

class Keys {
    #debug = true

    constructor() {
    }

    registerKeys() {
        const canvas = Game.getCanvas()
        /*
            use the bind() method to bind the 'this' keyword inside the method to the Keys class instance.
            without .bind(this) when using 'this' keyword in #onKeyDown or #onKeyUp will be canvas class
         */
        canvas.addEventListener('keydown', this.#onKeyDown.bind(this), false);
        canvas.addEventListener('keyup', this.#onKeyUp.bind(this), false);

        const scene = Scene.getScene()
        scene.onDispose = () => {
            canvas.removeEventListener('keydown', this.#onKeyDown);
            canvas.removeEventListener('keyup', this.#onKeyUp);
        }
    }

    #onKeyDown(_event) {
        switch (_event.keyCode) {
            case 49: // 1
                if (this.#debug) console.log('selected primary weapon')
                break
            case 50: // 2
                if (this.#debug) console.log('selected secondary weapon')
                break
            case 16: // shift
                if (this.#debug) console.log('is sprinting')
                Player.isSprinting(true)
                break
            case 32: // space
                if (this.#debug) console.log('is jump')
                break
        }
    }

    #onKeyUp(_event) {
        switch (_event.keyCode) {
            case 16: // shift
                if (this.#debug) console.log('is not sprinting')
                Player.isSprinting(false)
                break
            case 32: // space
                if (this.#debug) console.log('not jumping')
                break
        }
    }
}

export default new Keys()