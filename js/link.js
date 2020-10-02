function goToRegister(obj) {
  localStorage.setItem("tourDetails", JSON.stringify(obj));
  window.open("register.html");
}
