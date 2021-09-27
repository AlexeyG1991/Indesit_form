const validateAndClose = (input, min, max, func) => {
	if (!func(input, min, max)) {
		input.classList.remove("danger");
		if (input.previousElementSibling)
			input.previousElementSibling.style.display = "none";
		if ($(input).parent().prev().hasClass("error-text")) {
			$(input).parent().prev()[0].style.display = "none";
		}
	}
};

mainForm.firstname.addEventListener("input", () => {
	validateAndClose(mainForm.firstname, 1, 40, validateRequired);
});
mainForm.lastname.addEventListener("input", () => {
	validateAndClose(mainForm.lastname, 1, 40, validateRequired);
});
mainForm.userphone.addEventListener("input", () => {
	validateAndClose(mainForm.userphone, 1, 40, validatePhone);
});
mainForm.useremail.addEventListener("input", () => {
	validateAndClose(mainForm.useremail, 1, 40, validateEmail);
});

mainForm.area.addEventListener("change", () => {
	validateAndClose(mainForm.area, 1, 40, validateRequired);
});
mainForm.city.addEventListener("input", () => {
	validateAndClose(mainForm.city, 1, 40, validateRequired);
});
mainForm.index.addEventListener("input", () => {
	validateAndClose(mainForm.index, 1, 40, validateRequired);
});
mainForm.department.addEventListener("input", () => {
	validateAndClose(mainForm.department, 1, 40, validateRequired);
});
mainForm.instrument.addEventListener("change", () => {
	validateAndClose(mainForm.instrument, 1, 40, validateRequired);
});
mainForm.brand.addEventListener("change", () => {
	validateAndClose(mainForm.brand, 1, 40, validateRequired);

	mainForm.modelname.nextSibling.innerText = "Оберіть варіанти";
	mainForm.modelname.nextSibling.classList.remove("dirty");
	mainForm.modelname.value = "";
});
mainForm.modelname.addEventListener("change", () => {
	validateAndClose(mainForm.modelname, 1, 40, validateRequired);
	mainForm.nc12.previousElementSibling.style.display = "none";
});
mainForm.nc12.addEventListener("input", () => {
	validateAndClose(mainForm.nc12, 1, 40, validateRequired);
});
mainForm.serialnumber.addEventListener("input", () => {
	validateAndClose(mainForm.serialnumber, 12, 12, validateRequired);
});
mainForm.purchasedate.addEventListener("input", () => {
	validateAndClose(mainForm.purchasedate, 1, 40, validateDate);
});
mainForm.fiscalCheck.addEventListener("input", () => {
	validateAndClose(mainForm.fiscalCheck, 1, 40, validateRequired);
});
mainForm.shopname.addEventListener("change", () => {
	validateAndClose(mainForm.shopname, 1, 40, validateRequired);
});
mainForm.photodownload.addEventListener("input", () => {
	validateAndClose(mainForm.photodownload, 1, 256, validateRequired);
});
if (mainForm.cost) {
	mainForm.cost.addEventListener("input", () => {
		validateAndClose(mainForm.cost, 1, 100, validateRequired);
	});
}
if (mainForm.photodownload2) {
	mainForm.photodownload2.addEventListener("input", () => {
		validateAndClose(mainForm.photodownload2, 1, 100, validateRequired);
	});
}
