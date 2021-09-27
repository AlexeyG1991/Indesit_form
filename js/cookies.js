window.onload = function () {
	const cookies = localStorage.getItem("ckookiesSet");
	const acceptBtn = document.getElementById("acceptCookies");
	const closeCookies = document.getElementById("closeCookies");
	const cookiesPopup = document.getElementById("cookiesPopup");

	closeCookies.addEventListener("click", () => {
		cookiesPopup.style.display = "none";
	});

	if (!cookies) {
		cookiesPopup.style.display = "block";
		acceptBtn.addEventListener("click", () => {
			localStorage.setItem("ckookiesSet", "visited");
			cookiesPopup.style.display = "none";
			console.log(cookies);
		});
	} else {
		cookiesPopup.style.display = "none";
	}
};
