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

    if (!result.subject || !result.mark) return;

    if (result.subject !== "Life Orientation") {

      total += getPoints(Number(result.mark));

    }

  });

  return total;

}