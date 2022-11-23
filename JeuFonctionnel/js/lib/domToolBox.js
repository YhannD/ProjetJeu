Object.prototype.setAtr = function (nom, valeur) {
    this.setAttribute(nom, valeur);
    return this; // Avec cette méthode, on généralise au prototype.setAttribute
}

Object.prototype.attachEvents = function (events, element) {
    for (const event in events) {
        if(events.hasOwnProperty(event)){
			// etape 4
			if(event == 'keyup' || event == 'keydown' || event == 'keypress'){
				let keyEvtLst = events[event];
				for (const eventKey in keyEvtLst) {
					if(keyEvtLst.hasOwnProperty(eventKey)){
						document.addEventListener(
							event,
							function(e){
								if(e.code == eventKey) {
									keyEvtLst[eventKey].apply(element);
								}
							}
						);
					}
				}
			} else {
				this.addEventListener(event, events[event].bind(element));
			}
        }
    }
    return this;
}

Object.prototype.uniqid = function() {
    return new Date().getTime() * Math.random() * 100000;
};