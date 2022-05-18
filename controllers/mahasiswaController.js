const Mahasiswa = require("../models/mahasiswa");

module.exports = {
  viewMahasiswa: async (req, res) => {
    try {
      const mahasiswa = await Mahasiswa.find();
      const alertMsg = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMsg, status: alertStatus };

      res.render("index", {
        mahasiswa,
        alert,
        title: "CRUD MongoDB Mahasiswa",
      });
    } catch (error) {
      res.redirect("/mahasiswa");
    }
  },

  addMahasiswa: async (req, res) => {
    try {
      const { nama, nim, jurusan, alamat } = req.body;

      await Mahasiswa.create({ nama, nim, jurusan, alamat });

      req.flash("alertMessage", "Success add data Mahasiswa");
      req.flash("alertStatus", "success");
      res.redirect("/mahasiswa");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/mahasiswa");
    }
  },

  editMahasiswa: async (req, res) => {
    try {
      const { id, nama, nim, jurusan, alamat } = req.body;

      const mahasiswa = await Mahasiswa.findOne({ _id: id });

      mahasiswa.nama = nama;
      mahasiswa.nim = nim;
      mahasiswa.jurusan = jurusan;
      mahasiswa.alamat = alamat;

      await mahasiswa.save();

      req.flash("alertMessage", "Success Update Data!!");
      req.flash("alertStatus", "success");

      res.redirect("/mahasiswa");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/mahasiswa");
    }
  },

  deleteMahasiswa: async (req, res) => {
    try {
      const { id } = req.params;

      const mahasiswa = await Mahasiswa.findOne({ _id: id });

      await mahasiswa.remove();

      req.flash("alertMessage", "Success Delete Data!!");
      req.flash("alertStatus", "success");

      res.redirect("/mahasiswa");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/mahasiswa");
    }
  },
};
