$(document).ready(function() {

	$('form[data-async]').on('submit', function(event) {

		$('form#opret_ny_kunde button, form#opret_ny_server button, form#opret_ny_beskedtype button, form#rediger_beskedtype button').prop('disabled', true);
		var $ny_tekst = CKEDITOR.instances['ny_tekst'].getData();
		var $ret_tekst = CKEDITOR.instances['ret_tekst'].getData();

		//$($this + ' textarea[name=ny_tekst]').val($ny_tekst);
		var $form = $(this);
		var $target = $($form.attr('data-target'));

		$.ajax({
			type: $form.attr('method'),
			url: $form.attr('action'),
			data: $form.serialize() + "&ny_tekst_html=" +  encodeURIComponent($ny_tekst) + "&ret_tekst_html=" + encodeURIComponent($ret_tekst),

			success: function(data, status) {
				alert(data);
				$('form#opret_ny_kunde button, form#opret_ny_server button, form#opret_ny_beskedtype button, form#rediger_beskedtype button').prop('disabled', false);

			}
		});

		event.preventDefault();
	});


	$('#nyserver, #nykunde, #nybeskedtype, #redigerbeskedtype').on('hidden.bs.modal', function () {
    	window.location.reload(true);
	});

	$('input[id^="check_"]').click(function() {

		var id_name = $(this).attr('id');
		var server_id = id_name.substr(6,1);
		var tr_selector = '.row_kunde_' + server_id;
		$(tr_selector).toggle(this.checked);
		var checkboxes = $('tr'+tr_selector+' input:checkbox');
		checkboxes.prop("checked", !checkboxes.prop("checked"));
	});

	$('#valg_beskedtype').on('change', function() {
		// alert(emne_val);
		var beskedtype_id = $(this).val();

		var hidden_input_navn_id = "navn_felt_" + beskedtype_id;
		var hidden_input_emne_id = "emne_felt_" + beskedtype_id;
		var hidden_input_tekst_id = "tekst_felt_" + beskedtype_id;

		var navn_val = $('input#'+hidden_input_navn_id).val();
		var emne_val = $('input#'+hidden_input_emne_id).val();
		var tekst_val = $('input#'+hidden_input_tekst_id).val();

		$('form#mailudsendelse input#email_emne').val(emne_val);
		// $('form#mailudsendelse textarea#email_tekst').val(tekst_val);
		CKEDITOR.instances['email_tekst'].setData(tekst_val);

		// Vis beskeder i modal vinduet for rediger beskedtype
		$('form#rediger_beskedtype input#beskedtype_id').val(beskedtype_id);
		$('form#rediger_beskedtype input#ret_navn').val(navn_val);
		$('form#rediger_beskedtype input#ret_emne').val(emne_val);
		$('form#rediger_beskedtype textarea#ret_tekst').val(tekst_val);
		CKEDITOR.instances['ret_tekst'].setData(tekst_val);
	});



	$('#marker_alle').click(function() {
		if ($('a#marker_alle').text() == 'Vælg alle') {
			$('a#marker_alle').text('Vælg ingen');
			$('form#maillist input[type=checkbox]').each(function () {
			    this.checked = true;
			});
		} else {
			$('a#marker_alle').text('Vælg alle');
			$('form#maillist input[type=checkbox]').each(function () {
			    this.checked = false;
			});
		}
	})

	/*
	 * Validate form mailudsendelse
	 */

	/*
	jQuery.validator.setDefaults({
	  debug: true,
	  success: "valid"
	});
	*/

	$('#opret_ny_kunde').validate({
		rules: {
			navn: {
				required: true
			},
			email: {
				required: true
			},
			server: {
				required: true
			}
        },

        messages: {
        	navn: "<span class='text-danger'>Navn skal angives</span>",
        	email: "<span class='text-danger'>E-mail skal angives</span>",
        	server: "<span class='text-danger'>Server skal vælges</span>"
        },

        /*
        errorPlacement: function(error, element) {
            if (element.attr("name") == "email_tekst") {
           		alert('test');
            	error.insertAfter("textarea#email_tekst");
            } else {
            	error.insertAfter(element);
            }
        }
        */
	})

	$('#opret_ny_server').validate({
		rules: {
			navn: {
				required: true
			}
        },

        messages: {
        	navn: "<span class='text-danger'>Navn skal angives</span>",
        }

	})



	$('#email-submit').click(function() {

		var sList = "";
		$('form#maillist input[type=checkbox]').each(function () {

		    var sThisVal = (this.checked ? "1" : "0");

		    if (sThisVal == '1') {
		    	var id_name = $(this).attr('id');
		    	var kunde_id = id_name.substr(9);
		    	sList += (sList=="" ? kunde_id : "," + kunde_id);
		    }

		});
		$('#email-submit').prop('value', "Sender..");
		$('form#mailudsendelse input#modtagere_tmp').val(sList);

	});

})



