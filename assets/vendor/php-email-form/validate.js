/**
 * PHP Email Form Validation - v2.1
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
!(function($) {
  "use strict";

  // Common function for input and textarea validation
  function validateElement(i, rule) {
    var ierror = false; // error flag for current input
    var pos = rule.indexOf(":", 0);
    if (pos >= 0) {
      var exp = rule.substr(pos + 1, rule.length);
      rule = rule.substr(0, pos);
    } else {
      rule = rule.substr(pos + 1, rule.length);
    }

    var msg = i.attr("data-msg");
    var errorMsg = msg !== undefined ? msg : "wrong Input";

    switch (rule) {
      case "required":
        if (i.val() === "") {
          ierror = true;
        }
        break;

      case "minlen":
        if (i.val().length < parseInt(exp)) {
          ierror = true;
        }
        break;

      case "email":
        if (!emailExp.test(i.val())) {
          ierror = true;
        }
        break;

      case "checked":
        if (!i.is(":checked")) {
          ierror = true;
        }
        break;

      case "regexp":
        exp = new RegExp(exp);
        if (!exp.test(i.val())) {
          ierror = true;
        }
        break;
    }

    var validateEl = i.next(".validate");
    validateEl.html(ierror ? errorMsg : "").show("blind");
    return ierror;
  }

  $("form.php-email-form").submit(function(e) {
    e.preventDefault();

    var f = $(this).find(".form-group"),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children("input, textarea").each(function() {
      var i = $(this);
      var rule = i.attr("data-rule");

      if (rule !== undefined) {
        ferror = validateElement(i, rule) || ferror;
      }
    });

    if (ferror) return false;

    var this_form = $(this);
    var action = this_form.attr("action");

    if (!action) {
      this_form.find(".loading").slideUp();
      this_form.find(".error-message").slideDown().html("The form action property is not set!");
      return false;
    }

    this_form.find(".sent-message, .error-message, .loading").slideUp();

    if (this_form.data("recaptcha-site-key")) {
      var recaptcha_site_key = this_form.data("recaptcha-site-key");
      grecaptcha.ready(function() {
        grecaptcha
          .execute(recaptcha_site_key, { action: "php_email_form_submit" })
          .then(function(token) {
            php_email_form_submit(this_form, action, this_form.serialize() + "&recaptcha-response=" + token);
          });
      });
    } else {
      php_email_form_submit(this_form, action, this_form.serialize());
    }

    return true;
  });

  function php_email_form_submit(this_form, action, data) {
    $.ajax({
      type: "POST",
      url: action,
      data: data,
      timeout: 40000,
    })
      .done(function(msg) {
        if (msg.trim() == "OK") {
          this_form.find(".loading").slideUp();
          this_form.find(".sent-message").slideDown();
          this_form.find("input:not(input[type=submit]), textarea").val("");
        } else {
          this_form.find(".loading").slideUp();
          var error_msg = "Form submission failed!<br>";
          if (msg) {
            error_msg += msg;
          } else {
            error_msg +=
              "Form submission failed and no error message returned from: " +
              action +
              "<br>";
          }
          this_form.find(".error-message").slideDown().html(error_msg);
        }
      })
      .fail(function(data) {
        console.log(data);
        var error_msg = "Form submission failed!<br>";
        if (data.statusText || data.status) {
          error_msg += "Status: ";
          if (data.statusText) {
            error_msg += " " + data.statusText;
          }
          if (data.status) {
            error_msg += " " + data.status;
          }
          error_msg += "<br>";
        }
        if (data.responseText) {
          error_msg += data.responseText;
        }
        this_form.find(".loading").slideUp();
        this_form.find(".error-message").slideDown().html(error_msg);
      });
  }
})(jQuery);
