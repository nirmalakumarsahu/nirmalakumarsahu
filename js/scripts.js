$(document).ready(function () {
  //Copy right year
  $("#copyright-year").text(new Date().getFullYear());

  //Experience year
  const startDate = new Date("2021-07-05");
  function updateExperience() {
    const currentDate = new Date();
    const yearsDifference = currentDate.getFullYear() - startDate.getFullYear();
    const monthsDifference = currentDate.getMonth() - startDate.getMonth();
    const daysDifference = currentDate.getDate() - startDate.getDate();

    let totalMonths = yearsDifference * 12 + monthsDifference;
    if (daysDifference < 0) {
      totalMonths -= 1;
    }

    const experienceInYears = totalMonths / 12;
    $("#experience-years").text(experienceInYears.toFixed(1));
  }

  updateExperience(); // Initial call to set the value immediately
  setInterval(updateExperience, 1000 * 60 * 60 * 24 * 10); // Update every day
});
