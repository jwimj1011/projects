sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
    'sap/f/library'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox,fioriLibrary) {
	"use strict";

	return Controller.extend("com.ui5.confio4.masterdetailconfio4t003.controller.Master", {


		onInit: function () {
		
			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oflightTable = this.oView.byId("flightTable");
			//  this.checkfilter();
			console.log(
			this.oRouter = this.getOwnerComponent().getRouter());

		},
		checkfilter: function(oEvent) {
			
			// var tble = this.oView.byId("flightTable");
			// var oBinding = this.tble.getBinding("items");
			//  console.log(oBinding);
			//  var child  = oBinding.childnodes
			//  console.log(child)
			// var check = this.byId("carrid").getValue()
				// console.log(check) 
			// var filters = []
			//  if(!check){
			// var	check1 = new Filter("Carrid","NE", check)
			// 	console.log(check1)
			// 	filters.push(check1)
			//  }
			//  console.log(filters)
			//  oBinding.filter(filters);
			//  return this.getTable().getBinding("items");
		},


		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("Carrid", FilterOperator.Contains, sQuery)];
			}

			this.oflightTable.getBinding("items").filter(oTableSearchState, "Application");
		},

		onAdd: function () {
			MessageBox.information("This functionality is not ready yet.", {title: "Aw, Snap!"});
		},

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oflightTable.getBinding("items"),
				oSorter = new Sorter("Carrid", this._bDescendingSort);

			oBinding.sort(oSorter);
		},
        
        onListItemPress: function(oEvnet){
            // var oFCL = this.oView.getParent().getParent();
            // oFCL.setLayout(fioriLibarary.LayoutType.TwoColumnsMidExpanded);
			var flightpath = oEvnet.getSource().getBindingContext("flight").getPath(),
				flight = flightpath.split("/").slice(-1).pop();

			this.oRouter.navTo("detail",{layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, flight: flight });
			
		}
	});
});
