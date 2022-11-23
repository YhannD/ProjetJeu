/**
 * Ici, dans la première étape, on a affiché une div en instanciant la classe Elements dans la class App puis, on l'appelle avec un console.log(app) dans le fichier index.js.
 */

import {Elements} from "./Elements.js";

export class App {
    //Ici commence la création de l'arrière-plan dans le navigateur.
    constructor() {
        this.init();
    }

    //L'arrière-plan est construit à partir de la class Elements, qui sera utiliser également pour faire les personnages.
    getScene() {
        return this.scene;
    }

    setScene(scene) {
        this.scene = scene;
        return this;
    }

    init() {
        this.setScene(
            new Elements(
            {x: '100vw', y: '100vh',},
            'eau',
            {x: '0', y: '0'}
        )).getScene()
		// player1
		.addEnfant(
                new Elements(
                    {x: '229px', y: '250px',},
                    'player1',
                    {x: '50px', y: '200px'},
                    {
                        keyup : {
                            Digit1 : function(){this.move('up')},
                            Digit2 : function(){this.move('down')}
                      }
                    }
                ).addEnfant(
                    new Elements(
                        {x: '156px', y: '120px',},
                        'player1Head',
                        {x: '38px', y: '0'}
                    )
                ).addEnfant(
                    new Elements(
                        {x: '219px', y: '199px',},
                        'player1Body',
                        {x: '0', y: '50px'}
                    )
                ).addEnfant(
                    new Elements(
                    {x: '82px', y: '124px',},
                    'player1Weapon',
                    {x: '146px', y: '53px'},
                    {
					  keyup : {
						  'KeyA' : function(){this.throwMe('right', {x: '1100px', y: '53px'}, true, 'player2');}
						}
					}
                ) 
			)
        )
		// player2
		.addEnfant(
                new Elements(
                    {x: '229px', y: '200px',},
                    'player2',
                    {x: '1200px', y: '200px'},
                    {
                        keyup : {
                            Numpad8 : function(){this.move('up')},
                            Numpad2 : function(){this.move('down')}
                      }
                    }
                ).addEnfant(
                    new Elements(
                        {x: '76px', y: '58px',},
                        'player2Head',
                        {x: '0', y: '37px'}
                    )
                ).addEnfant(
                    new Elements(
                        {x: '219px', y: '199px',},
                        'player2Body',
                        {x: '0', y: '0'}
                    )
                ).addEnfant(
                    new Elements(
                    {x: '91px', y: '55px',},
                    'player2Weapon',
                    {x: '31px', y: '132px'},
                    {
                        keyup : {
                            Numpad4 : function(){this.throwMe('left', {x: '-1100px', y: '53px'}, true, 'player1');}
                        }
                    }
                )
			)
		);
		
		return this;
    }
    //Fin de la création de l'arrière-plan dans le navigateur.
}
