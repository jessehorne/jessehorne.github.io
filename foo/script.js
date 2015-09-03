function solve(number2, iterations) {
  var total = 0;

  for (var x = 0; x <= iterations; x++) {
    var start_time = new Date().getMilliseconds();

    var number = number2;
    var iterator = 3;

    while (number % 2 == 0) {
      number = number / 2;
    }

    while (iterator <= number) {
      if (number % iterator == 0) {
        number = number / iterator;
      } else {
        iterator += 2;
      }
    }

    var end_time = new Date().getMilliseconds();
    total += (end_time - start_time);
  }

  return total;
}

total = solve(600851475143, 10000)

document.getElementById("solution").innerHTML = total;
