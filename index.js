var x = 5;

debugger;

function foo() {
  console.log("teste");
  if (x == 3) {
    alert("opa");
  }
}

function bar() {
  if (x) {
    return y;
  } else {
    return z;
  }
}

function foo() {
  let x = 9;
  return x;
}

function foo() {
  const x = "teste";
  return x;
}

function foo() {
  var x = this.algumMetodo();
  return x;
}

function foo(x, y) {
  var z = x + y;
  return z;
}

function computeDurationInMilliseconds() {
  let duration = ((hours * 60 + minutes) * 60 + seconds) * 1000;
  return duration;
}

function foo(x) {
  if (x > 9) {
    if (x === 10) {
      if (x === 10) {
        x + 1;
      }
    }
  }
}

function foo(x) {
  if (x > 9) {
    if (x === 10) {
      x = 9 + 1;
      let y = "alguma coisa";
      console.log();
      x.map(function () {
        if(x === 10){
          if(x > 15) {
            x = x +10
          }
        }
      })
    }
  }
}

function foo(x) {
  if (x > 9) {
    if (x === 10) {
      x = 9 + 1;
      return x;
    }
  }
}

function abrirPastaMinhasDistribuicoes() {
  if(window.top.document.getElementById("mesa:arvoreInstrucaoMinhasDistribuicoes:0:2::idLnkNomearvoreInstrucaoMinhasDistribuicoes") == undefined) {
      window.top.document.getElementById("mesa:arvoreInstrucaoMinhasDistribuicoes:0::treeNodearvoreInstrucaoMinhasDistribuicoes:handle").click();
  }
}
