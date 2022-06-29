sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "com.check.project1",
		settings : {
			id : "walkthrough"
		},
		async: true
	}).placeAt("content");
});
