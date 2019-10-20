    /*
     * To change this license header, choose License Headers in Project Properties.
     * To change this template file, choose Tools | Templates
     * and open the template in the editor.
     */
    /* global grecaptcha */

    var policies;
    var gallery;
    var funcs;
    var jsonURLPath;
    var jsonFile;
    var jsonGallery;
    var now;
    var msgWarn;
    var mdiv;
    var fullYr;
    var title;

//These next two lines prevent background scrolling on MODAL open
    var $html = $(document.documentElement);

//Date of reading
    $('#dateofreading .input-group.date').datepicker({
        daysOfWeekHighlighted: "0,1,2,3,4,5,6",
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        toggleActive: true
    });
//SELECT 2 box
    $(document).ready(function () {
        $('#readingsofinterest').select2({
            placeholder: "  Select One or More Topics of Interest",
            allowClear: true
        });
    });
//Captcha ONLOADCALLBACK
    var onloadCallback = function () {
        console.log("grecaptcha is ready!");
        grecaptcha.render('recaptcha1', {
            'sitekey': '6LdzdCATAAAAAOexuGxHP-Mhv-Rdb3_7qC1E0-EP'
        });
    };

//jquery
    $(location).attr('href');
//pure javascript gets the URL of curr window
    pathname = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    console.log("Curr Window: " + pathname);

//Disable Right Click Menu ONLY if we're local
    if (document.location.hostname !== "localhost" && "127.0.0.1") {
        document.oncontextmenu = new Function("return false;");
    }

