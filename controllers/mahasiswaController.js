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
};
