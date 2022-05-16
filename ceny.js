let drogy;
let energie;
let lepsiPenezenky;

export class Ceny{
    constructor(drogy, energie, lepsiPenezenky) {
        this.drogy = drogy;
        this.energie = energie;
        this.lepsiPenezenky = lepsiPenezenky;
    }

    vratHodnoty(){
        return this.drogy+"!"+this.energie+"!"+this.lepsiPenezenky;
    }
}

