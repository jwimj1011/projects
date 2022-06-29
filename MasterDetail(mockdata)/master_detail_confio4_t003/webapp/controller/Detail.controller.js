sap.ui.define([
	"sap/ui/core/mvc/Controller",
	//"sap/ui/core/UIComponent"
	// "sap/m/MessageToast",
	// "sap/ui/model/json/JSONModel",
	// "sap/ui/model/resource/ResourceModel"
	"sap/f/library"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,fioriLibrary) {
		"use strict";

		return Controller.extend("com.ui5.confio4.masterdetailconfio4t003.controller.Detail", {
			onInit: function () {
				var oOwnerComponent = this.getOwnerComponent();


				this.oRouter = oOwnerComponent.getRouter();
				this.oModel = oOwnerComponent.getModel();
				// this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);

				this.oRouter.getRoute("master").attachPatternMatched(this._onFlightMatched, this);
				this.oRouter.getRoute("detail").attachPatternMatched(this._onFlightMatched,this);
				this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onFlightMatched,this);
				// var check = this.getView().byId("ObjectPageLayout")
				// console.log(check)
			}
			,
			// onEditToggleButtonPress: function(oEvent) {

			// 	var oObjectPage = this.getView().byId("ObjectPageLayout"),
			// 	bCurrentShowFooterState = oObjectPage.getShowFooter();

			// 	oObjectPage.setShowFooter(!bCurrentShowFooterState);
			// },
			_onFlightMatched: function(oEvent){
			

				this._flight = oEvent.getParameter("arguments").flight || this._flight || "0";
				this.getView().bindElement({
					path: "/Flight/"+this._flight,
					model: "flight"
				});
			},
			
			onExit: function(){
				this.oRouter.getRoute("master").detachPatternMatched(this._onFlightMatched,this);
				this.oRouter.getRoute("detail").detachPatternMatched(this._onFlightMatched,this);
			}, 
			onEditToggleButtonPress : function()
			{
				var oObject = this.getView().byId("ObjectPageLayout"),
					bCurrentShowFooter = oObject.getShowFooter();

					oObject.setShowFooter(!bCurrentShowFooter);
			}
			,onDetailPress:function(oEvent){
				var detailPath = oEvent.getSource().getBindingContext("flight").getPath(),
					detail = detailPath.split("/").slice(-1).pop();

					this.oRouter.navTo("detailDetail",{layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, detail: detail, flight: this._flight});
					
			
			}

			// onEditToggleButtonPress: function() {
			// 	var oObjectPage = this.getView().byId("ObjectPageLayout"),
			// 	   bCurrentShowFooterState = oObjectPage.getShowFooter();
	   
			// 	oObjectPage.setShowFooter(!bCurrentShowFooterState);
	   
				
			//  },
			
		});
	});
