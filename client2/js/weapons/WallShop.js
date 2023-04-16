import AKM from './AKM.js';
import Scene from '../Scene.js';
import Camera from '../Camera.js';
import GUI from '../GUI.js';
import ClientPlayer from '../ClientPlayer.js';

export default class WallShop {
    #showBounding = true

    /**
     * @param _shopPosition {object} example: {x: 23, y: 0, z: 95}
     * @param _shopMeasurement {object} example: {width: 5, height: 15, depth: 7}
     * @param _itemCost {number} the cost of the item
     * @param _itemPosition {object} example: {x: 23, y: 0, z: 95}
     * @param _itemRotation {object} example: {x: 0, y: 0, z: 0}
     * @param _itemInstance
     */
    constructor(_shopPosition, _shopMeasurement, _itemInstance, _itemCost, _itemPosition, _itemRotation) {
        const weaponClone = AKM.MODEL_weaponModel.clone("AKM Clone");
        weaponClone.position.x = _itemPosition.x
        weaponClone.position.y = _itemPosition.y
        weaponClone.position.z = _itemPosition.z

        weaponClone.rotation.x = _itemRotation.x
        weaponClone.rotation.y = _itemRotation.y
        weaponClone.rotation.z = _itemRotation.z

        // weaponClone.isWallShop = true
        // weaponClone.id = 'test'


        // create a transparent box mesh
        var shopBox = BABYLON.MeshBuilder.CreateBox("box", _shopMeasurement, Scene.getScene());
        shopBox.material = new BABYLON.StandardMaterial("boxMaterial", Scene.getScene());
        shopBox.material.alpha = this.#showBounding? 0.5:0.0;
        shopBox.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        shopBox.position.x = _shopPosition.x;
        shopBox.position.y = _shopPosition.y;
        shopBox.position.z = _shopPosition.z;
        shopBox.isWallShop = true;

        // create a bounding box around the box mesh
        var boundingBox = shopBox.getBoundingInfo().boundingBox;


        // check if player is within the bounding box continuously
        let isPlayerAtWallShop = false;

        Scene.getScene().registerBeforeRender(() => {
            var player = Scene.getScene().activeCamera.position;

            if (boundingBox.intersectsPoint(player)) {
                if (!isPlayerAtWallShop) {
                    // player has entered the bounding box
                    GUI.UI_setWallShopBuyText(true, 'F', _itemInstance.name, _itemCost);

                    ClientPlayer.isAtWallShop = {
                        state: true,
                        itemId: _itemInstance.id,
                        itemCost: _itemCost,
                    };

                    isPlayerAtWallShop = true;
                }
            } else {
                if (isPlayerAtWallShop) {
                    // player has left the bounding box
                    GUI.UI_setWallShopBuyText(false);

                    ClientPlayer.isAtWallShop = {
                        state: false,
                        itemId: '',
                        itemCost: 0,
                    };

                    isPlayerAtWallShop = false;
                }
            }
        });
    }
}