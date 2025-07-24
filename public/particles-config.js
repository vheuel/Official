particlesJS("particles", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: ["#00f6b6", "#8393ff", "#428dff", "#F7931A", "#cfb66c", "#f0e4b1"], // Warna partikel
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#00f6b9",
      },
      polygon: {
        nb_sides: 5,
      },
    },
    size: {
      value: 4, // Ukuran partikel
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: false,
        speed: 3,
        opacity_min: 0.5,
        sync: false,
      },
    },
    line_linked: {
      enable: true, // Mengaktifkan garis yang menghubungkan partikel
      distance: 150, // Jarak maksimum antara dua partikel agar garis dapat terbentuk
      color: "#00f6b6", // Warna garis
      opacity: 0.8, // Transparansi garis
      width: 1, // Lebar garis
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true, // Matikan interaksi sentuhan
      },
      onclick: {
        enable: false, // Matikan interaksi klik
      },
      resize: true,
    },
  },
  retina_detect: true,
})
