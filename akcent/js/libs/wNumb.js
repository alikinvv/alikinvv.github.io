(function (factory) {

    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define([], factory);

    } else if ( typeof exports === 'object' ) {

        // Node/CommonJS
        module.exports = factory();

    } else {

        // Browser globals
        window.wNumb = factory();
    }

}(function(){

	'use strict';

var FormatOptions = [
	'decimals',
	'thousand',
	'mark',
	'prefix',
	'suffix',
	'encoder',
	'decoder',
	'negativeBefore',
	'negative',
	'edit',
	'undo'
];

// General

	// Reverse a string
	function strReverse ( a ) {
		return a.split('').reverse().join('');
	}

	// Check if a string starts with a specified prefix.
	function strStartsWith ( input, match ) {
		return input.substring(0, match.length) === match;
	}

	// Check is a string ends in a specified suffix.
	function strEndsWith ( input, match ) {
		return input.slice(-1 * match.length) === match;
	}

	// Throw an error if formatting options are incompatible.
	function throwEqualError( F, a, b ) {
		if ( (F[a] || F[b]) && (F[a] === F[b]) ) {
			throw new Error(a);
		}
	}

	// Check if a number is finite and not NaN
	function isValidNumber ( input ) {
		return typeof input === 'number' && isFinite( input );
	}

	// Provide rounding-accurate toFixed method.
	// Borrowed: http://stackoverflow.com/a/21323330/775265
	function toFixed ( value, exp ) {
		value = value.toString().split('e');
		value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
		value = value.toString().split('e');
		return (+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp))).toFixed(exp);
	}


