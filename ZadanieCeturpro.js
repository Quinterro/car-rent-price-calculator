var km = document.getElementById("ileKm").value;
var yearDriversLicense = document.getElementById("yearDriversLicense").value;
var startLoan = document.getElementById("start").value;
var dataStart = new Date(startLoan).getTime();
var stopLoan = document.getElementById("stop").value;
var dataStop = new Date(stopLoan).getTime();

var oilPrice = 7.6;
var priceCategory = "Medium";
var localization = "Rzeszow";
var bazowaloanPrice = 100;
var mileage = 10;
var availableModel = 2;

var car = {
  priceCategory: priceCategory,
  mileage: mileage,
  availableModel: availableModel,
  localization: localization,
};

var wholeLoanPrice = 0;

// czas
var hours = 24;
var minutes = 60;
var seconds = 60;
var miliseconds = 1000;

var priceDaily =
  (dataStop - dataStart) / (miliseconds * seconds * minutes * hours);
var loanPrice = 100 * priceDaily;
wholeLoanPrice += loanPrice;

// przeliczenia w zależności od klasy samochodu
var factorBasic = 1;
var factorStandard = 1.3;
var factorMedium = 1.6;
var factorPremium = 2;

var currentYear = new Date().getFullYear();

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

var driversLongevityRate = 1.2;
var amountOfCarsRate = 1.15;
var vatRate = 1.23;

if (currentYear - yearDriversLicense < 5) {
  wholeLoanPrice *= driversLongevityRate;
}

if (currentYear - yearDriversLicense < 3 && car.priceCategory == "Premium") {
  window.prompt(
    "Nie możesz wypożyczyć tego samochodu, poniważ potrzebujesz posiadać prawo jazdy conajmniej 3 lata, aby wypożyczyć samochód klasy Premium"
  );
}

if (availableModel < 3) {
  wholeLoanPrice *= amountOfCarsRate;
}

var oilCost = (km / 100) * car.mileage * oilPrice;

wholeLoanPrice += oilCost;

var priceBrutto = wholeLoanPrice * vatRate;

document.getElementById(
  "oilPrice"
).innerHTML = `<br><br>Szacunkowa cena za paliwo: ${oilCost}<br>`;

document.getElementById(
  "onlyLoan"
).innerHTML = `Cena za samo wypożyczenie: ${loanPrice}<br>`;

document.getElementById(
  "priceNetto"
).innerHTML = `Cena netto za całe wypożyczenie: ${wholeLoanPrice.toFixed(
  2
)}<br>`;

document.getElementById(
  "priceBrutto"
).innerHTML = `Cena brutto za całe wypożyczenie: ${priceBrutto.toFixed(2)}<br>`;
