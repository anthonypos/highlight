import {
	customTrace,
	initializeSdk,
	installSdk,
} from '../../backend/ruby/shared-snippets'
import { frontendInstallSnippet } from '../../backend/shared-snippets'
import { QuickStartContent } from '../../QuickstartContent'
import { verifyTraces } from '../shared-snippets'

export const RubyRailsTracesContent: QuickStartContent = {
	title: 'Ruby',
	subtitle:
		'Learn how to set up highlight.io tracing for Ruby on Rails applications.',
	entries: [
		frontendInstallSnippet,
		installSdk,
		initializeSdk,
		customTrace,
		verifyTraces,
	],
}
