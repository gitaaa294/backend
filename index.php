<?php
include 'config/db.php';
include 'includes/header.php';

// Query untuk menghitung jumlah data
$memberCount = $conn->query("SELECT COUNT(*) as total FROM member")->fetch_assoc()['total'];
$paketCount = $conn->query("SELECT COUNT(*) as total FROM paket")->fetch_assoc()['total'];
$pembayaranCount = $conn->query("SELECT COUNT(*) as total FROM pembayaran")->fetch_assoc()['total'];
$logCount = $conn->query("SELECT COUNT(*) as total FROM log_transaksi")->fetch_assoc()['total'];
$penggunaanCount = $conn->query("SELECT COUNT(*) as total FROM penggunaan_waktu")->fetch_assoc()['total'];
?>

<h1>Dashboard mdcm_net</h1>
<div class="row text-center">
  <div class="col-md-2">
    <div class="card bg-primary text-white mb-3">
      <div class="card-body">
        <h5 class="card-title">Members</h5>
        <p class="card-text fs-3"><?= $memberCount ?></p>
      </div>
    </div>
  </div>
  <div class="col-md-2">
    <div class="card bg-success text-white mb-3">
      <div class="card-body">
        <h5 class="card-title">Paket</h5>
        <p class="card-text fs-3"><?= $paketCount ?></p>
      </div>
    </div>
  </div>
  <div class="col-md-2">
    <div class="card bg-warning text-dark mb-3">
      <div class="card-body">
        <h5 class="card-title">Pembayaran</h5>
        <p class="card-text fs-3"><?= $pembayaranCount ?></p>
      </div>
    </div>
  </div>
  <div class="col-md-2">
    <div class="card bg-info text-white mb-3">
      <div class="card-body">
        <h5 class="card-title">Log Transaksi</h5>
        <p class="card-text fs-3"><?= $logCount ?></p>
      </div>
    </div>
  </div>
  <div class="col-md-2">
    <div class="card bg-secondary text-white mb-3">
      <div class="card-body">
        <h5 class="card-title">Penggunaan Waktu</h5>
        <p class="card-text fs-3"><?= $penggunaanCount ?></p>
      </div>
    </div>
  </div>
</div>

<?php include 'includes/footer.php'; ?>