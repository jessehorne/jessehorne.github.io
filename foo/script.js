function solve(x) {
  var start_time = new Date().getTime() / 1000;

  var number = x;
  var iterator = 3;

  while (number % 2 == 0) {
    number = number / 2;
  }

  while (iterator <= number) {
    if (x = number % iterator == 0) {
      number = number / iterator;
    } else {
      iterator += 2;
    }
  }

  var end_time = new Date().getTime() / 1000;
  return (end_time - start_time);
}

var total = 0

for (var x = 1; x <= 10000; x++) {
  total += solve(600851475143);
}

document.getElementById("solution").innerHTML = total;
