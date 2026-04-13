(function () {
  const roles = document.querySelectorAll(".role");
  const form = document.getElementById("loginForm");
  const toggle = document.getElementById("togglePassword");
  const password = document.getElementById("password");

  roles.forEach((btn) =>
    btn.addEventListener("click", () => {
      roles.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    }),
  );

  toggle.addEventListener("click", () => {
    if (password.type === "password") password.type = "text";
    else password.type = "password";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const pwd = form.password.value;
    const selectedRole = document.querySelector(".role.active").dataset.role;

    const payload = { email, password: pwd };

    try {
      const res = await fetch("/animador/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res
          .json()
          .catch(() => ({ message: "Error en servidor" }));
        alert(err.message || "Credenciales inválidas");
        return;
      }

      const data = await res.json();
      // Guardar token y redirigir según roles devueltos por el servidor
      if (data.token) {
        localStorage.setItem("token", data.token);
        // Save apodo for frontend use
        if (data.user && data.user.apodo) {
          localStorage.setItem("apodo", data.user.apodo);
        }
        const roles = (data.user && data.user.roles) || [];
        if (roles.includes("coordinador")) {
          window.location.href = "/coord-dashboard.html";
        } else {
          window.location.href = "/animador-dashboard.html";
        }
      } else {
        alert("Login correcto");
      }
    } catch (err) {
      console.error(err);
      alert("No fue posible conectarse");
    }
  });
})();
