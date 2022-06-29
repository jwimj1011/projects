sap.ui.define([
	"sap/ui/core/mvc/Controller",
	// "sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
	// "sap/ui/model/resource/ResourceModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel) {
		"use strict";

		return Controller.extend("com.ui5.confio4.masterdetailconfio4t003.controller.DetailDetail", {
			onInit: function () {
				this.oOwnerComponent = this.getOwnerComponent();

				this.oRouter = this.oOwnerComponent.getRouter();
                this.oModel = this.oOwnerComponent.getModel();

                this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onPatternMatch, this);
                // var check = this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onPatternMatch, this);
                // console.log(check)
			},

			_onPatternMatch: function (oEvent){
				this._detail = oEvent.getParameter("arguments").detail || this._detail || "0";
                this._flight = oEvent.getParameter("arguments").flight || this._flight || "0";
                 
                 this.getView().bindElement({
                     path:"/Flight/"+this._detail,
                     model :"flight"
                 })
			
			},
			
			onExit: function( ){
				this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onPatternMatch, this);
			}
		});
	});
