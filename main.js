// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Factory funcion

function pAequorFactory(num, dnaStrand) {
  return {
    _specimenNum: num,
    _dna: dnaStrand,
    get specimenNum() {
      return this._specimenNum;
    },
    set specimenNum(newSpecimenNum) {
      this._specimenNum = newSpecimenNum;
    },
    get dna() {
      return this._dna;
    },
    set dna(newDna) {
      this._dna = newDna;
    },

    mutate() {
      const randomBaseIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randomBaseIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomBaseIndex] = newBase;
      return this.dna;
    },
    compareDNA(pAequor) {
      const sameBase = this.dna.reduce((prev, curr, ind, arr) => {
        if (arr[ind] === pAequor.dna[ind]) {
          return prev + 1;
        } else {
          return prev;
        }
      }, 0);
      console.log(
        `specimen #${this.specimenNum} and specimen #${
          pAequor.specimenNum
        } have ${Math.round(
          (100 / this.dna.length) * sameBase
        )} % DNA in common`
      );
    },
    willLikelySurvive() {},
  };
}

const organismA = pAequorFactory(1, ['T', 'R', 'F', 'S']);

console.log(organismA);

const organismB = {
  _specimenNum: 2,
  _dna: ['T', 'C', 'E', 'S'],
  get specimenNum() {
    return this._specimenNum;
  },
  set specimenNum(newSpecimenNum) {
    this._specimenNum = newSpecimenNum;
  },
  get dna() {
    return this._dna;
  },
  set dna(newDna) {
    this._dna = newDna;
  },
};

console.log(organismB);

const compareDNA = organismA.compareDNA(organismB);
//console.log(compareDNA);
