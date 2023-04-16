
class GUI {
    #UI_roundCountLblId = 'round-number' // display the number of round
    #UI_playerHealth = 'UI-player-health' // display player health
    #UI_reloadingIndicator = 'UI-reloading-indicator'
    #UI_playerMoney = 'ui-player-money' // display player money

    constructor() {}

    /**
     * set round number UI text
     * @param _roundNumber {string|number} example: 1
     */
    UI_setRoundNumber(_roundNumber) {
        document.querySelector(`#${this.#UI_roundCountLblId}`).innerHTML = _roundNumber
    }

    /**
     * set player health in UI
     * @param _playerHealth {number} example: 87.4
     * @constructor
     */
    UI_setPlayerHealth(_playerHealth) {
        document.querySelector(`#${this.#UI_playerHealth}`).style.width = _playerHealth + '%'
    }

    /**
     * set player coords in UI
     * @param _x {number}
     * @param _y {number}
     * @param _z {number}
     * @constructor
     */
    UI_setPlayerCoords(_x, _y, _z) {
        document.querySelector('#player-coords-x').innerHTML = _x.toFixed(3)
        document.querySelector('#player-coords-y').innerHTML = _y.toFixed(3)
        document.querySelector('#player-coords-z').innerHTML = _z.toFixed(3)
    }

    /**
     * set ammo in UI
     * @param _weaponMagSize {number} example: 30
     * @param _weaponAmmoCapacity {number} example: 180
     * @constructor
     */
    UI_setAmmo(_weaponMagSize, _weaponAmmoCapacity) {
        document.querySelector('#ui-weapon-ammo').innerHTML = `${_weaponMagSize}/${_weaponAmmoCapacity}`
    }

    /**
     * show or hide reloading text
     * @param _option {boolean}
     */
    UI_showReloadingText(_option) {
        document.querySelector(`#${this.#UI_reloadingIndicator}`).style.display = _option?'flex':'none'
    }

    /**
     * set money UI
     * @param _money {number} example: 150.65
     * @constructor
     */
    UI_setMoney(_money) {
        document.querySelector(`#${this.#UI_playerMoney}`).innerHTML = _money
    }

    /**
     * set the wall shop buy text (Hold X to buy X for $X)
     * @param _visible {boolean} show or hide the UI text
     * @param _buyKey {string} example: F
     * @param _itemName {string} example: AKM
     * @param _itemCost {number} example: 500
     * @constructor
     */
    UI_setWallShopBuyText(_visible, _buyKey, _itemName, _itemCost) {
        document.querySelector('#UI-hold-f-to-buy').style.display = _visible? 'flex':'none'
        document.querySelector('#UI-hold-f-to-buy #KEYBINDINGS_BUY_WEAPON').innerHTML = _buyKey
        document.querySelector('#UI-hold-f-to-buy #item-to-buy').innerHTML = _itemName
        document.querySelector('#UI-hold-f-to-buy #item-cost').innerHTML = _itemCost
    }
}

export default new GUI()