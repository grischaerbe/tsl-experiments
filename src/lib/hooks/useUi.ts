import { getContext, setContext, type Snippet } from 'svelte'
import { SvelteSet } from 'svelte/reactivity'

const uiContextName = Symbol('ui')

type UiContext = {
	uiSnippets: SvelteSet<Snippet>
	addSnippet: (snippet: Snippet) => void
	removeSnippet: (snippet: Snippet) => void
}

export const createUiContext = () => {
	const uiSnippets = new SvelteSet<Snippet>()

	const addSnippet = (snippet: Snippet) => {
		uiSnippets.add(snippet)
	}

	const removeSnippet = (snippet: Snippet) => {
		uiSnippets.delete(snippet)
	}

	setContext<UiContext>(uiContextName, {
		uiSnippets,
		addSnippet,
		removeSnippet
	})

	return { uiSnippets }
}

export const useUi = () => {
	return getContext<UiContext>(uiContextName)
}
