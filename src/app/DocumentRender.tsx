import React, { ComponentProps } from 'react'
import { type DocumentRendererProps, DocumentRenderer } from '@keystone-6/document-renderer'
import { Hero } from '@components/blocs/Hero'
import { Callout } from '@components/blocs/Callout'

// By default the DocumentRenderer will render unstyled html elements.
// We're customising how headings are rendered here but you can customise
// any of the renderers that the DocumentRenderer uses.
const renderers: DocumentRendererProps['renderers'] = {
  // Render heading blocks
  block: {
    heading({ level, children, textAlign }) {
      const Comp = `h${level}` as const
      return <Comp style={{ textAlign, textTransform: 'uppercase' }}>{children}</Comp>
    },
  },
}

type CustomRendererProps = ComponentProps<typeof DocumentRenderer>

const customComponentRenderers: CustomRendererProps["componentBlocks"] = {
	hero: (props) => {
		return <Hero {...props} />
	},
	callout: (props) => {
		return <Callout {...props} />
	},
	
}

export function DocumentRender({ document }: { document: any }) {
  return <DocumentRenderer document={document} componentBlocks={customComponentRenderers} renderers={renderers} />
}
