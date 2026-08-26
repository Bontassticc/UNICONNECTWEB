function getPoints(mark) {

  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;

  return 1;

}


export function calculateAPS(studentMarks) {

  let total = 0;


  Object.values(studentMarks).forEach((result) => {

    // Ignore completely empty subject slots
    if (
      !result.subject ||
      result.mark === "" ||
      result.mark === null ||
      result.mark === undefined
    ) {
      return;
    }


    // Life Orientation is not included in APS
    if (result.subject === "Life Orientation") {
      return;
    }


    const mark = Number(result.mark);

    // Ignore invalid values
    if (
      Number.isNaN(mark) ||
      mark < 0 ||
      mark > 100
    ) {
      return;
    }


    total += getPoints(mark);

  });


  return total;

}