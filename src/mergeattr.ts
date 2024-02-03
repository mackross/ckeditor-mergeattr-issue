import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

import ckeditor5Icon from '../theme/icons/ckeditor.svg';
import type { ViewElement } from 'ckeditor5/src/engine';
import type { ClipboardContentInsertionEvent } from 'ckeditor5/src/clipboard';

export default class Mergeattr extends Plugin {
	public static get pluginName() {
		return 'Mergeattr' as const;
	}

	public init(): void {
		const editor = this.editor;
		const t = editor.t;
		const model = editor.model;
		const conversion = editor.conversion;

		// add the new attribute to the schema and conversions
		model.schema.extend( '$text', { allowAttributes: 'newAttr' } );
		conversion.for( 'downcast' ).attributeToElement( {
			model: 'newAttr',
			view: ( href, { writer } ) => {
				return writer.createAttributeElement( 'ins', { href } );
			}
		} );
		conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'ins',
				attributes: {
					href: true
				}
			},
			model: {
				key: 'newAttr',
				value: ( viewElement: ViewElement ) => { return viewElement.getAttribute( 'href' ); }
			}
		} );

		editor.plugins.get( 'ClipboardPipeline' ).on<ClipboardContentInsertionEvent>( 'contentInsertion', ( evt, data ) => {
			const random = Math.random().toString( 36 ).substring( 7 );

			model.change( writer => {
				const range = writer.createRangeIn( data.content );
				for ( const item of range.getItems() ) {
					if ( item.is( '$text' ) || item.is( '$textProxy' ) ) {
						writer.setAttribute( 'newAttr', random, item );
					}
				}
			} );
		} );
	}
}
