let distanceMax = 1000000;
let distanceMin = 0;
let distanceDefault = 0;

let yearDriversLicense = document.getElementById("yearDriversLicense").value;

let today = dayjs();
let tomorrow = dayjs().add(1, "day");

let oilPrice = 7.6;
let priceCategory = "Medium";
let localization = "Rzeszow";
let bazowaloanPrice = 100;
let mileage = 10;
let availableModel = 2;

let car = {
  priceCategory: priceCategory,
  mileage: mileage,
  availableModel: availableModel,
  localization: localization,
};

let hours = 24;
let minutes = 60;
let seconds = 60;
let miliseconds = 1000;

let factorBasic = 1;
let factorStandard = 1.3;
let factorMedium = 1.6;
let factorPremium = 2;

let currentYear = today.year();

let driversLongevityRate = 1.2;
let amountOfCarsRate = 1.15;
let vatRate = 1.23;

document.getElementById("distance").setAttribute("max", distanceMax);
document.getElementById("distance").setAttribute("min", distanceMin);
document.getElementById("distance").setAttribute("value", distanceDefault);

document
  .getElementById("yearDriversLicense")
  .setAttribute("max", tomorrow.year);
document.getElementById("yearDriversLicense").setAttribute("min", 1918);
document
  .getElementById("yearDriversLicense")
  .setAttribute("value", tomorrow.subtract(2, "year").year());

document
  .getElementById("start")
  .setAttribute("value", today.format("YYYY-MM-DD"));
document
  .getElementById("start")
  .setAttribute("min", today.format("YYYY-MM-DD"));
document
  .getElementById("stop")
  .setAttribute("value", tomorrow.format("YYYY-MM-DD"));
document
  .getElementById("stop")
  .setAttribute("min", tomorrow.format("YYYY-MM-DD"));
document
  .getElementById("stop")
  .setAttribute("max", today.add(100, "day").format("YYYY-MM-DD"));

let startLoan = document.getElementById("start").value;
let dateStart = dayjs(startLoan);
//let dateStart = new Date(startLoan).getTime();
let stopLoan = document.getElementById("stop").value;
let dateStop = dayjs(stopLoan);
//let dateStop = new Date(stopLoan).getTime();
let priceDaily = dateStop.diff(dateStart, "day"); // (miliseconds * seconds * minutes * hours);

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  //----- console.log(e);

  let loanPrice = 100 * priceDaily;
  let wholeLoanPrice = 0;
  wholeLoanPrice += loanPrice;

  switch (car.priceCategory) {
    case "Basic":
      wholeLoanPrice *= factorBasic;
      break;
    case "Standard":
      wholeLoanPrice *= factorStandard;
      break;
    case "Medium":
      wholeLoanPrice *= factorMedium;
      break;
    case "Premium":
      wholeLoanPrice *= factorPremium;
      break;
  }

  if (currentYear - yearDriversLicense < 5) {
    wholeLoanPrice *= driversLongevityRate;
  }

  if (currentYear - yearDriversLicense < 3 && car.priceCategory == "Premium") {
    window.prompt(
      "Nie możesz wypożyczyć tego samochodu, ponieważ aby wypożyczyć samochód klasy Premium, potrzebujesz posiadać prawo jazdy conajmniej 3 lata."
    );
  }

  if (availableModel < 3) {
    wholeLoanPrice *= amountOfCarsRate;
  }

  let oilCost =
    (document.getElementById("distance").value / 100) * car.mileage * oilPrice;

  wholeLoanPrice += oilCost;

  let priceBrutto = wholeLoanPrice * vatRate;

  document.getElementById(
    "oilPrice"
  ).innerHTML = `<br><br>Szacunkowa cena za paliwo: ${oilCost.toFixed(
    2
  )} zł<br>`;

  document.getElementById(
    "onlyLoan"
  ).innerHTML = `Cena za samo wypożyczenie: ${loanPrice.toFixed(2)} zł<br>`;

  document.getElementById(
    "priceNetto"
  ).innerHTML = `Cena netto za całe wypożyczenie: ${wholeLoanPrice.toFixed(
    2
  )} zł<br>`;

  document.getElementById(
    "priceBrutto"
  ).innerHTML = `Cena brutto za całe wypożyczenie: ${priceBrutto.toFixed(
    2
  )} zł<br>`;
});
