(function($) {
    $(document).ready(function(){
        function sendForm (formName,formBtn) {
            var sendedForm = formName,
                formName = $('.'+formName),
                formBtn = $('#'+formBtn),
                formSuccessFullSended = $('.'+sendedForm+'SuccessFullSended'),
                formInfoPlace = $('.'+sendedForm+'InfoPlace'),
                formErrorPlace = $('.'+sendedForm+'ErrorPlace');
            if (formName.length) {
                //действие если форма валидна
                formBtn.click(function(e) {
                    e.preventDefault();
                    if (formName.valid()) {
                        formErrorPlace.hide();
                        formErrorPlace.html('');
                        formInfoPlace.html('Производим отправку...');
                        formInfoPlace.show();
                        var data = formName.serialize();
                        $.ajax ({
                            data: data,
                            dataType: 'json',
                            type: 'POST',
                            url:  '/wp-content/themes/navivka/siteFormSend.php',
                            success: function (data) {
                                if (data['result'] === 'true') {
                                    setTimeout(function() {
                                        //убираем форму и пишем текст успешной отправки
                                        formInfoPlace.hide();
                                        formSuccessFullSended.slideToggle(500);
                                        formName.slideToggle(500);
                                    }, 500);
                                    //цели при успешной отправке формы
                                    var site_form_title = formName.find('input[name=site_form_title]').val();
                                    if ( site_form_title != '' ) {
                                        //если форма - всплыв окно
                                        if ( sendedForm ==  'mainSiteForm' ) {
                                            if  ( site_form_title == 'Получить бесплатную консультацию' ) {
                                                yaCounter38929020.reachGoal('send_consult');
                                            }
                                            if  ( site_form_title == 'Получи полную презентацию о навивных технологиях' ) {
                                                yaCounter38929020.reachGoal('send_present');
                                            }
                                            if  ( site_form_title == 'Создай свой эскиз-проект и получи бесплатный расчет спецификации' ) {
                                                yaCounter38929020.reachGoal('send_calculate');
                                            }
                                        }
                                        if ( sendedForm ==  'secondSiteForm' ) {
                                            if  ( site_form_title == 'Получи один из 100 бесплатных промо-комплектов оборудования' ) {
                                                yaCounter38929020.reachGoal('get_promo');
                                            }
                                        }
                                        if ( sendedForm ==  'thirdSiteForm' ) {
                                            if  ( site_form_title == 'Получи один из 100 бесплатных промо-комплектов оборудования' ) {
                                                yaCounter38929020.reachGoal('get_promo_bottom');
                                            }
                                        }
                                    }
                                } else {
                                    setTimeout(function() {
                                        formInfoPlace.hide();
                                        formInfoPlace.html('');
                                        formErrorPlace.html('Ошибка отправки! Попробуйте отправить позднее!');
                                        formErrorPlace.show();
                                    }, 200);
                                }
                            }
                        });
                    }
                });
            }
        }

        //правила валидации для форм

        //правило - только текст и пробелы
        jQuery.validator.addMethod("lettersonly", function(value, element) {
            return this.optional(element) || /^[а-яА-Яa-zA-Z\s]+$/i.test(value);
        }, "Вводите только буквы и пробелы.");

        //правило - только англ текст и цифры без пробелов
        jQuery.validator.addMethod("englettersonly", function(value, element) {
            return this.optional(element) || /^[a-zA-Z0-9]+$/i.test(value);
        }, "Вводите только английские буквы и цифры без пробелов.");

        // полное правило проверки email
        jQuery.validator.addMethod("isFullValidMail", function(value, element) {
            return this.optional( element ) || ( /^[a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,4}$/.test( value ) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test( value ) );
        }, 'Пожалуйста, введите корректный адрес электронной почты.');

        // override jquery validate plugin defaults for boostsrap forms
        $.validator.setDefaults({
            highlight: function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function(element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function(error, element) {
                if(element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            }
        });

        //правила для всех mainSiteForm
        $('.mainSiteForm').each(function () {
            $(this).validate({
                rules: {
                    name: {
                        lettersonly: true
                    },
                    email: {
                        isFullValidMail: true
                    }
                }
            });
        });

        //правила для всех secondSiteForm
        $('.secondSiteForm').each(function () {
            $(this).validate({
                rules: {
                    name: {
                        lettersonly: true
                    },
                    email: {
                        isFullValidMail: true
                    }
                }
            });
        });

        //правила для всех thirdSiteForm
        $('.thirdSiteForm').each(function () {
            $(this).validate({
                rules: {
                    name: {
                        lettersonly: true
                    },
                    email: {
                        isFullValidMail: true
                    }
                }
            });
        });

        //заполнение заголовка формы и кнопки, при нажатии на кнопку открытия формы mainSiteForm
        $('a[data-target="#mainSiteForm"]').click(function () {
            var mainSiteFormTitle = $('#mainSiteFormTitle'),
                mainSiteFormSend = $('#mainSiteFormSend'),
                main_site_form_title = $('#mainSiteForm').find('input[name=site_form_title]');
            mainSiteFormTitle.html( $(this).attr('data-main_site_form_title') );
            mainSiteFormSend.html ( $(this).attr('data-main_site_form_submit') );
            main_site_form_title.val ( $(this).attr('data-main_site_form_title') );
        });

        sendForm('mainSiteForm','mainSiteFormSend'); //форма обратной связи
        sendForm('secondSiteForm','secondSiteFormSend'); //форма обратной связи
        sendForm('thirdSiteForm','thirdSiteFormSend'); //форма обратной связи

    });
})(jQuery);