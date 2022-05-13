
export class Ceny{
    constructor(drogy, energie, lepsiPenezenky) {
        this.drogy = drogy;
        this.energie = energie;
        this.lepsiPenezenky = lepsiPenezenky;
    }

    vratHodnoty(){
        return drogy+"!"+energie+"!"+lepsiPenezenky;
    }
}

