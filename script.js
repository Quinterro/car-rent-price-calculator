const distanceMax = 1000000;
const distanceMin = 0;
const distanceDefault = 0;

const yearDriversLicense = document.getElementById("yearDriversLicense").value;

const today = dayjs();
const tomorrow = dayjs().add(1, "day");

const priceCategories = {
  basic: {
    name: "Basic",
    factor: 1,
  },
  standard: {
    name: "Standard",
    factor: 1.3,
  },
  medium: {
    name: "Medium",
    factor: 1.6,
  },
  premium: {
    name: "Premium",
    factor: 2,
  },
};

const oilPrice = 7.6;
const priceCategory = priceCategories.medium.name;
let localization = "Rzeszow";
const baseloanPrice = 100;
const mileage = 10;
const availableModel = 2;

let car = {
  priceCategory: priceCategory,
  mileage: mileage,
  availableModel: availableModel,
  localization: localization,
};

const hours = 24;
const minutes = 60;
const seconds = 60;
const miliseconds = 1000;

const currentYear = today.year();

const driversLongevityRate = 1.2;
const amountOfCarsRate = 1.15;
const vatRate = 1.23;

const distanceContainer = document.getElementById("distance");
distanceContainer.setAttribute("max", distanceMax);
distanceContainer.setAttribute("min", distanceMin);
distanceContainer.setAttribute("value", distanceDefault);

const yearDriversLicenseContainer =
  document.getElementById("yearDriversLicense");
yearDriversLicenseContainer.setAttribute("max", tomorrow.year);
yearDriversLicenseContainer.setAttribute("min", 1918);
yearDriversLicenseContainer.setAttribute(
  "value",
  tomorrow.subtract(2, "year").year()
);

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

const startLoan = document.getElementById("start").value;
const dateStart = dayjs(startLoan);

const stopLoan = document.getElementById("stop").value;
const dateStop = dayjs(stopLoan);

let priceDaily = dateStop.diff(dateStart, "day");

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let loanPrice = 100 * priceDaily;
  let wholeLoanPrice = 0;
  wholeLoanPrice += loanPrice;

  switch (car.priceCategory) {
    case "Basic":
      wholeLoanPrice *= priceCategories.basic.factor;
      break;
    case "Standard":
      wholeLoanPrice *= priceCategories.medium.factor;
      break;
    case "Medium":
      wholeLoanPrice *= priceCategories.medium.factor;
      break;
    case "Premium":
      wholeLoanPrice *= priceCategories.premium.factor;
      break;
  }

  if (currentYear - yearDriversLicense < 5)
    wholeLoanPrice *= driversLongevityRate;

  if (currentYear - yearDriversLicense < 3 && car.priceCategory == "Premium")
    window.prompt(
      "Nie możesz wypożyczyć tego samochodu, ponieważ aby wypożyczyć samochód klasy Premium, potrzebujesz posiadać prawo jazdy conajmniej 3 lata."
    );

  if (availableModel < 3) wholeLoanPrice *= amountOfCarsRate;

  let oilCost =
    (document.getElementById("distance").value / 100) * car.mileage * oilPrice;

  wholeLoanPrice += oilCost;

  let priceBrutto = wholeLoanPrice * vatRate;

  document.getElementById(
    "oilPrice"
  ).innerHTML = `Szacunkowa cena za paliwo: ${oilCost.toFixed(2)} zł`;

  document.getElementById(
    "onlyLoan"
  ).innerHTML = `Cena za samo wypożyczenie: ${loanPrice.toFixed(2)} zł`;

  document.getElementById(
    "priceNetto"
  ).innerHTML = `Cena netto za całe wypożyczenie: ${wholeLoanPrice.toFixed(
    2
  )} zł`;

  document.getElementById(
    "priceBrutto"
  ).innerHTML = `Cena brutto za całe wypożyczenie: ${priceBrutto.toFixed(
    2
  )} zł`;
});
