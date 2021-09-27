$("#upload, #upload2").change((event) => {
	const downloadEl = event.target;
	if (downloadEl) {
		downloadEl.parentNode.querySelector("label").classList.add("added-file");
	}
});
// -------------------- select ------------------------

$(".select").each(function () {
	const self = this;

	const _this = $(this),
		selectOption = _this.find("option"),
		selectOptionLength = selectOption.length,
		selectedOption = selectOption.filter(":selected"),
		duration = 350;
	// длительность анимации
	_this.hide();
	_this.wrap('<div class="select"></div>');
	$("<div>", {
		class: "new-select",
		text: _this.children("option:disabled").text(),
	}).insertAfter(_this);
	const selectHead = _this.next(".new-select");
	$("<div>", {
		class: "new-select__list",
	}).insertAfter(selectHead);
	const selectList = selectHead.next(".new-select__list");
	for (let i = 1; i < selectOptionLength; i++) {
		$("<div>", {
			class: "new-select__item",
			html: $("<span>", {
				text: selectOption.eq(i).text(),
			}),
		})
			.attr("data-value", selectOption.eq(i).val())
			.addClass(selectOption.eq(i).attr("class"))
			.appendTo(selectList);
	}
	const selectItem = selectList.find(".new-select__item");
	selectList.slideUp(0);
	selectHead.on("click", function () {
		const isDisabled = selectHead.hasClass("disabled");
		if (!isDisabled) {
			if (!$(this).hasClass("on")) {
				$(this).addClass("on");
				selectList.slideDown(duration);
				selectItem.on("click", function () {
					let chooseItem = $(this).data("value");

					_this.val(chooseItem).attr("selected", "selected");
					self.dispatchEvent(new Event("change"));
					selectHead.text($(this).find("span").text());
					selectList.slideUp(duration);
					selectHead.removeClass("on");
					if (_this.val()) {
						$(selectHead).addClass("dirty");
					}
				});
			} else {
				$(this).removeClass("on");
				selectList.slideUp(duration);
			}
		}
	});
});

// ----------------------input-photo--------------------
let inputs = document.querySelectorAll(".inputfile");
Array.prototype.forEach.call(inputs, function (input) {
	let label = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener("change", function (e) {
		let fileName = "";
		if (this.files && this.files.length > 1)
			fileName = (this.getAttribute("data-multiple-caption") || "").replace(
				"{count}",
				this.files.length
			);
		else fileName = e.target.value.split("\\").pop();

		if (fileName) label.querySelector("span").innerHTML = fileName;
		else {
			input.classList.remove("added-file");

			input.parentNode.querySelector("label").classList.remove("added-file");
			label.innerHTML = labelVal;
		}
	});
});

// validateAgree();