// Formatting

	// Accept a number as input, output formatted string.
	function formatTo ( decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {

		var originalInput = input, inputIsNegative, inputPieces, inputBase, inputDecimals = '', output = '';

		// Apply user encoder to the input.
		// Expected outcome: number.
		if ( encoder ) {
			input = encoder(input);
		}

		// Stop if no valid number was provided, the number is infinite or NaN.
		if ( !isValidNumber(input) ) {
			return false;
		}

		// Rounding away decimals might cause a value of -0
		// when using very small ranges. Remove those cases.
		if ( decimals !== false && parseFloat(input.toFixed(decimals)) === 0 ) {
			input = 0;
		}

		// Formatting is done on absolute numbers,
		// decorated by an optional negative symbol.
		if ( input < 0 ) {
			inputIsNegative = true;
			input = Math.abs(input);
		}

		// Reduce the number of decimals to the specified option.
		if ( decimals !== false ) {
			input = toFixed( input, decimals );
		}

		// Transform the number into a string, so it can be split.
		input = input.toString();

		// Break the number on the decimal separator.
		if ( input.indexOf('.') !== -1 ) {
			inputPieces = input.split('.');

			inputBase = inputPieces[0];

			if ( mark ) {
				inputDecimals = mark + inputPieces[1];
			}

		} else {

		// If it isn't split, the entire number will do.
			inputBase = input;
		}

		// Group numbers in sets of three.
		if ( thousand ) {
			inputBase = strReverse(inputBase).match(/.{1,3}/g);
			inputBase = strReverse(inputBase.join( strReverse( thousand ) ));
		}

		// If the number is negative, prefix with negation symbol.
		if ( inputIsNegative && negativeBefore ) {
			output += negativeBefore;
		}

		// Prefix the number
		if ( prefix ) {
			output += prefix;
		}

		// Normal negative option comes after the prefix. Defaults to '-'.
		if ( inputIsNegative && negative ) {
			output += negative;
		}

		// Append the actual number.
		output += inputBase;
		output += inputDecimals;

		// Apply the suffix.
		if ( suffix ) {
			output += suffix;
		}

		// Run the output through a user-specified post-formatter.
		if ( edit ) {
			output = edit ( output, originalInput );
		}

		// All done.
		return output;
	}

	// Accept a sting as input, output decoded number.
	function formatFrom ( decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {

		var originalInput = input, inputIsNegative, output = '';

		// User defined pre-decoder. Result must be a non empty string.
		if ( undo ) {
			input = undo(input);
		}

		// Test the input. Can't be empty.
		if ( !input || typeof input !== 'string' ) {
			return false;
		}

		// If the string starts with the negativeBefore value: remove it.
		// Remember is was there, the number is negative.
		if ( negativeBefore && strStartsWith(input, negativeBefore) ) {
			input = input.replace(negativeBefore, '');
			inputIsNegative = true;
		}

		// Repeat the same procedure for the prefix.
		if ( prefix && strStartsWith(input, prefix) ) {
			input = input.replace(prefix, '');
		}

		// And again for negative.
		if ( negative && strStartsWith(input, negative) ) {
			input = input.replace(negative, '');
			inputIsNegative = true;
		}

		// Remove the suffix.
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
		if ( suffix && strEndsWith(input, suffix) ) {
			input = input.slice(0, -1 * suffix.length);
		}

		// Remove the thousand grouping.
		if ( thousand ) {
			input = input.split(thousand).join('');
		}

		// Set the decimal separator back to period.
		if ( mark ) {
			input = input.replace(mark, '.');
		}

		// Prepend the negative symbol.
		if ( inputIsNegative ) {
			output += '-';
		}

		// Add the number
		output += input;

		// Trim all non-numeric characters (allow '.' and '-');
		output = output.replace(/[^0-9\.\-.]/g, '');

		// The value contains no parse-able number.
		if ( output === '' ) {
			return false;
		}

		// Covert to number.
		output = Number(output);

		// Run the user-specified post-decoder.
		if ( decoder ) {
			output = decoder(output);
		}

		// Check is the output is valid, otherwise: return false.
		if ( !isValidNumber(output) ) {
			return false;
		}

		return output;
	}


// Framework

	// Validate formatting options
	function validate ( inputOptions ) {

		var i, optionName, optionValue,
			filteredOptions = {};

		if ( inputOptions['suffix'] === undefined ) {
			inputOptions['suffix'] = inputOptions['postfix'];
		}

		for ( i = 0; i < FormatOptions.length; i+=1 ) {

			optionName = FormatOptions[i];
			optionValue = inputOptions[optionName];

			if ( optionValue === undefined ) {

				// Only default if negativeBefore isn't set.
				if ( optionName === 'negative' && !filteredOptions.negativeBefore ) {
					filteredOptions[optionName] = '-';
				// Don't set a default for mark when 'thousand' is set.
				} else if ( optionName === 'mark' && filteredOptions.thousand !== '.' ) {
					filteredOptions[optionName] = '.';
				} else {
					filteredOptions[optionName] = false;
				}

			// Floating points in JS are stable up to 7 decimals.
			} else if ( optionName === 'decimals' ) {
				if ( optionValue >= 0 && optionValue < 8 ) {
					filteredOptions[optionName] = optionValue;
				} else {
					throw new Error(optionName);
				}

			// These options, when provided, must be functions.
			} else if ( optionName === 'encoder' || optionName === 'decoder' || optionName === 'edit' || optionName === 'undo' ) {
				if ( typeof optionValue === 'function' ) {
					filteredOptions[optionName] = optionValue;
				} else {
					throw new Error(optionName);
				}

			// Other options are strings.
			} else {

				if ( typeof optionValue === 'string' ) {
					filteredOptions[optionName] = optionValue;
				} else {
					throw new Error(optionName);
				}
			}
		}

		// Some values can't be extracted from a
		// string if certain combinations are present.
		throwEqualError(filteredOptions, 'mark', 'thousand');
		throwEqualError(filteredOptions, 'prefix', 'negative');
		throwEqualError(filteredOptions, 'prefix', 'negativeBefore');

		return filteredOptions;
	}

	// Pass all options as function arguments
	function passAll ( options, method, input ) {
		var i, args = [];

		// Add all options in order of FormatOptions
		for ( i = 0; i < FormatOptions.length; i+=1 ) {
			args.push(options[FormatOptions[i]]);
		}

		// Append the input, then call the method, presenting all
		// options as arguments.
		args.push(input);
		return method.apply('', args);
	}

	function wNumb ( options ) {

		if ( !(this instanceof wNumb) ) {
			return new wNumb ( options );
		}

		if ( typeof options !== "object" ) {
			return;
		}

		options = validate(options);

		// Call 'formatTo' with proper arguments.
		this.to = function ( input ) {
			return passAll(options, formatTo, input);
		};

		// Call 'formatFrom' with proper arguments.
		this.from = function ( input ) {
			return passAll(options, formatFrom, input);
		};
	}

	return wNumb;

}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaWJzL3dOdW1iLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZmFjdG9yeSkge1xyXG5cclxuICAgIGlmICggdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xyXG5cclxuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXHJcbiAgICAgICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XHJcblxyXG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlNcclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHNcclxuICAgICAgICB3aW5kb3cud051bWIgPSBmYWN0b3J5KCk7XHJcbiAgICB9XHJcblxyXG59KGZ1bmN0aW9uKCl7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBGb3JtYXRPcHRpb25zID0gW1xyXG5cdCdkZWNpbWFscycsXHJcblx0J3Rob3VzYW5kJyxcclxuXHQnbWFyaycsXHJcblx0J3ByZWZpeCcsXHJcblx0J3N1ZmZpeCcsXHJcblx0J2VuY29kZXInLFxyXG5cdCdkZWNvZGVyJyxcclxuXHQnbmVnYXRpdmVCZWZvcmUnLFxyXG5cdCduZWdhdGl2ZScsXHJcblx0J2VkaXQnLFxyXG5cdCd1bmRvJ1xyXG5dO1xyXG5cclxuLy8gR2VuZXJhbFxyXG5cclxuXHQvLyBSZXZlcnNlIGEgc3RyaW5nXHJcblx0ZnVuY3Rpb24gc3RyUmV2ZXJzZSAoIGEgKSB7XHJcblx0XHRyZXR1cm4gYS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xyXG5cdH1cclxuXHJcblx0Ly8gQ2hlY2sgaWYgYSBzdHJpbmcgc3RhcnRzIHdpdGggYSBzcGVjaWZpZWQgcHJlZml4LlxyXG5cdGZ1bmN0aW9uIHN0clN0YXJ0c1dpdGggKCBpbnB1dCwgbWF0Y2ggKSB7XHJcblx0XHRyZXR1cm4gaW5wdXQuc3Vic3RyaW5nKDAsIG1hdGNoLmxlbmd0aCkgPT09IG1hdGNoO1xyXG5cdH1cclxuXHJcblx0Ly8gQ2hlY2sgaXMgYSBzdHJpbmcgZW5kcyBpbiBhIHNwZWNpZmllZCBzdWZmaXguXHJcblx0ZnVuY3Rpb24gc3RyRW5kc1dpdGggKCBpbnB1dCwgbWF0Y2ggKSB7XHJcblx0XHRyZXR1cm4gaW5wdXQuc2xpY2UoLTEgKiBtYXRjaC5sZW5ndGgpID09PSBtYXRjaDtcclxuXHR9XHJcblxyXG5cdC8vIFRocm93IGFuIGVycm9yIGlmIGZvcm1hdHRpbmcgb3B0aW9ucyBhcmUgaW5jb21wYXRpYmxlLlxyXG5cdGZ1bmN0aW9uIHRocm93RXF1YWxFcnJvciggRiwgYSwgYiApIHtcclxuXHRcdGlmICggKEZbYV0gfHwgRltiXSkgJiYgKEZbYV0gPT09IEZbYl0pICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBDaGVjayBpZiBhIG51bWJlciBpcyBmaW5pdGUgYW5kIG5vdCBOYU5cclxuXHRmdW5jdGlvbiBpc1ZhbGlkTnVtYmVyICggaW5wdXQgKSB7XHJcblx0XHRyZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSggaW5wdXQgKTtcclxuXHR9XHJcblxyXG5cdC8vIFByb3ZpZGUgcm91bmRpbmctYWNjdXJhdGUgdG9GaXhlZCBtZXRob2QuXHJcblx0Ly8gQm9ycm93ZWQ6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMzIzMzMwLzc3NTI2NVxyXG5cdGZ1bmN0aW9uIHRvRml4ZWQgKCB2YWx1ZSwgZXhwICkge1xyXG5cdFx0dmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCdlJyk7XHJcblx0XHR2YWx1ZSA9IE1hdGgucm91bmQoKyh2YWx1ZVswXSArICdlJyArICh2YWx1ZVsxXSA/ICgrdmFsdWVbMV0gKyBleHApIDogZXhwKSkpO1xyXG5cdFx0dmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCdlJyk7XHJcblx0XHRyZXR1cm4gKCsodmFsdWVbMF0gKyAnZScgKyAodmFsdWVbMV0gPyAoK3ZhbHVlWzFdIC0gZXhwKSA6IC1leHApKSkudG9GaXhlZChleHApO1xyXG5cdH1cclxuXHJcblxyXG4vLyBGb3JtYXR0aW5nXHJcblxyXG5cdC8vIEFjY2VwdCBhIG51bWJlciBhcyBpbnB1dCwgb3V0cHV0IGZvcm1hdHRlZCBzdHJpbmcuXHJcblx0ZnVuY3Rpb24gZm9ybWF0VG8gKCBkZWNpbWFscywgdGhvdXNhbmQsIG1hcmssIHByZWZpeCwgc3VmZml4LCBlbmNvZGVyLCBkZWNvZGVyLCBuZWdhdGl2ZUJlZm9yZSwgbmVnYXRpdmUsIGVkaXQsIHVuZG8sIGlucHV0ICkge1xyXG5cclxuXHRcdHZhciBvcmlnaW5hbElucHV0ID0gaW5wdXQsIGlucHV0SXNOZWdhdGl2ZSwgaW5wdXRQaWVjZXMsIGlucHV0QmFzZSwgaW5wdXREZWNpbWFscyA9ICcnLCBvdXRwdXQgPSAnJztcclxuXHJcblx0XHQvLyBBcHBseSB1c2VyIGVuY29kZXIgdG8gdGhlIGlucHV0LlxyXG5cdFx0Ly8gRXhwZWN0ZWQgb3V0Y29tZTogbnVtYmVyLlxyXG5cdFx0aWYgKCBlbmNvZGVyICkge1xyXG5cdFx0XHRpbnB1dCA9IGVuY29kZXIoaW5wdXQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFN0b3AgaWYgbm8gdmFsaWQgbnVtYmVyIHdhcyBwcm92aWRlZCwgdGhlIG51bWJlciBpcyBpbmZpbml0ZSBvciBOYU4uXHJcblx0XHRpZiAoICFpc1ZhbGlkTnVtYmVyKGlucHV0KSApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJvdW5kaW5nIGF3YXkgZGVjaW1hbHMgbWlnaHQgY2F1c2UgYSB2YWx1ZSBvZiAtMFxyXG5cdFx0Ly8gd2hlbiB1c2luZyB2ZXJ5IHNtYWxsIHJhbmdlcy4gUmVtb3ZlIHRob3NlIGNhc2VzLlxyXG5cdFx0aWYgKCBkZWNpbWFscyAhPT0gZmFsc2UgJiYgcGFyc2VGbG9hdChpbnB1dC50b0ZpeGVkKGRlY2ltYWxzKSkgPT09IDAgKSB7XHJcblx0XHRcdGlucHV0ID0gMDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBGb3JtYXR0aW5nIGlzIGRvbmUgb24gYWJzb2x1dGUgbnVtYmVycyxcclxuXHRcdC8vIGRlY29yYXRlZCBieSBhbiBvcHRpb25hbCBuZWdhdGl2ZSBzeW1ib2wuXHJcblx0XHRpZiAoIGlucHV0IDwgMCApIHtcclxuXHRcdFx0aW5wdXRJc05lZ2F0aXZlID0gdHJ1ZTtcclxuXHRcdFx0aW5wdXQgPSBNYXRoLmFicyhpbnB1dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmVkdWNlIHRoZSBudW1iZXIgb2YgZGVjaW1hbHMgdG8gdGhlIHNwZWNpZmllZCBvcHRpb24uXHJcblx0XHRpZiAoIGRlY2ltYWxzICE9PSBmYWxzZSApIHtcclxuXHRcdFx0aW5wdXQgPSB0b0ZpeGVkKCBpbnB1dCwgZGVjaW1hbHMgKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUcmFuc2Zvcm0gdGhlIG51bWJlciBpbnRvIGEgc3RyaW5nLCBzbyBpdCBjYW4gYmUgc3BsaXQuXHJcblx0XHRpbnB1dCA9IGlucHV0LnRvU3RyaW5nKCk7XHJcblxyXG5cdFx0Ly8gQnJlYWsgdGhlIG51bWJlciBvbiB0aGUgZGVjaW1hbCBzZXBhcmF0b3IuXHJcblx0XHRpZiAoIGlucHV0LmluZGV4T2YoJy4nKSAhPT0gLTEgKSB7XHJcblx0XHRcdGlucHV0UGllY2VzID0gaW5wdXQuc3BsaXQoJy4nKTtcclxuXHJcblx0XHRcdGlucHV0QmFzZSA9IGlucHV0UGllY2VzWzBdO1xyXG5cclxuXHRcdFx0aWYgKCBtYXJrICkge1xyXG5cdFx0XHRcdGlucHV0RGVjaW1hbHMgPSBtYXJrICsgaW5wdXRQaWVjZXNbMV07XHJcblx0XHRcdH1cclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdC8vIElmIGl0IGlzbid0IHNwbGl0LCB0aGUgZW50aXJlIG51bWJlciB3aWxsIGRvLlxyXG5cdFx0XHRpbnB1dEJhc2UgPSBpbnB1dDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBHcm91cCBudW1iZXJzIGluIHNldHMgb2YgdGhyZWUuXHJcblx0XHRpZiAoIHRob3VzYW5kICkge1xyXG5cdFx0XHRpbnB1dEJhc2UgPSBzdHJSZXZlcnNlKGlucHV0QmFzZSkubWF0Y2goLy57MSwzfS9nKTtcclxuXHRcdFx0aW5wdXRCYXNlID0gc3RyUmV2ZXJzZShpbnB1dEJhc2Uuam9pbiggc3RyUmV2ZXJzZSggdGhvdXNhbmQgKSApKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBJZiB0aGUgbnVtYmVyIGlzIG5lZ2F0aXZlLCBwcmVmaXggd2l0aCBuZWdhdGlvbiBzeW1ib2wuXHJcblx0XHRpZiAoIGlucHV0SXNOZWdhdGl2ZSAmJiBuZWdhdGl2ZUJlZm9yZSApIHtcclxuXHRcdFx0b3V0cHV0ICs9IG5lZ2F0aXZlQmVmb3JlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFByZWZpeCB0aGUgbnVtYmVyXHJcblx0XHRpZiAoIHByZWZpeCApIHtcclxuXHRcdFx0b3V0cHV0ICs9IHByZWZpeDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBOb3JtYWwgbmVnYXRpdmUgb3B0aW9uIGNvbWVzIGFmdGVyIHRoZSBwcmVmaXguIERlZmF1bHRzIHRvICctJy5cclxuXHRcdGlmICggaW5wdXRJc05lZ2F0aXZlICYmIG5lZ2F0aXZlICkge1xyXG5cdFx0XHRvdXRwdXQgKz0gbmVnYXRpdmU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQXBwZW5kIHRoZSBhY3R1YWwgbnVtYmVyLlxyXG5cdFx0b3V0cHV0ICs9IGlucHV0QmFzZTtcclxuXHRcdG91dHB1dCArPSBpbnB1dERlY2ltYWxzO1xyXG5cclxuXHRcdC8vIEFwcGx5IHRoZSBzdWZmaXguXHJcblx0XHRpZiAoIHN1ZmZpeCApIHtcclxuXHRcdFx0b3V0cHV0ICs9IHN1ZmZpeDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSdW4gdGhlIG91dHB1dCB0aHJvdWdoIGEgdXNlci1zcGVjaWZpZWQgcG9zdC1mb3JtYXR0ZXIuXHJcblx0XHRpZiAoIGVkaXQgKSB7XHJcblx0XHRcdG91dHB1dCA9IGVkaXQgKCBvdXRwdXQsIG9yaWdpbmFsSW5wdXQgKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBbGwgZG9uZS5cclxuXHRcdHJldHVybiBvdXRwdXQ7XHJcblx0fVxyXG5cclxuXHQvLyBBY2NlcHQgYSBzdGluZyBhcyBpbnB1dCwgb3V0cHV0IGRlY29kZWQgbnVtYmVyLlxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZyb20gKCBkZWNpbWFscywgdGhvdXNhbmQsIG1hcmssIHByZWZpeCwgc3VmZml4LCBlbmNvZGVyLCBkZWNvZGVyLCBuZWdhdGl2ZUJlZm9yZSwgbmVnYXRpdmUsIGVkaXQsIHVuZG8sIGlucHV0ICkge1xyXG5cclxuXHRcdHZhciBvcmlnaW5hbElucHV0ID0gaW5wdXQsIGlucHV0SXNOZWdhdGl2ZSwgb3V0cHV0ID0gJyc7XHJcblxyXG5cdFx0Ly8gVXNlciBkZWZpbmVkIHByZS1kZWNvZGVyLiBSZXN1bHQgbXVzdCBiZSBhIG5vbiBlbXB0eSBzdHJpbmcuXHJcblx0XHRpZiAoIHVuZG8gKSB7XHJcblx0XHRcdGlucHV0ID0gdW5kbyhpbnB1dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVGVzdCB0aGUgaW5wdXQuIENhbid0IGJlIGVtcHR5LlxyXG5cdFx0aWYgKCAhaW5wdXQgfHwgdHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJyApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIElmIHRoZSBzdHJpbmcgc3RhcnRzIHdpdGggdGhlIG5lZ2F0aXZlQmVmb3JlIHZhbHVlOiByZW1vdmUgaXQuXHJcblx0XHQvLyBSZW1lbWJlciBpcyB3YXMgdGhlcmUsIHRoZSBudW1iZXIgaXMgbmVnYXRpdmUuXHJcblx0XHRpZiAoIG5lZ2F0aXZlQmVmb3JlICYmIHN0clN0YXJ0c1dpdGgoaW5wdXQsIG5lZ2F0aXZlQmVmb3JlKSApIHtcclxuXHRcdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKG5lZ2F0aXZlQmVmb3JlLCAnJyk7XHJcblx0XHRcdGlucHV0SXNOZWdhdGl2ZSA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmVwZWF0IHRoZSBzYW1lIHByb2NlZHVyZSBmb3IgdGhlIHByZWZpeC5cclxuXHRcdGlmICggcHJlZml4ICYmIHN0clN0YXJ0c1dpdGgoaW5wdXQsIHByZWZpeCkgKSB7XHJcblx0XHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZShwcmVmaXgsICcnKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBbmQgYWdhaW4gZm9yIG5lZ2F0aXZlLlxyXG5cdFx0aWYgKCBuZWdhdGl2ZSAmJiBzdHJTdGFydHNXaXRoKGlucHV0LCBuZWdhdGl2ZSkgKSB7XHJcblx0XHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZShuZWdhdGl2ZSwgJycpO1xyXG5cdFx0XHRpbnB1dElzTmVnYXRpdmUgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJlbW92ZSB0aGUgc3VmZml4LlxyXG5cdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL3NsaWNlXHJcblx0XHRpZiAoIHN1ZmZpeCAmJiBzdHJFbmRzV2l0aChpbnB1dCwgc3VmZml4KSApIHtcclxuXHRcdFx0aW5wdXQgPSBpbnB1dC5zbGljZSgwLCAtMSAqIHN1ZmZpeC5sZW5ndGgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJlbW92ZSB0aGUgdGhvdXNhbmQgZ3JvdXBpbmcuXHJcblx0XHRpZiAoIHRob3VzYW5kICkge1xyXG5cdFx0XHRpbnB1dCA9IGlucHV0LnNwbGl0KHRob3VzYW5kKS5qb2luKCcnKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBTZXQgdGhlIGRlY2ltYWwgc2VwYXJhdG9yIGJhY2sgdG8gcGVyaW9kLlxyXG5cdFx0aWYgKCBtYXJrICkge1xyXG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UobWFyaywgJy4nKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBQcmVwZW5kIHRoZSBuZWdhdGl2ZSBzeW1ib2wuXHJcblx0XHRpZiAoIGlucHV0SXNOZWdhdGl2ZSApIHtcclxuXHRcdFx0b3V0cHV0ICs9ICctJztcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBZGQgdGhlIG51bWJlclxyXG5cdFx0b3V0cHV0ICs9IGlucHV0O1xyXG5cclxuXHRcdC8vIFRyaW0gYWxsIG5vbi1udW1lcmljIGNoYXJhY3RlcnMgKGFsbG93ICcuJyBhbmQgJy0nKTtcclxuXHRcdG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9bXjAtOVxcLlxcLS5dL2csICcnKTtcclxuXHJcblx0XHQvLyBUaGUgdmFsdWUgY29udGFpbnMgbm8gcGFyc2UtYWJsZSBudW1iZXIuXHJcblx0XHRpZiAoIG91dHB1dCA9PT0gJycgKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDb3ZlcnQgdG8gbnVtYmVyLlxyXG5cdFx0b3V0cHV0ID0gTnVtYmVyKG91dHB1dCk7XHJcblxyXG5cdFx0Ly8gUnVuIHRoZSB1c2VyLXNwZWNpZmllZCBwb3N0LWRlY29kZXIuXHJcblx0XHRpZiAoIGRlY29kZXIgKSB7XHJcblx0XHRcdG91dHB1dCA9IGRlY29kZXIob3V0cHV0KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDaGVjayBpcyB0aGUgb3V0cHV0IGlzIHZhbGlkLCBvdGhlcndpc2U6IHJldHVybiBmYWxzZS5cclxuXHRcdGlmICggIWlzVmFsaWROdW1iZXIob3V0cHV0KSApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvdXRwdXQ7XHJcblx0fVxyXG5cclxuXHJcbi8vIEZyYW1ld29ya1xyXG5cclxuXHQvLyBWYWxpZGF0ZSBmb3JtYXR0aW5nIG9wdGlvbnNcclxuXHRmdW5jdGlvbiB2YWxpZGF0ZSAoIGlucHV0T3B0aW9ucyApIHtcclxuXHJcblx0XHR2YXIgaSwgb3B0aW9uTmFtZSwgb3B0aW9uVmFsdWUsXHJcblx0XHRcdGZpbHRlcmVkT3B0aW9ucyA9IHt9O1xyXG5cclxuXHRcdGlmICggaW5wdXRPcHRpb25zWydzdWZmaXgnXSA9PT0gdW5kZWZpbmVkICkge1xyXG5cdFx0XHRpbnB1dE9wdGlvbnNbJ3N1ZmZpeCddID0gaW5wdXRPcHRpb25zWydwb3N0Zml4J107XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICggaSA9IDA7IGkgPCBGb3JtYXRPcHRpb25zLmxlbmd0aDsgaSs9MSApIHtcclxuXHJcblx0XHRcdG9wdGlvbk5hbWUgPSBGb3JtYXRPcHRpb25zW2ldO1xyXG5cdFx0XHRvcHRpb25WYWx1ZSA9IGlucHV0T3B0aW9uc1tvcHRpb25OYW1lXTtcclxuXHJcblx0XHRcdGlmICggb3B0aW9uVmFsdWUgPT09IHVuZGVmaW5lZCApIHtcclxuXHJcblx0XHRcdFx0Ly8gT25seSBkZWZhdWx0IGlmIG5lZ2F0aXZlQmVmb3JlIGlzbid0IHNldC5cclxuXHRcdFx0XHRpZiAoIG9wdGlvbk5hbWUgPT09ICduZWdhdGl2ZScgJiYgIWZpbHRlcmVkT3B0aW9ucy5uZWdhdGl2ZUJlZm9yZSApIHtcclxuXHRcdFx0XHRcdGZpbHRlcmVkT3B0aW9uc1tvcHRpb25OYW1lXSA9ICctJztcclxuXHRcdFx0XHQvLyBEb24ndCBzZXQgYSBkZWZhdWx0IGZvciBtYXJrIHdoZW4gJ3Rob3VzYW5kJyBpcyBzZXQuXHJcblx0XHRcdFx0fSBlbHNlIGlmICggb3B0aW9uTmFtZSA9PT0gJ21hcmsnICYmIGZpbHRlcmVkT3B0aW9ucy50aG91c2FuZCAhPT0gJy4nICkge1xyXG5cdFx0XHRcdFx0ZmlsdGVyZWRPcHRpb25zW29wdGlvbk5hbWVdID0gJy4nO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRmaWx0ZXJlZE9wdGlvbnNbb3B0aW9uTmFtZV0gPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBGbG9hdGluZyBwb2ludHMgaW4gSlMgYXJlIHN0YWJsZSB1cCB0byA3IGRlY2ltYWxzLlxyXG5cdFx0XHR9IGVsc2UgaWYgKCBvcHRpb25OYW1lID09PSAnZGVjaW1hbHMnICkge1xyXG5cdFx0XHRcdGlmICggb3B0aW9uVmFsdWUgPj0gMCAmJiBvcHRpb25WYWx1ZSA8IDggKSB7XHJcblx0XHRcdFx0XHRmaWx0ZXJlZE9wdGlvbnNbb3B0aW9uTmFtZV0gPSBvcHRpb25WYWx1ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKG9wdGlvbk5hbWUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFRoZXNlIG9wdGlvbnMsIHdoZW4gcHJvdmlkZWQsIG11c3QgYmUgZnVuY3Rpb25zLlxyXG5cdFx0XHR9IGVsc2UgaWYgKCBvcHRpb25OYW1lID09PSAnZW5jb2RlcicgfHwgb3B0aW9uTmFtZSA9PT0gJ2RlY29kZXInIHx8IG9wdGlvbk5hbWUgPT09ICdlZGl0JyB8fCBvcHRpb25OYW1lID09PSAndW5kbycgKSB7XHJcblx0XHRcdFx0aWYgKCB0eXBlb2Ygb3B0aW9uVmFsdWUgPT09ICdmdW5jdGlvbicgKSB7XHJcblx0XHRcdFx0XHRmaWx0ZXJlZE9wdGlvbnNbb3B0aW9uTmFtZV0gPSBvcHRpb25WYWx1ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKG9wdGlvbk5hbWUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdC8vIE90aGVyIG9wdGlvbnMgYXJlIHN0cmluZ3MuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGlmICggdHlwZW9mIG9wdGlvblZhbHVlID09PSAnc3RyaW5nJyApIHtcclxuXHRcdFx0XHRcdGZpbHRlcmVkT3B0aW9uc1tvcHRpb25OYW1lXSA9IG9wdGlvblZhbHVlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3Iob3B0aW9uTmFtZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU29tZSB2YWx1ZXMgY2FuJ3QgYmUgZXh0cmFjdGVkIGZyb20gYVxyXG5cdFx0Ly8gc3RyaW5nIGlmIGNlcnRhaW4gY29tYmluYXRpb25zIGFyZSBwcmVzZW50LlxyXG5cdFx0dGhyb3dFcXVhbEVycm9yKGZpbHRlcmVkT3B0aW9ucywgJ21hcmsnLCAndGhvdXNhbmQnKTtcclxuXHRcdHRocm93RXF1YWxFcnJvcihmaWx0ZXJlZE9wdGlvbnMsICdwcmVmaXgnLCAnbmVnYXRpdmUnKTtcclxuXHRcdHRocm93RXF1YWxFcnJvcihmaWx0ZXJlZE9wdGlvbnMsICdwcmVmaXgnLCAnbmVnYXRpdmVCZWZvcmUnKTtcclxuXHJcblx0XHRyZXR1cm4gZmlsdGVyZWRPcHRpb25zO1xyXG5cdH1cclxuXHJcblx0Ly8gUGFzcyBhbGwgb3B0aW9ucyBhcyBmdW5jdGlvbiBhcmd1bWVudHNcclxuXHRmdW5jdGlvbiBwYXNzQWxsICggb3B0aW9ucywgbWV0aG9kLCBpbnB1dCApIHtcclxuXHRcdHZhciBpLCBhcmdzID0gW107XHJcblxyXG5cdFx0Ly8gQWRkIGFsbCBvcHRpb25zIGluIG9yZGVyIG9mIEZvcm1hdE9wdGlvbnNcclxuXHRcdGZvciAoIGkgPSAwOyBpIDwgRm9ybWF0T3B0aW9ucy5sZW5ndGg7IGkrPTEgKSB7XHJcblx0XHRcdGFyZ3MucHVzaChvcHRpb25zW0Zvcm1hdE9wdGlvbnNbaV1dKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBcHBlbmQgdGhlIGlucHV0LCB0aGVuIGNhbGwgdGhlIG1ldGhvZCwgcHJlc2VudGluZyBhbGxcclxuXHRcdC8vIG9wdGlvbnMgYXMgYXJndW1lbnRzLlxyXG5cdFx0YXJncy5wdXNoKGlucHV0KTtcclxuXHRcdHJldHVybiBtZXRob2QuYXBwbHkoJycsIGFyZ3MpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gd051bWIgKCBvcHRpb25zICkge1xyXG5cclxuXHRcdGlmICggISh0aGlzIGluc3RhbmNlb2Ygd051bWIpICkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IHdOdW1iICggb3B0aW9ucyApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdHlwZW9mIG9wdGlvbnMgIT09IFwib2JqZWN0XCIgKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRvcHRpb25zID0gdmFsaWRhdGUob3B0aW9ucyk7XHJcblxyXG5cdFx0Ly8gQ2FsbCAnZm9ybWF0VG8nIHdpdGggcHJvcGVyIGFyZ3VtZW50cy5cclxuXHRcdHRoaXMudG8gPSBmdW5jdGlvbiAoIGlucHV0ICkge1xyXG5cdFx0XHRyZXR1cm4gcGFzc0FsbChvcHRpb25zLCBmb3JtYXRUbywgaW5wdXQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBDYWxsICdmb3JtYXRGcm9tJyB3aXRoIHByb3BlciBhcmd1bWVudHMuXHJcblx0XHR0aGlzLmZyb20gPSBmdW5jdGlvbiAoIGlucHV0ICkge1xyXG5cdFx0XHRyZXR1cm4gcGFzc0FsbChvcHRpb25zLCBmb3JtYXRGcm9tLCBpbnB1dCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHdOdW1iO1xyXG5cclxufSkpOyJdLCJmaWxlIjoibGlicy93TnVtYi5qcyJ9
