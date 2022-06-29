/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"MasterDetailApplication/ymaster_mock/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