//Light Gallery
    $(document).ready(function () {
        $("#lightgallery").lightGallery({
            thumbnail: true,
            animateThumb: false,
            showThumbByDefault: false
        });
    });

    $(document).ready(function () {

        funcs = {
            getPolicyTerms: function (who, mdl, dept, id) {

                //Set the variables if we can't get them
                var mdlHdr;
                var mdlMsg = [];
                var mdlFtr = "&copy; " + fullYr + " The Psychic Godfather - All Rights Reserved";
                var errTitle;
                mdlNbr = mdl;

                //We need to adjust the path if we're not local
                jsonURLPath = {
                    "intpages": "../js/json/",
                    "extpages": "js/json/"
                };
                //For the POLICIES and GALLERY JSON
                if (funcs._left(pathname, 1) === "p" || funcs._left(pathname, 1) === "g") {
                    jsonFile = jsonURLPath.intpages + "policies.json";
                    jsonGallery = jsonURLPath.intpages + "gallery.json";
                } else {
                    jsonFile = jsonURLPath.extpages + "policies.json";
                    jsonGallery = jsonURLPath.extpages + "gallery.json";
                }

                switch (who) {
                    case "terms":
                    case "privacy":
                        //get the text from JSON
                        $.getJSON(jsonFile, function (jsonData) {

                            //Ensure that the container modal is empty
                            $("#dynamicModal").empty();
                            if (who === "terms") {
                                errTitle = "Terms of Use";
                                mdlHdr = "The Pyschic Godfather&trade; Terms of Use<br><br>";
                                mdlMsg = jsonData.data.termsofuse.title + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph1 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph2 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph3 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph4 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph5 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph6 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph7 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph8 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph9 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph10 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph11 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph12 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph13 + "<br><br>";
                                mdlMsg += jsonData.data.termsofuse.paragraph14 + "<br><br>";
                            } else if (who === "privacy") {
                                errTitle = "Privacy Policy";
                                mdlHdr = "The Pyschic Godfather&trade; Privacy Policy";
                                mdlMsg = jsonData.data.privacy.title + "<br><br>";
                                mdlMsg += jsonData.data.privacy.section1 + "<br><br>";
                                mdlMsg += jsonData.data.privacy.section2 + "<br><br>";
                                mdlMsg += jsonData.data.privacy.section3 + "<br><br>";
                                mdlMsg += jsonData.data.privacy.section4 + "<br><br>";
                                mdlMsg += jsonData.data.privacy.section5 + "<br><br>";
                                mdlMsg += jsonData.data.privacy.section6 + "<br><br>";
                                mdlMsg += jsonData.data.privacy.section7 + "<br><br>";
                                mdlMsg += jsonData.data.privacy.section8 + "<br><br>";
                                mdlMsg += jsonData.data.privacy.section9 + "<br><br>";
                                mdlMsg += jsonData.data.privacy.section10;
                            }
                            //The router ah, not like angular but what the hey!
                            var modals = {
                                "top": "<div class='md-modal md-effect-" + mdlNbr + "' id='modal-" + mdlNbr + "'></div>",
                                "content": "<div id='cntdlg2' class='md-content'></div>",
                                "modalheader": "<div id='mdlhdr2' class='modal-header'></div>",
                                "title": "<h2 id='hdrdlg2' class='dialogFxHdr'>" + mdlHdr + "</h2>",
                                "body": "<div id='bdydlg2' class='dialogFxBody' style='max-height: 400px; overflow: auto;'><p>" + mdlMsg + "</p></div>",
                                "footer": "<div id='ftrdlg2' class='dialogFxFooter center-block'><p>" + mdlFtr + "</p><button class='btn btn-primary btn-lg' onclick='funcs.closeAlert(\"modal-" + mdlNbr + "\")'>Close</button></div>"
                            };

                            $("#modal-11").after(modals.top);
                            $("#modal-" + mdlNbr).append(modals.content);
                            $("#cntdlg2").append(modals.modalheader);
                            $("#mdlhdr2").append(modals.title);
                            $("#mdlhdr2").after(modals.body);
                            $("#bdydlg2").after(modals.footer);

                            funcs.showAlert("modal-" + mdlNbr);

                        }).error(function (jqxhr, textStatus, error) {

                            var err = textStatus + "," + error;
                            console.log("ERROR!" + err);

                            mdlHdr = "We're Sorry! There was an error.";
                            mdlMsg = "We were trying to display the " + errTitle + " and we had a problem.\\r\n";
                            mdlMsg += "The error\'s been logged and it\'s being looked into.";

                        });

                        break;
                    default:
                        break;
                }
            },
            getUrlParameter: function (sParam) {
                var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                        sURLVariables = sPageURL.split('&'),
                        sParameterName, i;
                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
            },
            protectEmail: function (user, msg, dom, ext, fn, em) {
                var e = user;
                var a = "@";
                var d = dom;
                var c = "." + ext;
                var s = "?subject=I\'ve had a problem with joining the miles away community. Please help.";
                var b = "&body=Here\'s the contents of the message from the server: %0A%0D" + msg + "%0A%0D";
                b += "Well, what's wierd is that I already registered my name and email. See below:%0A%0D";
                b += "My registered firstname is: " + fn + "%0A";
                b += "My registered email is: " + em + "%0A%0D";
                b += "%0A%0D";
                b += "Thank you for your help.  - " + fn;
                var h = 'mailto:' + e + a + d + c + s + b;
                var m = '<a href=\"' + h + '\" style="color: blue; font-size: 16px;"> Webmaster.</a>';
                return m;
            },
            //Outside Functions
            //Manual dismissable alert X button
            //This is if user dismisses alert
            resetAlert: function (formToReset, whatToDo) {
                if (whatToDo === "clear") {
                    //clear all fields
                    $('#' + formToReset).trigger("reset");
                    //Need to reset the answer question manually
                    $('#answer').prop('disabled', false); //Enable Answer, they were correct
                    $('#answer').css('background-color', ''); //Change the background color to nothing
                    $("label[for='proveit']").text(mdiv);
                    $("label[for='messageWeb']").text("Talk to me...");
                }
                //Close
                $('#warningModal').modal('hide');
            },
            closeAlert: function (alertToClose) {
                //DUMP the modal contents of Modal
                this.hideAlert(alertToClose);
                window.setTimeout(function () {
                    $("#" + alertToClose).remove();
                }, 2000);
            },
            //TIMEOUT for myMsgWeb
            showMsg: function (what) {
                $("#warning").html(msgWarn);
                $("#answer").val('');
                $("#answer").focus();
                $("#" + what).addClass("in");
            },
            hideMsg: function (what) {
                if ($("#" + what).hasClass("in")) {
                    $("#warning").html('');
                    $("#" + what).removeClass("in").addClass("out");
                }
            },
            //Show it
            showAlert: function (whatMsg) {
                $html.css('overflow', 'hidden');
                $("#" + whatMsg).addClass("md-show").css('overflow', 'auto');
            },
            //Hide it
            hideAlert: function (whatMsg) {
                $html.css('overflow', '');
                $("#" + whatMsg).removeClass("md-show").css('overflow', '');
            },
            //Datetime functions
            _getTimeStamp: function () {
                return(now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':' + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds()));
            },
            _getFullYear: function () {
                var fullYr = now.getFullYear();
                return parseInt(fullYr);
            },
            _getTodaysDate: function () {
                return(now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear();
            },
            _getExpDate: function () {
                return(now.getDate()) + ' ' + (now.getMonth() + 1) + ' ' + now.getFullYear();
            },
            _getAbsolutePath: function () {
                var loc = window.location;
                var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
                return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
            },
            _left: function (str, n) {
                if (n <= 0)
                    return "";
                else if (n > String(str).length)
                    return str;
                else
                    return String(str).substring(0, n);
            },
            _right: function (str, n) {
                if (n <= 0)
                    return "";
                else if (n > String(str).length)
                    return str;
                else {
                    var iLen = String(str).length;
                    return String(str).substring(iLen, iLen - n);
                }
            }
        };

        fullYr = funcs._getFullYear();
        console.log("Full Year: ", fullYr);

        //Set for CONTACT PAGE
        funcs.protectEmail('linda', '', 'thepsychicgodfather', 'com', 'null', 'null');

        funcs.makeid();
        $("#cDate").html("&copy;&nbsp;" + fullYr);

    });