// script.js

function tampilkanPenjelasan(metode) {
    const deskripsi = document.getElementById("deskripsi-metode");
    document.getElementById("metode").value = metode;
  
    if (metode === "bagi_dua") {
      deskripsi.innerHTML = `
        <strong>Metode Bagi Dua</strong> adalah metode numerik untuk mencari akar dari suatu fungsi non-linear.
        Metode ini bekerja dengan cara mencari titik tengah dari interval [a, b] dan memeriksa apakah tanda dari
        f(a) dan f(c) berbeda. Jika ya, maka akar ada di antara a dan c, jika tidak maka di antara c dan b.
        Proses ini diulang terus hingga ditemukan nilai c yang membuat f(c) mendekati nol (akar fungsi).
        <br><br>
        <em>Langkah-langkah:</em><br>
        1. Tentukan dua titik awal a dan b sehingga f(a) dan f(b) memiliki tanda berbeda.<br>
        2. Hitung titik tengah c = (a + b) / 2.<br>
        3. Evaluasi f(c).<br>
        4. Jika |f(c)| < toleransi, maka c adalah akar.<br>
        5. Jika f(a) * f(c) < 0 maka akar ada di [a, c], jika tidak maka di [c, b].<br>
        6. Ulangi langkah 2 sampai kondisi berhenti terpenuhi.
      `;
    } else {
      deskripsi.innerHTML = `
        <strong>Metode Regula Falsi</strong> atau <em>False Position</em> adalah metode untuk menemukan akar
        dari fungsi non-linear dengan menggunakan pendekatan garis lurus antara dua titik (a, b) yang menghasilkan
        nilai fungsi dengan tanda berlawanan.
        <br><br>
        Metode ini lebih cepat dari metode Bagi Dua dalam beberapa kasus karena menggunakan pendekatan linier,
        yaitu menghitung perkiraan akar berdasarkan perpotongan garis lurus dengan sumbu-x.
        <br><br>
        <em>Langkah-langkah:</em><br>
        1. Tentukan dua titik awal a dan b sehingga f(a) dan f(b) memiliki tanda berbeda.<br>
        2. Hitung titik perpotongan c = a - f(a) * (b - a) / (f(b) - f(a)).<br>
        3. Evaluasi f(c).<br>
        4. Jika |f(c)| < toleransi, maka c adalah akar.<br>
        5. Jika f(a) * f(c) < 0 maka akar ada di [a, c], jika tidak maka di [c, b].<br>
        6. Ulangi sampai kondisi berhenti terpenuhi.
      `;
    }
  
    document.getElementById("pilih-metode").classList.add("hidden");
    document.getElementById("penjelasan").classList.remove("hidden");
  }
  
  function lanjutInput() {
    document.getElementById("penjelasan").classList.add("hidden");
    document.getElementById("form-input").classList.remove("hidden");
  }
  
  function kembaliPilihMetode() {
    document.getElementById("hasil").classList.add("hidden");
    document.getElementById("form-input").reset();
    document.getElementById("pilih-metode").classList.remove("hidden");
  }
  
  function kembaliKeMenuUtama() {
    document.getElementById("hasil").classList.add("hidden");
    document.getElementById("form-input").classList.add("hidden");
    document.getElementById("penjelasan").classList.add("hidden");
    document.getElementById("form-input").reset();
    document.getElementById("pilih-metode").classList.remove("hidden");
  }
  
  // Evaluasi fungsi string f(x)
  function f(x, expr) {
    try {
      const fn = new Function("x", `return ${expr}`);
      return fn(x);
    } catch (error) {
      alert("Terjadi kesalahan pada fungsi: " + error);
      return NaN;
    }
  }
  
  function bagiDua(fungsi, a, b, toleransi, maksIterasi) {
    let iterasi = 0;
    const log = [];
    const grafik = [];
    let c = 0;
  
    if (f(a, fungsi) * f(b, fungsi) >= 0) {
      alert("f(a) dan f(b) harus memiliki tanda yang berbeda.");
      return null;
    }
  
    while (iterasi < maksIterasi) {
      c = (a + b) / 2;
      const fc = f(c, fungsi);
      log.push(`Iterasi ${iterasi + 1}: c = ${c.toFixed(6)}, f(c) = ${fc.toFixed(6)}`);
      grafik.push({ x: iterasi, y: c });
  
      if (Math.abs(fc) < toleransi) break;
  
      if (f(a, fungsi) * fc < 0) {
        b = c;
      } else {
        a = c;
      }
  
      iterasi++;
    }
  
    return { akar: c, iterasi, log, grafik };
  }
  
  function regulaFalsi(fungsi, a, b, toleransi, maksIterasi) {
    let iterasi = 0;
    const log = [];
    const grafik = [];
    let c = 0;
  
    if (f(a, fungsi) * f(b, fungsi) >= 0) {
      alert("f(a) dan f(b) harus memiliki tanda yang berbeda.");
      return null;
    }
  
    while (iterasi < maksIterasi) {
      const fa = f(a, fungsi);
      const fb = f(b, fungsi);
      c = a - (fa * (b - a)) / (fb - fa);
      const fc = f(c, fungsi);
  
      log.push(`Iterasi ${iterasi + 1}: c = ${c.toFixed(6)}, f(c) = ${fc.toFixed(6)}`);
      grafik.push({ x: iterasi, y: c });
  
      if (Math.abs(fc) < toleransi) break;
  
      if (fa * fc < 0) {
        b = c;
      } else {
        a = c;
      }
  
      iterasi++;
    }
  
    return { akar: c, iterasi, log, grafik };
  }
  
  document.getElementById("form-input").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const fungsi = document.getElementById("fungsi").value;
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const toleransi = parseFloat(document.getElementById("toleransi").value);
    const maksIterasi = parseInt(document.getElementById("maks_iterasi").value);
    const metode = document.getElementById("metode").value;
  
    let hasil;
    if (metode === "bagi_dua") {
      hasil = bagiDua(fungsi, a, b, toleransi, maksIterasi);
    } else {
      hasil = regulaFalsi(fungsi, a, b, toleransi, maksIterasi);
    }
  
    if (!hasil) return;
  
    document.getElementById("form-input").classList.add("hidden");
    document.getElementById("hasil").classList.remove("hidden");
    document.getElementById("hasil-metode").innerText = metode.replace("_", " ");
    document.getElementById("hasil-akar").innerText = hasil.akar.toFixed(6);
    document.getElementById("hasil-iterasi").innerText = hasil.iterasi;
  
    const logEl = document.getElementById("log");
    logEl.innerHTML = "";
    hasil.log.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      logEl.appendChild(li);
    });
  
    const ctx = document.getElementById("chart").getContext("2d");
    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Nilai Akar per Iterasi',
          data: hasil.grafik,
          borderColor: '#6a1b9a',
          backgroundColor: 'rgba(106, 27, 154, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Iterasi' } },
          y: { title: { display: true, text: 'Nilai Akar (c)' } }
        }
      }
    });
  });