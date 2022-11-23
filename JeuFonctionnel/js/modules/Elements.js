/**
 * /Une bonne habitude est de créer des getters et des setters.
 * On crée nos limites -> coordonnées et taille
 *                      -> fond et background
 *
 */
export class Elements  // Ici on cloisonne de manière logique toutes nos propriétés de simple et découpé.
{
    constructor(limits, fond, position, events, tagname) {
        this.init(limits, fond, position, events, tagname);
        this.build();
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
        return this;
    }
	
    //Le getter
    getConteneur() {
        return this.conteneur;
    }

    //Le setter
    setConteneur(conteneur) {
        this.conteneur = conteneur;
        return this;
    }

    getLimits() {
        return this.limits;
    }

    setLimits(limits) {
        limits.x = this.convertWinToPix(limits.x);
        limits.y = this.convertWinToPix(limits.y);
        this.limits = limits;
        return this;
    }

    getFond() {
        return this.fond;
    }

    setFond(fond) {
        this.fond = fond;
        return this;
    }

    getPosition() {
        return this.position;
    }

    setPosition(position) {
        position.x = this.convertWinToPix(position.x);
        position.y = this.convertWinToPix(position.y);
        this.position = position;
        return this;
    }

    convertWinToPix(value){
        if(value.indexOf('vh') > -1) {
            return document.documentElement.clientHeight * parseInt(value) / 100 + 'px';
        } else if(value.indexOf('vw') > -1) {
            return document.documentElement.clientWidth * parseInt(value) / 100 + 'px';
        }
        return value;
    }

    getEnfant() {
		return typeof this.enfants != 'undefined' ? this.enfants : -1;
    }

    setEnfant(enfants) {
        this.enfants = enfants;
        return this;
    }
	
	addEnfant(enfant) {
        this.getEnfant().push(enfant.setParent(this));
        this.getConteneur().appendChild(enfant.getConteneur());
        return this;
    }

    getParent() {
		return typeof this.parentEle != 'undefined' ? this.parentEle : -1;
    }

    setParent(parentEle) {
        this.parentEle = parentEle;
        return this;
    }
	
	getPosXFull() {
		return this.getParent() == -1 ? parseInt(this.getPosition().x) : this.getParent().getPosXFull() + parseInt(this.getPosition().x);
	}
	
	getData() {
		let enfLst = [this];
		if(this.getEnfant() != -1 ){
			for (const enf in this.getEnfant()) {
				if(this.getEnfant().hasOwnProperty(enf)){
					enfLst = enfLst.concat(this.getEnfant()[enf].getData());
				}
			}
		}
		return enfLst;
	}	

    filterDataFond(datas, filter) {
        let dataFlt = [];
        for (const data in datas) {
            if(datas.hasOwnProperty(data)){
                if(datas[data].getFond() == filter){
                    dataFlt.push(datas[data]);
                }   
            }
        }
        
        return dataFlt;
	}

    setAtr(nom, valeur) {
        if(nom == 'html'){
            this.getConteneur().innerHTML = valeur;
            return this;
        } 
        
        this.getConteneur().setAttribute(nom, valeur);
        return this;
    }

			//this.getEnfant().getData().join([this]);
	
	/*getPosXFull() {
		return parseInt(this.getPosition().x) + this.getParent() == -1 ? 0 : this.getParent().getPosXFull();
	}*/
	
	/*getPosYFull() {
        return parseInt(this.getPosition().y) + this.getParent() == -1 ? 0 : this.getParent().getPosYFull();
    }*/
	
	getPosYFull() {
		return parseInt(this.getPosition().y) + (this.getParent() == -1 ? 0 : this.getParent().getPosYFull());
	}
	
    getEvents() {
        return this.events;
    }

    setEvents(events) {
        this.events = events;
        return this;
    }

    init(limits, fond, position, events, tagname) {//Ici on a un objet avec nos propriétés et idéalement on devrait avoirs desormais des getters et setters.
        // this.conteneur = null;
        // this.limits = null;
        // this.fond= null; // En Js on peut presque faire ce que l'on appelle le paradigme fonctionnel.
        // Une fois les setters et getters créés au-dessus, on remplace les précédents this par les sets définis.
        // On crée un objet html qui s'insert tout dans le body.
        // this.setLimits(null);
        this.setConteneur(this.buildConteneur(tagname))
            .setLimits(limits ? limits : this.buildLimits())
            .setFond(fond ? fond : this.buildFond())
            .setPosition(position ? position : this.buildPosition())
            .setEnfant([])
            .setEvents(events ? events : [])
			.setId(this.uniqid());
    }

