import { expect } from 'chai';
import { Mergeattr as MergeattrDll, icons } from '../src';
import Mergeattr from '../src/mergeattr';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 Mergeattr DLL', () => {
	it( 'exports Mergeattr', () => {
		expect( MergeattrDll ).to.equal( Mergeattr );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
