let invalid = [];
const mainForm = document.forms["register_form"];

mainForm.nc12.disabled = true;

mainForm.modelname.addEventListener("change", () => fillNc12(mainForm));
mainForm.brand.addEventListener("change", () => fillNc12(mainForm));
if (filterSilpo)
	mainForm.brand.addEventListener("change", () => {
		console.log(mainForm.brand.value + "Option");
		filterSilpo(mainForm.brand.value + "Option");
	});
mainForm.userphonerepeat.addEventListener("focusout", () => {
	if (validateRepeat(mainForm.userphonerepeat, mainForm.userphone.value)) {
		mainForm.userphonerepeat.classList.add("danger");
		mainForm.userphonerepeat.previousElementSibling.style.display = "block";
	} else {
		mainForm.userphonerepeat.classList.remove("danger");
		mainForm.userphonerepeat.previousElementSibling.style.display = "none";
	}
});
mainForm.emailrepeat.addEventListener("focusout", () => {
	if (validateRepeat(mainForm.emailrepeat, mainForm.useremail.value)) {
		mainForm.emailrepeat.classList.add("danger");
		mainForm.emailrepeat.previousElementSibling.style.display = "block";
	} else {
		mainForm.emailrepeat.classList.remove("danger");
		mainForm.emailrepeat.previousElementSibling.style.display = "none";
	}
});
document.getElementById("successClose").addEventListener("click", () => {
	document.getElementById("successPopup").style.display = "none";
});
document.getElementById("errorClose").addEventListener("click", () => {
	document.getElementById("errorPopup").style.display = "none";
});

fillAreas(areas, mainForm.area);
fillModels(products, mainForm.modelname);

const validateAgree = () => {
	if (
		mainForm["radio-1"].checked &&
		(mainForm["radio-3"].checked || mainForm["radio-4"].checked)
	) {
		mainForm.instrument.nextElementSibling.classList.remove("disabled");
		mainForm.brand.nextElementSibling.classList.remove("disabled");
		mainForm.modelname.nextElementSibling.classList.remove("disabled");
		mainForm.shopname.nextElementSibling.classList.remove("disabled");
		mainForm.serialnumber.disabled = false;
		mainForm.purchasedate.disabled = false;
		mainForm.fiscalCheck.disabled = false;
		mainForm.shopname.disabled = false;
		mainForm.photodownload.disabled = false;
		if (mainForm.cost) mainForm.cost.disabled = false;
		if (mainForm.photodownload2) mainForm.photodownload2.disabled = false;
	} else {
		mainForm.instrument.nextElementSibling.classList.add("disabled");
		mainForm.brand.nextElementSibling.classList.add("disabled");
		mainForm.modelname.nextElementSibling.classList.add("disabled");
		mainForm.shopname.nextElementSibling.classList.add("disabled");
		mainForm.serialnumber.disabled = true;
		mainForm.purchasedate.disabled = true;
		mainForm.fiscalCheck.disabled = true;
		mainForm.shopname.disabled = true;
		mainForm.photodownload.disabled = true;
		if (mainForm.photodownload2) mainForm.photodownload2.disabled = true;
		if (mainForm.cost) mainForm.cost.disabled = true;
	}
};
mainForm["radio-1"].addEventListener("change", validateAgree);
// mainForm["radio-2"].addEventListener("change", validateAgree);
mainForm["radio-3"].addEventListener("change", validateAgree);
mainForm["radio-4"].addEventListener("change", validateAgree);

const validate = (form) => {
	invalid = [];
	if (validateRequired(form.firstname, 1, 40)) invalid.push(form.firstname);
	if (validateRequired(form.lastname, 1, 40)) invalid.push(form.lastname);
	if (validatePhone(form.userphone)) invalid.push(form.userphone);
	if (validateRepeat(form.userphonerepeat, form.userphone.value))
		invalid.push(form.userphonerepeat);
	if (validateEmail(form.useremail)) invalid.push(form.useremail);
	if (validateRepeat(form.emailrepeat, form.useremail.value))
		invalid.push(form.emailrepeat);
	if (validateRequired(form.area)) invalid.push(form.area);
	if (validateRequired(form.city, 1, 40)) invalid.push(form.city);
	if (validateRequired(form.index, 1, 40)) invalid.push(form.index);
	if (validateRequired(form.instrument)) invalid.push(form.instrument);
	if (validateRequired(form.brand)) invalid.push(form.brand);
	if (validateRequired(form.modelname, 1, 40)) invalid.push(form.modelname);
	if (validateRequired(form.nc12, 1, 40)) invalid.push(form.nc12);
	if (validateRequired(form.department, 1, 40)) invalid.push(form.department);
	if (validateDate(form.purchasedate)) invalid.push(form.purchasedate);
	if (validateRequired(form.fiscalCheck, 1, 40)) invalid.push(form.fiscalCheck);
	if (validateRequired(form.shopname)) invalid.push(form.shopname);
	if (validateRequired(form.serialnumber, 12, 12))
		invalid.push(form.serialnumber);
	if (validateRequired(form.photodownload, 1, 256))
		invalid.push(form.photodownload);

	if (mainForm.cost) {
		if (validateRequired(form.cost, 1, 20)) invalid.push(form.cost);
	}
	if (mainForm.photodownload2) {
		if (validateRequired(form.photodownload2, 1, 256))
			invalid.push(form.photodownload2);
	}
	invalid.forEach((e) => {
		e.classList.add("danger");
		if (e.previousElementSibling)
			e.previousElementSibling.style.display = "block";
		if ($(e).parent().prev()) {
			$(e).parent().prev()[0].style.display = "block";
		}
	});

	return !invalid.length;
};

const submit = document.getElementById("mainsubmitbutton");
submit.addEventListener("click", (e) => {
	e.preventDefault();
	Array.from(mainForm.elements).forEach((e) => {
		e.classList.remove("danger");
	});
	invalid.forEach((e) => {
		if (e.previousElementSibling)
			e.previousElementSibling.style.display = "none";
		if ($(e).parent().prev().hasClass("error-text")) {
			$(e).parent().prev()[0].style.display = "none";
		}
	});
	if (validate(mainForm)) {
		document.getElementById("validationError").style.display = "none";
		const formData = new FormData(mainForm);
		formData.append("nc12", mainForm.nc12.value);
		formData.append("agreement", mainForm["radio-3"].checked);

		$.ajax({
			url: "/send-mail.php",
			type: "POST",
			async: true,
			processData: false,
			contentType: false,
			data: formData,
			success: function (data) {
				const result = JSON.parse(data);
				if (result.status === "success") {
					document.getElementById("successPopup").style.display = "block";
				} else {
					document.getElementById("errorPopup").style.display = "block";
					document.getElementById("errorPoputText").innerText = result.message;
				}
			},
			error: function (data) {
				document.getElementById("errorPopup").style.display = "block";
				document.getElementById("errorPoputText").innerText =
					data.message ||
					"Помилка відправки. Будь ласка спробуйте ще. (Зверніть увагу на поле 'я не робот')";
			},
		});
	} else {
		document.getElementById("validationError").style.display = "block";
	}
});