    build() {// Evolution de la fonction qui ne fait appelle plus qu'une seule méthode qui fait elle-même appel à des méthodes depuis le fichier domToolBox en agissant sur le prototype de l'objet.
        this.getConteneur().setAtr('class', this.getFond()).setAtr('style', this.buildLimitsCss() + this.buildPositionCss())
        .attachEvents(this.getEvents(), this)
        .parentNode.setAtr('style', 'position:relative');

        // let conteneur = this.getConteneur(); // On appelle le conteneur Div // Méthode mise en commentaire, car la méthode du dessus est mieux factorisé.
        // conteneur.setAttribute('class', this.getFond()); // On un attribut de classe a la div en passant par le setter de buildFond.
        // conteneur.setAttribute('style', this.buildLimitsCss()); //Ne pas mettre des = après les width et height mais des : sinon les balises ne sont pas prises en compte.
    }

    buildConteneur(tagname) {
        // On crée une div qui se renvoie à la volée.
        tagname = typeof tagname != 'undefined' ? tagname : 'div';
        return document.body.appendChild(document.createElement(tagname));
    }

    buildLimits() {//Renvoie un tableau associatif des coordonnées des limites.
        return {
            x: '100vw',
            y: '100vh',
        }
    }

    buildLimitsCss() {//Renvoie une méthode qui renvoie la chaîne de caractère qui contient le style width et height.
        return 'width:' + this.getLimits().x + '; height:' 
        + this.getLimits().y + '; ';
    }

    buildPositionCss() {//Renvoie une méthode qui renvoie la chaîne de caractère qui contient le style width et height.
        return 'position:absolute; left:' + this.getPosition().x + '; top:' + this.getPosition().y;
    }

    buildFond() {//Renvoie une méthode qui renvoie la chaîne de caractère qui contient la classe de la balise.
        return 'eau';
    }

    buildPosition() {//Renvoie une méthode qui positionne le personnage.
        return {
            x: '100px',
            y: '100px',
        }
    }
	
	innerJoin(datas, join) {
		let res = [];
		for (const data in datas) {
			if(datas.hasOwnProperty(data)){
				if(this.getId() != datas[data].getId() && eval(join)
                && datas[data].getId() != window.app.getScene().getId()){
                    res.push(datas[data]);
				}
			}
		}						
		return res;
	}
	
	getColision(datas) {
		return this.innerJoin(datas,
                              '!(this.getPosXFull() + parseInt(this.getLimits().x) < datas[data].getPosXFull()'
							  + ' || datas[data].getPosXFull() + parseInt(datas[data].getLimits().x) < this.getPosXFull()'
							  + ' || this.getPosYFull() + parseInt(this.getLimits().y) < datas[data].getPosYFull()'
							  + ' || datas[data].getPosYFull() + parseInt(datas[data].getLimits().y) < this.getPosYFull())'
							);
	}

	blink() {
		let interval = window.setInterval(this.blinkAction.bind(this), 150);
        setTimeout(() => {clearInterval(interval)}, 1000);
	}
	
	blinkAction(){
		if(this.getConteneur().style.visibility == 'hidden'){
			this.getConteneur().style.visibility = 'visible';
		}else{
			this.getConteneur().style.visibility = 'hidden';
		}
	}
	
	throwMe(mode, pos, isCol, filter) {
        let mvt = mode == 'left' ? -5 : mode == 'right' ? 5 : 0;
        let func = function(me){
            if((mode == 'left' && parseInt(me.getPosition().x) <= parseInt(pos.x))
                || (mode == 'right' && parseInt(me.getPosition().x) >= parseInt(pos.x))){
                return;
            }
            me.setPosition(
                {
                    x:parseInt(me.getPosition().x) + mvt + 'px',
                    y:me.getPosition().y
                }
            )
            .getConteneur()
            .setAtr(
                'style', 
                me.buildLimitsCss() + me.buildPositionCss()
            );
            if(isCol) {
                let eleLst = me.getColision(me.filterDataFond(window.app.getScene().getData(), filter));
                for (const ele in eleLst) {
                    if(eleLst.hasOwnProperty(ele)){
                        eleLst[ele].blink();
                    }
                }
            }
        }
        let interval = window.setInterval(func, 13, this);
	}

    move(mode){
        let mvt = mode == 'up' ? -10 : mode == 'down' ? 10 : 0;
        this.setPosition(
            {
                x:this.getPosition().x,
                y:parseInt(this.getPosition().y) + mvt + 'px'
            }
        ).getConteneur()
        .setAtr(
            'style', 
            this.buildLimitsCss() + this.buildPositionCss()
        )
    }
}