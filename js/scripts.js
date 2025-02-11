$(document).ready(function () {
  //Copy right year
  $("#copyright-year").text(new Date().getFullYear());

  const startDate = new Date("2020-01-05"); // Start date in YYYY-MM-DD format

  function calculateExperience() {
    const endDate = new Date();

    // Convert both dates to UTC
    const startUTC = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    const endUTC = Date.UTC(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );

    // Calculate the difference in milliseconds
    let difference = Math.abs(endUTC - startUTC);

    // Calculate years
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
    difference -= years * (1000 * 60 * 60 * 24 * 365);

    // Calculate months
    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.4375));
    difference -= months * (1000 * 60 * 60 * 24 * 30.4375);

    // Calculate days
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    //return { years, months, days };
    $(".experience-years").text(
      years + (months != 0 ? "." + months : "") + "+"
    );
  }

  calculateExperience(); // Initial call to set the value immediately
  setInterval(calculateExperience, 1000 * 60 * 60 * 24); // Update every day
});
