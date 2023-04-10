
const MAP_01_CONFIG = {
    id: 'MAP_01',
    name: 'MAP 01',
    zombiesSpawns: [
        {x: 0, y: 0, z: 0},
    ],
    defaultZombieSpawn: 1, // spawn 1 zombie first time
    defaultZombieHealth: 100, // default zombie health
    defaultZombieDamage: 1, // default zombie damage
    defaultZombieKillReward: 1, // default zombie kill reward (money)
    defaultZombieWalkSpeed: 1, // default zombie walk speed

    defaultPlayerWalkSpeed: 1, // default player walk speed
    defaultPlayerSprintSpeed: 2, // default player sprint speed
    defaultPlayerHealth: 100, // default player health
    defaultPlayerJumpHeight: 1.5, // default player jump height

    defaultPrimaryWeapon: 'AKM', // default primary weapon
    defaultSecondaryWeapon: 'G17', // default secondary weapon
}

module.exports = { MAP_01_CONFIG }