const express = require("express");
const router = express.Router();
const db = require("../db");

// =====================
// LOGIN
// =====================
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM account WHERE username = ? AND password = ?";
  const dataQuery = "SELECT id, nama_produk, stock_produk, harga_produk, gambar_produk FROM products LIMIT ? OFFSET ?";

  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Gagal login" });

    if (results.length > 0) {
      res.status(200).json({ message: "Login berhasil" });
    } else {
      res.status(401).json({ message: "Username atau password salah" });
    }
  });
});

// ====================
// GET PRODUK DENGAN PAGINATION
// =====================
router.get("/produk", (req, res) => {
  const limit = 5;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const countQuery = "SELECT COUNT(*) AS total FROM products";
  const dataQuery = "SELECT * FROM products LIMIT ? OFFSET ?";

  db.query(countQuery, (err, countResult) => {
    if (err) return res.status(500).json({ message: "Error counting data" });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(dataQuery, [limit, offset], (err, result) => {
      if (err) return res.status(500).json({ message: "Error getting data" });

      res.json({
        data: result,
        currentPage: page,
        totalPages: totalPages,
      });
    });
  });
});

// =====================
// TAMBAH JUMLAH PRODUK
// =====================
router.post("/produk/tambah", (req, res) => {
  const { id, jumlah } = req.body;

  if (!id || !jumlah) {
    return res.status(400).json({ message: "ID dan jumlah harus diisi" });
  }

  const checkQuery = "SELECT * FROM products WHERE id = ?";
  const updateQuery = "UPDATE products SET stock_produk = stock_produk + ? WHERE id = ?";

  db.query(checkQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal mengecek produk" });
    if (results.length === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });

    db.query(updateQuery, [jumlah, id], (err2, updateResult) => {
      if (err2) return res.status(500).json({ message: "Gagal menambah stok" });

      res.json({ message: "Stok produk berhasil ditambah" });
    });
  });
});

// =====================
// KURANGI JUMLAH PRODUK
// =====================
router.post("/produk/kurang", (req, res) => {
  const { id, jumlah } = req.body;

  if (!id || !jumlah) {
    return res.status(400).json({ message: "ID dan jumlah harus diisi" });
  }

  const checkQuery = "SELECT stock_produk FROM products WHERE id = ?";
  const updateQuery = "UPDATE products SET stock_produk = stock_produk - ? WHERE id = ?";

  db.query(checkQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal mengecek produk" });
    if (results.length === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });

    const currentStock = results[0].stock_produk;

    if (currentStock < jumlah) {
      return res.status(400).json({ message: "Stok tidak mencukupi untuk dikurangi" });
    }

    db.query(updateQuery, [jumlah, id], (err2, updateResult) => {
      if (err2) return res.status(500).json({ message: "Gagal mengurangi stok" });

      res.json({ message: "Stok produk berhasil dikurangi" });
    });
  });
});


module.exports = router;




// router.post("/produk/kurangi", (req, res) => {
//   const { id, jumlah } = req.body;

//   const checkQuery = "SELECT * FROM products WHERE id = ?";
//   const updateQuery = "UPDATE products SET quantity = quantity - ? WHERE id = ?";

//   db.query(checkQuery, [id], (err, result) => {
//     if (err) return res.status(500).json({ message: "Kesalahan server" });

//     if (result.length === 0) {
//       return res.status(404).json({ message: "ID produk tidak ditemukan" });
//     }

//     const currentStok = result[0].quantity;

//     if (currentStok < jumlah) {
//       return res.status(400).json({ message: "Stok tidak mencukupi" });
//     }

//     db.query(updateQuery, [jumlah, id], (err2) => {
//       if (err2)
//         return res.status(500).json({ message: "Gagal mengurangi produk" });

//       res.json({ message: "Produk berhasil dikurangi" });
//     });
//   });
// });