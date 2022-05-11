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
    willLikelySurvive() {
      const goingToSurvive = this.dna.filter((elem) => {
        return elem === 'C' || elem === 'G';
      });

      return goingToSurvive.length / this.dna.length >= 0.6;
    },
  };
}

/*
const organismA = pAequorFactory(1, mockUpStrand());
const organismB = pAequorFactory(2, mockUpStrand());

console.log(organismA);
console.log(organismB);

const compareDNA = organismA.compareDNA(organismB);

const willSurvive = organismA.willLikelySurvive();
console.log(willSurvive);
*/

const survivingPaeqor = [];
let idCounter = 1;

while (survivingPaeqor.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingPaeqor.push(newOrg);
  }
  idCounter++;
}

console.log(survivingPaeqor);
