/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'toastr', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource'],
            function (oj, ko, toastr) {
                function ControllerViewModel() {
                    var self = this;

                    // Media queries for repsonsive layouts
                    var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
                    self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

                    // Router setup
                    self.router = oj.Router.rootInstance;
                    self.router.configure({
                        'dashboard': {label: 'Dashboard', isDefault: true},
                        'incidents': {label: 'Incidents'},
                        'customers': {label: 'Customers'},
                        'about': {label: 'About'}
                    });
                    oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

                    // Navigation setup
                    var navData = [
                        {name: 'Dashboard', id: 'dashboard',
                            iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
                        {name: 'Incidents', id: 'incidents',
                            iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
                        {name: 'Customers', id: 'customers',
                            iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
                        {name: 'About', id: 'about',
                            iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}
                    ];
                    self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

                    // Header
                    // Application Name used in Branding Area
                    self.appName = ko.observable("App Name");
                    // User Info used in Global Navigation area
                    self.userLogin = ko.observable("john.hancock@oracle.com");

                    // Footer
                    function footerLink(name, id, linkTarget) {
                        this.name = name;
                        this.linkId = id;
                        this.linkTarget = linkTarget;
                    }
                    self.footerLinks = ko.observableArray([
                        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
                        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
                        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
                        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
                        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
                    ]);


                    toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-full-width",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "3000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };

                    self.showSuccess= function() {
                        toastr.success("Changes saved successfully!");
                    }
                    ;

                    self.showError=function() {
                        toastr.error("An error occured while saving the changes.");
                    }
                    ;
                    self.showInfo=function() {
                        toastr.info("Ah, you need some information?!");
                    }
                    ;

                    self.showWarning=function() {
                        toastr.warning("He, I warned you!");
                    }
                    ;

                }

                return new ControllerViewModel();
            }
    );
//First I create the 'global' functionality that I can use from anywhere in my application to invoke the toastr notifications. That can easily be setup in the appController.js file. First add toastr to the define block so it can be used in the module.
//
//
//Next configure your toastr so it will behave like you want. To show the notifications full width at the top of the page, and auto dismiss them after 3 seconds you could use the following settings:
//
//Now we are ready to build the functions that will be used by the app to show the notifications. It is really easy to do this:
//
//
//In the application that was created for this blogpost, I use the dashboard page to build some functionality to show the notifications to the end user.  There will be 4 buttons. Each of which shows a different kind of notification. Note that I call directly to the functions in the appController.js 
//
//Final step is to add the toastr.css to the index.html. If you forget to do this, the notifications will show up at the bottom of the page, whit out any styling.
//
//That's it. Build the application, serve it and play around with the buttons.