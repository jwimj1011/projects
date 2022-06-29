sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "MasterDetailApplication/ymastermock/model/models",
        "sap/ui/model/json/JSONModel",
        "sap/f/library",
        "sap/f/FlexibleColumnLayoutSemanticHelper"
    // "jquery.sap.global" 후 function에 jQuery추가
    ],
    function (UIComponent, Device, models, JSONModel, fioriLibrary, FlexibleColumnLayoutSemanticHelper) {
        "use strict";

        return UIComponent.extend("MasterDetailApplication.ymastermock.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                var oModel,
                    oflightsModel,
                    oRouter;

                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                oModel = new JSONModel();
                this.setModel(oModel);

    			// set flights demo model on this sample
                // oflightsModel = new JSONModel(jQuery.sap.getModulePath('MasterDetailApplication/ymaster', '/mockdata/flights.json'));
                oflightsModel = new JSONModel(sap.ui.require.toUrl('MasterDetailApplication/ymastermock/mockdata/flights.json'));
                oflightsModel.setSizeLimit(1000);
                this.setModel(oflightsModel, 'flights');
  
                oRouter = this.getRouter();
                oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
                oRouter.initialize();
            },

            getHelper: function () {
                return this._getFcl().then(function(oFCL) {
                    var oSettings = {
                        defaultTwoColumnLayoutType: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                        defaultThreeColumnLayoutType: fioriLibrary.LayoutType.ThreeColumnsMidExpanded,
                        initialColumnsCount: 2,
                        maxColumnsCount: 2
                    };
                    return (FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings));
                });
            },
    
            _onBeforeRouteMatched: function(oEvent) {
                var oModel = this.getModel(),
                    sLayout = oEvent.getParameters().arguments.layout,
                    oNextUIState;
    
                // If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
                if (!sLayout) {
                    this.getHelper().then(function(oHelper) {
                        oNextUIState = oHelper.getNextUIState(0);
                        oModel.setProperty("/layout", oNextUIState.layout);
                    });
                    return;
                }
                oModel.setProperty("/layout", sLayout);
            },
    
            _getFcl: function () {
                return new Promise(function(resolve, reject) {
                    var oFCL = this.getRootControl().byId('flexibleColumnLayout');
                    if (!oFCL) {
                        this.getRootControl().attachAfterInit(function(oEvent) {
                            resolve(oEvent.getSource().byId('flexibleColumnLayout'));
                        }, this);
                        return;
                    }
                    resolve(oFCL);
                }.bind(this));
            }
        });
    });