document.getElementById("calculateBtn").addEventListener("click", function () {
  const length = parseFloat(document.getElementById("length").value);
  const isMechanized = document.getElementById("mechanized").checked;

  const diggingRate = isMechanized ? 4 : 3;
  const workersNeeded = Math.ceil(length / diggingRate);

  const showResult = new Function("return confirm('Показать результат?');");

  if (showResult()) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
            <h2>Результат:</h2>
            <p>Глубина канавы: ${length} м</p>
            <p>Тип бригады: ${isMechanized ? "Механизированная" : "Ручная"}</p>
            <p>Необходимое количество работников: ${workersNeeded}</p>
            <img src="${
              isMechanized ? "2.png" : "1.png"
            }" alt="Бригада" class="img-result">
        `;
    resultDiv.querySelector(".img-result").style.display = "block";
  } else {
    const resultDiv = document.getElementById("result");
    document.getElementById("result").innerHTML = `
            <h2>Бригада в отпуске</h2>
            <img src="3.png" alt="Отпуск" class="img-result">
        `;
    resultDiv.querySelector(".img-result").style.display = "block";
  }
});
