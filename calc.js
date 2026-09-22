/*
 * Kado Abadi — impact calculator.
 * Pure functions, no DOM. Loaded by index.html as a plain script (globals)
 * and importable from Node for tests / the future API.
 *
 * Update NET_YIELD from actual pool returns. Unit costs are placeholders
 * until partner quotes replace them (see docs/SPEC.md → Causes).
 */
(function (root) {
  const NET_YIELD = 0.06;          // gross ~7% minus nazhir fee (≤10% of surplus), rounded down
  const UNIT_PRICE = 1000;         // Rp per pool unit
  const MIN_GIFT = 250000;
  const MAX_GIFT = 10000000;
  const STEP = 50000;

  const CAUSES = {
    pohon:   { label: "Tanam pohon",   unit: "pohon",         cost: 25000,  verb: "ditanam",   icon: "i-tree", region: ["Jawa Barat", "Banten", "NTT", "Kalimantan Timur"] },
    makan:   { label: "Beri makan",    unit: "porsi makan",   cost: 15000,  verb: "dibagikan", icon: "i-meal", region: ["Jakarta", "Yogyakarta", "Makassar", "Papua"] },
    sekolah: { label: "Bulan sekolah", unit: "bulan sekolah", cost: 300000, verb: "dibiayai",  icon: "i-book", region: ["NTT", "Sumba", "Lombok", "Aceh"] },
  };

  const OCCASIONS = {
    lahir:     { label: "Kelahiran",   sub: "Bayi baru lahir",          kicker: "Menyambut kelahiran" },
    ultah:     { label: "Ulang tahun", sub: "Untuk yang bertambah usia", kicker: "Merayakan ulang tahun" },
    nikah:     { label: "Pernikahan",  sub: "Untuk pasangan baru",      kicker: "Merayakan pernikahan" },
    mengenang: { label: "Mengenang",   sub: "Untuk yang telah pergi",   kicker: "Mengenang" },
  };

  /** Rp produced per year by a gift of A. */
  function perYearRp(A) { return A * NET_YIELD; }
  /** Units delivered by year N from a gift of A into a cause with unit cost c. */
  function units(A, c, N) { return Math.floor((A * NET_YIELD * N) / c); }
  /** Units a one-time gift of A would deliver, once. */
  function oneTime(A, c) { return Math.floor(A / c); }
  /** Year in which the eternal gift has delivered more than the one-time gift. */
  function crossover() { return Math.ceil(1 / NET_YIELD); }
  /** Pool units minted for a gift of A. */
  function unitsMinted(A) { return Math.floor(A / UNIT_PRICE); }

  const api = { NET_YIELD, UNIT_PRICE, MIN_GIFT, MAX_GIFT, STEP, CAUSES, OCCASIONS, perYearRp, units, oneTime, crossover, unitsMinted };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.KadoCalc = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
