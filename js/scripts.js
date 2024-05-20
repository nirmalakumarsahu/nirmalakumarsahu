$(document).ready(function () {
  //Copy right year
  $("#copyright-year").text(new Date().getFullYear());

  //Experience year
  const startDate = new Date("2021-07-05"); // Start date in YYYY-MM-DD format

  function updateExperience() {
    const currentDate = new Date();

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const startDay = startDate.getDate();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    // Calculate the total months difference
    let totalMonths =
      (currentYear - startYear) * 12 + (currentMonth - startMonth);

    // Adjust totalMonths if the current day is less than the start day
    if (currentDay < startDay) {
      totalMonths -= 1;
    }

    // Calculate the experience in years
    const experienceInYears = totalMonths / 12;

    // Update the text content
    $(".experience-years").text(experienceInYears.toFixed(1));
  }

  updateExperience(); // Initial call to set the value immediately
  setInterval(updateExperience, 1000 * 60 * 60 * 24); // Update every day
});
