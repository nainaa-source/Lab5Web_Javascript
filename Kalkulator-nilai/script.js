// ==========================================
// 1. LOGIKA MURNI (Pure Functions)
// ==========================================

// Menghitung nilai akhir berdasarkan bobot (Tugas 30%, UTS 30%, UAS 40%)
function hitungNilaiAkhir(tugas, uts, uas) {
    return (tugas * 0.30) + (uts * 0.30) + (uas * 0.40);
}

// Menentukan predikat berdasarkan nilai akhir
function tentukanPredikat(nilai) {
    if (nilai >= 85) return "A";
    if (nilai >= 75) return "B";
    if (nilai >= 60) return "C";
    if (nilai >= 50) return "D";
    return "E";
}

// Validasi rentang nilai (0 - 100)
function validasiNilai(nilai) {
    return !isNaN(nilai) && nilai >= 0 && nilai <= 100;
}

// ==========================================
// 2. TAMPILAN & INTERAKSI DOM
// ==========================================

function prosesHitung() {
    const tugasInput = document.getElementById("tugas").value;
    const utsInput = document.getElementById("uts").value;
    const uasInput = document.getElementById("uas").value;

    const tugas = parseFloat(tugasInput);
    const uts = parseFloat(utsInput);
    const uas = parseFloat(uasInput);

    const errorEl = document.getElementById("errorMessage");
    const resultBox = document.getElementById("resultBox");

    // Validasi input
    if (
        tugasInput.trim() === "" || utsInput.trim() === "" || uasInput.trim() === "" ||
        !validasiNilai(tugas) || !validasiNilai(uts) || !validasiNilai(uas)
    ) {
        errorEl.style.display = "block";
        resultBox.style.display = "none";
        return;
    }

    errorEl.style.display = "none";

    // Hitung logika
    const nilaiAkhir = hitungNilaiAkhir(tugas, uts, uas);
    const predikat = tentukanPredikat(nilaiAkhir);
    const lulus = nilaiAkhir >= 60;

    // Tampilkan hasil ke DOM
    document.getElementById("outNilaiAkhir").textContent = nilaiAkhir.toFixed(2);
    document.getElementById("outPredikat").textContent = predikat;

    const statusEl = document.getElementById("outStatus");
    statusEl.textContent = lulus ? "Lulus" : "Belum Lulus";
    statusEl.className = lulus ? "status-lulus" : "status-gagal";

    resultBox.style.display = "block";
}

// ==========================================
// 3. SKENARIO PENGUJIANKU (Minimal 3 Skenario)
// ==========================================

function jalankanSkenarioUji() {
    const daftarSkenario = [
        { nama: "Skenario 1 (Sangat Baik)", tugas: 85, uts: 78, uas: 88 },
        { nama: "Skenario 2 (Cukup / C)", tugas: 65, uts: 60, uas: 60 },
        { nama: "Skenario 3 (Tidak Lulus)", tugas: 40, uts: 50, uas: 45 }
    ];

    const tableBody = document.getElementById("scenarioTable");
    tableBody.innerHTML = "";

    daftarSkenario.forEach((s) => {
        const akhir = hitungNilaiAkhir(s.tugas, s.uts, s.uas);
        const predikat = tentukanPredikat(akhir);
        const status = akhir >= 60 ? "Lulus" : "Belum Lulus";

        const row = `
            <tr>
                <td style="text-align: left;">${s.nama}</td>
                <td>${s.tugas}</td>
                <td>${s.uts}</td>
                <td>${s.uas}</td>
                <td><strong>${akhir.toFixed(2)}</strong></td>
                <td><strong>${predikat}</strong></td>
                <td class="${akhir >= 60 ? 'status-lulus' : 'status-gagal'}">${status}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Jalankan pengujian skenario saat halaman dimuat
window.onload = jalankanSkenarioUji;
