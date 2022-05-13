let drogy;
let energie;
let lepsiPenezenky;

export class Ceny{
    constructor(drogy, energie, lepsiPenezenky) {
        this.drogy = drogy;
        this.energie = energie;
        this.lepsiPenezenky = lepsiPenezenky;
    }


}

export function vratHodnoty(){
    return drogy+"!"+energie+"!"+lepsiPenezenky;
}

