/**
 * Ici, dans la première étape, on a affiché une div en instanciant la classe Elements dans la class App puis, on l'appelle avec un console.log(app) dans le fichier index.js.
 */

import {Elements} from "./Elements.js";

export class Cnx {
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
                'loginForm',
                {x: '0', y: '0'}
            )).getScene()
            // champ login
            .addEnfant(
                new Elements(
                    {x: '250px', y: '60px',},
                    'loginCont',
                    {x: '0', y: '0'},
                    {}
                ).addEnfant(
                    new Elements(
                        {x: '200px', y: '25px',},
                        'loginLabel',
                        {x: '0', y: '0'},
                        {},
                        'label'
                    ).setAtr('for', 'loginField')
                        .setAtr('html', 'Login : ')
                ).addEnfant(
                    new Elements(
                        {x: '200px', y: '25px',},
                        'loginField',
                        {x: '0', y: '30px'},
                        {},
                        'input'
                    ).setAtr('type', 'text')
                        .setAtr('id', 'loginField')
                )
                // champ pass
            ).addEnfant(
            new Elements(
                {x: '250px', y: '60px',},
                'passCont',
                {x: '0', y: '60px'},
                {}
            ).addEnfant(
                new Elements(
                    {x: '200px', y: '25px',},
                    'passLabel',
                    {x: '0', y: '0'},
                    {},
                    'label'
                ).setAtr('for', 'passField')
                    .setAtr('html', 'Pass : ')
            ).addEnfant(
                new Elements(
                    {x: '200px', y: '25px',},
                    'passField',
                    {x: '0', y: '30px'},
                    {},
                    'input'
                ).setAtr('type', 'password')
                    .setAtr('id', 'passField')
            )
            // bouton
        ).addEnfant(
            new Elements(
                {x: '250px', y: '40px',},
                'btnCont',
                {x: '0', y: '130px'},
                {}
            ).addEnfant(
                new Elements(
                    {x: '200px', y: '25px',},
                    'btnIpt',
                    {x: '0', y: '0'},
                    {
                        click : function(){alert('toto')}
                    },
                    'input'
                ).setAtr('type', 'button')
                    .setAtr('id', 'btnIpt')
                    .setAtr('value', 'Connexion')
            )
        );

        return this;
    }

}
