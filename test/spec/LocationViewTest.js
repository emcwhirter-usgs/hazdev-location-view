/* global define, describe, it */
define([
	'chai',
	'LocationView'
], function (
	chai,
	LocationView
) {
	'use strict';
	var expect = chai.expect;

	describe('LocationView test suite', function () {

		describe('Class Definition', function () {
			it('Can be required', function () {
				/* jshint -W030 */
				expect(LocationView).to.not.be.null;
				/* jshint +W030 */
			});
		});

	});

});