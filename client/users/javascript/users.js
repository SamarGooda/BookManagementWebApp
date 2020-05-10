(function ($) {
	$(document).ready(function () {
		"use strict";

		// Options for Message
		//----------------------------------------------
		var options = {
			'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
			'btn-success': '<i class="fa fa-check"></i>',
			'btn-error': '<i class="fa fa-remove"></i>',
			'msg-success': 'All Good! Redirecting...',
			'msg-error': 'Wrong login credentials!',
			'useAJAX': true,
		};

		// Login Form
		//----------------------------------------------
		// Validation
		$("#login-form").validate({
			rules: {
				lg_username: "required",
				lg_password: "required",
			},
			errorClass: "form-invalid"
		});

		// Form Submission
		$("#login-form").submit(function () {
			remove_loading($(this));

			if (options['useAJAX'] == true) {
				// Dummy AJAX request (Replace this with your AJAX code)
				// If you don't want to use AJAX, remove this
				dummy_submit_form($(this));

				// Cancel the normal submission.
				// If you don't want to use AJAX, remove this
				return false;
			}
		});

		// Register Form
		//----------------------------------------------
		// Validation
		$("#register-form").validate({
			rules: {
				first_name: "required",
				last_name: "required",
				email: {
					required: true,
					email: true
				},
				password: {
					required: true,
					minlength: 8
				},
				password_confirm: {
					required: true,
					minlength: 8,
					equalTo: "#register-form [name=password]"
				},
				image: {
					required: true,
					// accept: "image/jpeg, image/pjpeg"
				},
				agree: "required",
			},
			errorClass: "form-invalid",
			errorPlacement: function (label, element) {
				if (element.attr("type") === "checkbox" || element.attr("type") === "radio") {
					element.parent().append(label); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
				}
				else {
					label.insertAfter(element); // standard behaviour
				}
			}
		});
		// check file upload extension
		var filenumber = 1;
		$('#image').rules('add', {
			required: true,  // <- with this you would not need 'required' attribute on input
			accept: "image/jpeg, image/pjpeg"
		});

		// Form Submission
		$('#register-form')
			.ajaxForm({
				url: '127.0.0.1:5000/users/registration/submit',
				type: "POST",
				dataType: 'json',
				success: function (response) {
					alert("The server says: " + response);
				}
			})
			;
		$("#register-form").submit(function (e) {
			// e.preventDefault();
			remove_loading($(this));

			if (options['useAJAX'] == true) {
				// Dummy AJAX request (Replace this with your AJAX code)
				// If you don't want to use AJAX, remove this
				dummy_submit_form($(this));

				// Cancel the normal submission.
				// If you don't want to use AJAX, remove this
				return false;
			}
		});
		// $("#submit").click(function (event) {
		// 	event.preventDefault();
		// });
		// Forgot Password Form
		//----------------------------------------------
		// Validation
		$("#forgot-password-form").validate({
			rules: {
				fp_email: "required",
			},
			errorClass: "form-invalid"
		});

		// Form Submission
		$("#forgot-password-form").submit(function () {
			remove_loading($(this));

			if (options['useAJAX'] == true) {
				// Dummy AJAX request (Replace this with your AJAX code)
				// If you don't want to use AJAX, remove this
				dummy_submit_form($(this));

				// Cancel the normal submission.
				// If you don't want to use AJAX, remove this
				return false;
			}
		});

		// Loading
		//----------------------------------------------
		function remove_loading($form) {
			$form.find('[type=submit]').removeClass('error success');
			$form.find('.login-form-main-message').removeClass('show error success').html('');
		}

		function form_loading($form) {
			$form.find('[type=submit]').addClass('clicked').html(options['btn-loading']);
		}

		function form_success($form) {
			$form.find('[type=submit]').addClass('success').html(options['btn-success']);
			$form.find('.login-form-main-message').addClass('show success').html(options['msg-success']);
		}

		function form_failed($form) {
			$form.find('[type=submit]').addClass('error').html(options['btn-error']);
			$form.find('.login-form-main-message').addClass('show error').html(options['msg-error']);
		}

		// Dummy Submit Form (Remove this)
		//----------------------------------------------
		// This is just a dummy form submission. You should use your AJAX function or remove this function if you are not using AJAX.
		function dummy_submit_form($form) {
			if ($form.valid()) {
				form_loading($form);

				setTimeout(function () {
					form_success($form);
				}, 2000);
			}
		}
	})

})(jQuery); 
