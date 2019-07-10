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
