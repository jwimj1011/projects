/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comui5.confio4./master_detail_confio4_t003/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
