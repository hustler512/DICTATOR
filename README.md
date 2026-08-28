# Dictator: Complete Technical Report

## 1. Project Identity

Dictator is a browser-only dictation and study application. A user pastes or imports study material, creates a local project, divides the material into small word groups, and listens to those groups repeatedly through the browser speech engine.

The application is intentionally a static website:

- No backend server is required.
- No user account is required.
- No build tool or package manager is required at runtime.
- Projects are stored locally in IndexedDB.
- Settings and temporary drafts are stored in localStorage.
- Speech is produced by the Web Speech API when a compatible browser voice exists.
- PDF, DOCX, and language detection dependencies are loaded from public CDNs only when their features are used.

The project is suitable for opening directly as a static site or deploying to any static host.

## 2. Repository Layout

```text
DICTATOR/
├── index.html
├── README.md
├── css/
│   └── styles.css
└── js/
		├── app.js
		├── db.js
		├── parser.js
		├── router.js
		├── tts.js
		├── ui.js
		└── voice-lab.js
```

### Required files

- `index.html` is the application shell and script loader.
- `css/styles.css` defines the complete visual system and responsive layout.
- `js/db.js` provides IndexedDB persistence.
- `js/parser.js` handles tokenization, structure detection, grouping, speech preparation, and file extraction.
- `js/tts.js` manages speech playback, voices, pauses, progress, and fallback audio.
- `js/ui.js` renders pages, project forms, the demo project, reader controls, translations, and user actions.
- `js/router.js` maps URL hash routes to UI render functions.
- `js/app.js` initializes settings, themes, navigation panels, localization, and the router.
- `js/voice-lab.js` adds voice selection and preview tools.

`api/` and `node_modules/` are not required by this repository. The current app has no local API and no Node build pipeline.

## 3. Running the Application

### Direct opening

Open `index.html` in a modern browser. Basic text entry, local projects, and browser speech can work directly from the file system, although browser security rules are more reliable on an HTTP origin.

### Recommended local server

From the project root:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

An HTTP origin is recommended because dynamic imports for PDF, DOCX, and language detection are more predictable there.

## 4. HTML Application Shell

`index.html` contains the stable DOM surfaces that JavaScript fills or controls.

### Document setup

- `<!doctype html>` enables standards mode.
- `<html lang="en">` provides an initial accessibility language; `app.js` changes it at runtime when the user selects another UI locale.
- The viewport meta tag makes the layout responsive on phones.
- The title is `Dictator`.
- The early theme script reads saved settings before the page paints, reducing light/dark theme flashing.

### Header

The header contains:

- Navigation menu button: opens the mobile/side navigation panel.
- `DICTATOR` logo button: routes to Home.
- Desktop navigation buttons: Home, Projects, About, and Help.
- Settings gear: opens the right-side Settings panel.
- Theme button: switches between light and dark display modes.

### Application regions

- `#scrim` is the dimmed overlay behind an open side panel.
- `#page-menu` is the navigation panel.
- `#settings-panel` is the settings panel.
- `#app` is the main route-rendered content area.
- `#toast-region` contains temporary success and error notices.
- `#modal-region` is reserved for future modal UI.

### Script order

Script order is significant:

1. `db.js` defines persistence functions.
2. `parser.js` defines token and speech helpers.
3. `tts.js` defines `window.TTS` and depends on parser functions.
4. `ui.js` defines `window.UI` and depends on parser, database, TTS, and router names at call time.
5. `router.js` defines `window.Router` and routes through `window.UI`.
6. `app.js` initializes the application and connects UI, Router, and TTS.
7. `voice-lab.js` enhances the Settings panel and reader footer after the core app exists.

The query-string versions on scripts are cache-busting identifiers. Increase the relevant version after changing a browser-loaded JavaScript file if an old bundle appears to be running.

## 5. Data and Persistence: `js/db.js`

`db.js` is the storage layer. It uses IndexedDB database `DictatorDB`, version `2`.

### Database configuration

- Main object store: `projects`, keyed by `id`.
- Secondary index: `updatedAt`, used conceptually for recency ordering.
- Secondary index: `name`, available for project-name lookup.
- Voice store: `voiceModels`, keyed by `key`; it is available for cached voice models even though current playback uses browser voices.

### Promise adapters

- `openDB()` opens the database once and caches the resulting promise.
- `requestPromise()` converts an IndexedDB request callback into a promise.
- `transactionPromise()` waits for transaction completion and rejects on error or abort.

These adapters allow the rest of the application to use `async`/`await` instead of nested IndexedDB callbacks.

### Project operations

- `createProject(projectData)` checks the 20-project limit, assigns a UUID, and adds creation/update timestamps.
- `getProject(id)` reads one project.
- `updateProject(id, updates)` merges updates into an existing project and refreshes `updatedAt`.
- `deleteProject(id)` removes a project.
- `listProjects(limit)` loads all projects, sorts them newest first, and limits the returned list.
- `getProjectCount()` returns the number of stored projects.

### Voice model operations

- `getVoiceModel(key)` reads a cached voice model record.
- `saveVoiceModel(model)` writes a voice model record.

The database layer does not know about page rendering or speech scheduling. It only stores and retrieves data.

## 6. Parsing and Grouping: `js/parser.js`

### `MAX_WORDS`

The application imposes no 5,000-word project limit. Very large documents may still be constrained by browser memory, IndexedDB quota, speech-engine limits, or device performance.

### `tokenize(text)`

The current tokenizer trims input and splits on whitespace while preserving punctuation on visible tokens. It does not impose a word-count limit. This keeps visible text, word counts, and stored project content separate from speech-only processing.

### `detectStructure(lines)`

This function identifies structural markers without changing the source text:

- Lines beginning with `# ` become titles.
- Lines beginning with `## ` become subtitles.
- Very short isolated lines can become titles.
- Symbol-only short lines can become titles.
- A line ending in `:` followed by a blank line can become a subtitle.

The result stores marker type and token index. Group creation later uses those indexes to mark groups as title or subtitle groups.

### `createGroups(tokens, wordsPerGroup, structure)`

This function divides tokens into groups of 1 to 10 words. Each group contains:

- `index`: zero-based group index.
- `words`: original token array for that group.
- `rawText`: visible group text joined by spaces.
- `hasTitle`: whether a title marker falls in the group.
- `hasSubtitle`: whether a subtitle marker falls in the group.
- `startTokenIndex` and `endTokenIndex`: original token boundaries.

Grouping is used by both the reader display and TTS scheduling. The speech preparation layer may reinterpret punctuation, but it does not change these stored group boundaries.

### Speech symbol dictionaries

`SPEECH_SYMBOLS` contains localized names for meaningful symbols in seven locales:

- English: `en`
- Portuguese: `pt`
- French: `fr`
- Spanish: `es`
- German: `de`
- Italian: `it`
- Russian: `ru`

Supported symbol families include:

- Social/technical symbols: `@`, `#`, `&`, `|`, `~`, `_`, `^`.
- Mathematics: `+`, `-`, `×`, `*`, `÷`, `=`, `≠`, `<`, `>`, `≤`, `≥`, `±`, `√`, `∞`.
- Percent and per-mille: `%`, `‰`.
- Currency: `$`, `€`, `£`, `¥`, `₹`, `₽`, `₿`, `¢`.
- Paths and separators: `/`, `\\`, `•`.
- Arrows: `→`, `←`, `↑`, `↓`, `↔`, `⇒`, `⇐`.

The visible character is kept in the project. The dictionary only supplies the text sent to speech.

### `normalizeSpeechNumbers(value, language)`

This speech-only helper handles common forms before symbol splitting:

- Decimal points become language-appropriate spoken separators.
- Clock-like values such as `12:07` are transformed into a speech-friendly sequence.
- Fractions such as `1/2` become language-specific “one over two” forms.

This is intentionally conservative. Ambiguous identifiers and complex date formats should not be aggressively rewritten.

### `prepareSpeechUnits(text, isTitle, isSubtitle, language)`

This is the main speech preparation function. It:

1. Selects the dictionary for the requested language.
2. Normalizes common numeric forms.
3. Finds meaningful symbols and punctuation.
4. Creates separate speech units around those characters.
5. Gives every spoken symbol a `pauseBefore` value of `300` milliseconds.
6. Removes unrecognized Unicode symbol/control characters from speech.
7. Preserves words and ordinary text for speech.

The function returns objects shaped like:

```js
{ text: 'percent', pauseBefore: 300 }
```

The reader still displays the original raw text. Only speech units are transformed.

### `transformForTTS(...)`

This compatibility helper joins prepared unit text into one string. The active TTS path uses `prepareSpeechUnits()` directly so it can honor pause metadata.

### File extraction

- `extractTXT(file)` uses the browser File API.
- `extractPDF(arrayBuffer)` dynamically imports `pdfjs-dist` from jsDelivr, configures its worker, and extracts page text.
- `extractDOCX(arrayBuffer)` lazily loads Mammoth's browser bundle from jsDelivr and extracts raw DOCX text. The browser bundle is used instead of Mammoth's ESM entry because the latter can fail in browser dependency resolution.
- `detectLanguage(text)` dynamically imports `franc-min` and maps ISO-like detection results to the seven supported speech languages.

Imported libraries are loaded lazily, so the initial app does not need them.

## 7. Speech Engine: `js/tts.js`

`tts.js` exposes `window.TTS`, a stateful controller for the current reader project.

### Voice selection

The controller reads voices from `speechSynthesis.getVoices()` and ranks them by:

- Exact language match.
- Locale prefix match, such as `en-US` for `en`.
- Preferred voice-family patterns such as online natural, neural, enhanced, or known platform voices.
- Remote/cloud hints when exposed by browser metadata.
- Default voice status.
- Penalties for common legacy or undesirable voice names.

Voice lists are asynchronous. The `voiceschanged` event can cause the Voice Lab and reader voice list to refresh.

### Saved voice

`savedVoice()` reads `voiceURI` from localStorage. `selectVoice(voiceURI)` updates that setting. A saved voice is reused when it matches the active language.

### Preview methods

- `previewVoice(voice, speed, text)` creates a `SpeechSynthesisUtterance`, assigns the voice and language, and speaks it.
- `previewLanguage(language, speed, text)` tries a matching browser voice first and otherwise creates an online fallback audio request.
- `fallbackAudioUrl(text, language)` constructs the Google Translate TTS URL using the selected language code.

### Project lifecycle

- `load(project)` clears previous playback, stores the active project, selects a compatible voice, and synchronizes UI state.
- `clear()` cancels timers, browser speech, and fallback audio while advancing a generation counter to invalidate old callbacks.
- `stop()` clears playback and removes the active project.
- `restart()` resets group and repetition progress.

### Speech state

The controller uses states including:

- `idle`
- `loading`
- `playing`
- `between_groups`
- `between_repeats`
- `paused`
- `finished`

The UI reads this state to highlight the current group, update the status line, and change the Play button behavior.

### Browser speech flow

When playback begins:

1. The active group is selected.
2. `prepareSpeechUnits()` creates localized speech units.
3. Before each unit with `pauseBefore`, the controller waits 300ms.
4. Each unit becomes its own `SpeechSynthesisUtterance`.
5. The selected voice and project speech language are assigned.
6. The next unit begins after the current utterance emits `onend`.
7. When the group finishes, progress advances or repetition scheduling begins.

Splitting units is important because a browser speech engine may not audibly announce a raw character such as `@` or `,`. The localized word, such as “at”, “arroba”, or “arobase”, is much more reliably spoken.

### Online fallback flow

If no matching browser voice is available, each prepared unit is requested as separate fallback audio. The same 300ms pre-symbol pause is applied between units. Playback errors are reported through the UI toast system.

### Configurable group pause

The pause between groups and repetitions is controlled by `project.config.pauseDuration` when present, otherwise by the saved global `defaultPauseDuration` setting.

- Minimum: `0` seconds.
- Maximum: `3.5` seconds.
- Default: `0.8` seconds.
- Stored internally in seconds and converted to milliseconds for `setTimeout`.

This is separate from the 300ms symbol pause and separate from speech rate.

### Reader controls

`configChange(key, value)` handles:

- `wordsPerGroup`: rebuilds groups and resets progress.
- `repetitions`: changes repeat count.
- `speed`: changes utterance rate.
- `pauseDuration`: changes the group/repetition pause.
- `language`: changes the project speech language and selects a matching voice.

Non-demo projects persist configuration changes to IndexedDB. The built-in demo is generated in memory and is never stored.

## 8. UI Rendering: `js/ui.js`

`ui.js` owns the visible application experience. It renders HTML strings into `#app`, binds event handlers, and delegates persistence or playback to other modules.

### Translation system

The `UI_TEXT` registry contains page strings for the seven UI locales. `getUiLanguage()` reads `settings.uiLanguage`, resolves `auto` through `DictatorI18n`, and falls back to English. `t(key, fallback)` retrieves a localized value, falling back to English if a key is missing.

The UI language is deliberately separate from the project speech language. A user can read the interface in French while a project speaks Portuguese, for example.

### Home page

`renderHome(editId)` renders:

- Hero label and heading.
- Description of the listening session.
- Recent project list.
- Project count.
- Text input area.
- Word counter.
- TXT/PDF/DOCX file picker.
- Drag-and-drop area.
- Start or Save button.
- Local privacy note.

`bindHome()` restores drafts, updates the word counter, saves draft content to localStorage, binds file import, handles drag-and-drop, and creates or updates projects.

New projects inherit default group size, repetitions, speed, language, theme, and pause duration from settings.

### Projects page

`renderProjects()` displays:

- Library heading and description.
- New project action.
- Built-in demo project card.
- User project cards.
- Open, Rename, and Delete actions.
- Empty state when no user projects exist.
- Storage usage progress toward the 20-project limit.

Rename uses a browser prompt. Delete uses a browser confirmation dialog. These are deliberately simple MVP interactions.

### Reader page

`renderProject(id)` loads a stored project or generates the demo. It renders:

- Back link.
- Demo or Reader View label.
- Project title.
- Text content with title/subtitle styling.
- Previous, Play, and Next controls.
- Words-per-group selector.
- Repetitions selector.
- Speed slider and number input.
- Project speech-language selector.
- Configurable pause slider and number input.
- Voice selector and Preview action.
- Restart button.
- Playback status.

`bindReaderGroups()` makes each visible word group clickable so the user can jump to it.

### Built-in demo

`demoProject()` provides a punctuation and symbol stress test called “The Clockmaker's Last Light”. The demo includes headings, punctuation, times, quotation marks, symbols, numbers, and repeated prose. Its story, title, source label, and speech language are localized according to the active UI language.

The demo is regenerated in memory on every route render. It does not consume the 20-project storage limit and is not written to IndexedDB.

### Static pages

- `renderAbout()` explains the learning purpose and local privacy model.
- `renderHowToUse()` explains the workflow and includes expandable FAQ items.
- `renderPrivacy()` explains storage, browser speech, optional CDN libraries, and data removal.

### Utility behavior

- `toast(message, type)` creates temporary success or danger notices.
- `countText()` updates the word count and disables Start when empty or over limit.
- `sourceMarkup()` creates import controls.
- `loadFile()` selects the proper parser based on file extension.
- `refreshReader()` rebuilds reader content after grouping changes.
- `updateReaderState()` updates active word groups, status text, and playback button labels.

## 9. Routing: `js/router.js`

The router uses `location.hash` instead of a server-side URL system.

Examples:

- `#/` or `#/` with an empty path: Home.
- `#/projects`: Projects list.
- `#/project/<id>`: Reader page.
- `#/edit/<id>`: Home editor for an existing project.
- `#/about`: About page.
- `#/how-to-use`: How to use page.
- `#/privacy`: Privacy page.

`navigate(value)` writes the hash. `handle()` reads the hash, stops speech outside reader routes, and calls the matching UI renderer. `init()` registers the `hashchange` listener and performs the first render.

## 10. Application Bootstrap: `js/app.js`

`app.js` owns global settings and shell behavior.

### Settings defaults

The defaults include:

```js
{
	uiLanguage: 'auto',
	defaultDictationLang: 'auto',
	defaultWordsPerGroup: 6,
	defaultRepetitions: 2,
	defaultSpeed: 0.9,
	defaultPauseDuration: 0.8,
	theme: 'system'
}
```

### UI locale resolution

- `getSystemUiLanguage()` reads `navigator.language` or the first `navigator.languages` value.
- `resolveUiLanguage(value)` resolves `auto`, validates supported locales, and falls back to English.
- `applyUiLanguage()` writes the resolved locale to `document.documentElement.lang` and `data-ui-language`.

### Theme

`applyTheme(theme)` supports light, dark, and system preference behavior. The initial inline script in `index.html` applies a first-paint theme; `app.js` applies the final state and changes the theme icon.

### Side panels

`panel(id, open)` toggles the panel class, updates `aria-hidden`, and controls the scrim. The navigation and Settings panels are populated dynamically so their labels can be translated.

### Settings controls

The right-side Settings panel contains:

- UI language selector.
- Default dictation language selector.
- Words per group selector.
- Repetitions selector.
- Speed slider and numeric input.
- Pause-between-groups slider and numeric input.
- Voice Lab.

The UI language choice reloads the page so every module initializes consistently in the new locale. The pause setting is saved in localStorage and is used as the fallback for new or older projects without a project-specific pause value.

## 11. Voice Lab: `js/voice-lab.js`

Voice Lab is an enhancement layer, not the owner of the main reader speech pipeline.

It provides:

- Test-language selection.
- Compatible voice list.
- Voice URI persistence.
- Preview action.
- Refresh voices action.
- Voice availability status.

It listens for browser `voiceschanged` events and observes relevant DOM changes so the tool can appear after Settings opens or after a reader route is rendered.

The reader footer also receives a voice selector and Preview button for the active project language.

## 12. Visual Design and CSS

`css/styles.css` is a single stylesheet with a base design layer and a later mockup-aligned application layer.

### Design direction

The final visual language is calm, editorial, and study-focused:

- Neutral gray and white surfaces.
- Teal accent color for actions, focus, progress, and active speech groups.
- Serif body typography for reading and study content.
- Trebuchet-style controls for compact UI labels.
- Thin borders and restrained shadows.
- Small radius values for practical controls and cards.
- Strong whitespace around reading content.
- Responsive layouts that collapse into one column on small screens.

### CSS variables

The stylesheet defines variables for backgrounds, surfaces, elevated surfaces, primary/secondary/muted text, accent colors, borders, danger/warning/success colors, and shadows. Dark mode replaces these variables under `[data-theme="dark"]`.

There are two variable declarations because the later “Mockup-aligned application surfaces” block intentionally refines the initial theme palette. The later values are the effective final values in the cascade.

### Header and panels

- `.app-header` creates the top shell.
- `.desktop-nav` handles wide-screen navigation.
- `.side-panel` creates sliding left and right panels.
- `.scrim` blocks and dims the page behind an open panel.
- `.panel-header`, `.nav-link`, and `.setting` define panel internals.

### Home and forms

- `.hero` centers the main task message.
- `.input-box` creates the writing surface.
- `.file-zone` divides import actions.
- `.start-button` creates the primary action.
- `.recent-panel` shows recent local work.
- `.counter.warning` and `.counter.danger` communicate word-limit pressure.

### Projects

- `.project-list` constrains the library width.
- `.project-card` creates repeated project rows.
- `.card-actions` supports responsive action wrapping.
- `.storage` and `.progress` communicate the 20-project capacity.

### Reader

- `.reader-shell` provides the long-form reading surface.
- `.reader-title`, `.reader-subtitle`, and `.reader-paragraph` distinguish structure.
- `.word-group` is clickable and receives the active teal highlight during playback.
- `.dictation-footer` is fixed to the viewport bottom.
- `.speed-control` styles the speed and pause slider/number pairs.

### Responsive behavior

- At 768px and below, desktop navigation disappears and page headings/cards stack.
- At 480px and below, panels become narrower, file actions stack, controls shrink, and the reader receives extra bottom padding for the fixed footer.
- `prefers-reduced-motion: reduce` disables transitions.
- Focus-visible outlines use the accent color for keyboard accessibility.

## 13. User Workflows

### Create a project

1. Open Home.
2. Paste text or import TXT, PDF, or DOCX.
3. Review the word count.
4. Press Start to dictate.
5. The app detects or uses the default speech language.
6. The project is written to IndexedDB.
7. The reader route opens.

### Read and repeat

1. The current group is highlighted.
2. Press Play.
3. Browser speech reads prepared units.
4. Meaningful symbols receive localized names.
5. A 300ms pause occurs before each spoken symbol or punctuation name.
6. After the group, the configurable pause occurs.
7. The group repeats or the reader advances.
8. Progress is persisted for stored projects.

### Change language

- UI language is changed from the gear and affects frontend labels and localized demo content.
- Dictation language is changed in the default Settings selector or reader language selector and affects speech voice/language.
- These settings are independent.

### Change pause timing

- Top-right Settings controls the saved default.
- Reader footer controls the active project.
- Both use a synchronized slider and numeric input.
- Values range from `0` to `3.5` seconds.
- The default is `0.8` seconds.

## 14. Accessibility and Semantics

- Buttons and form controls use native HTML controls.
- Side panels expose `aria-hidden` state.
- The toast region uses `aria-live="polite"`.
- Inputs have labels or accessible labels.
- Focus-visible outlines are explicitly styled.
- The document language is updated when UI locale changes.
- The fixed reader footer remains keyboard-operable.

The application still has areas for improvement: some icon-only labels rely on `aria-label`, browser dialogs are native, and the demo content itself is not translated by machine translation at runtime; it uses authored locale variants.

## 15. Network and Privacy Model

Normal project creation and reading are local. The app does not send notes to an application server.

Network requests can occur when:

- PDF extraction loads `pdfjs-dist` from jsDelivr.
- DOCX extraction loads Mammoth from jsDelivr.
- Language detection loads `franc-min` from jsDelivr.
- No browser voice is available and the online fallback TTS URL is used.

Users should understand that imported-library CDNs and online speech fallback are external services. For completely offline use, use TXT input and an installed browser speech voice.

## 16. Browser and Platform Limitations

- Voice availability depends on the browser and operating system.
- The browser may expose legacy voices instead of cloud or neural voices.
- Voice lists arrive asynchronously.
- Some browsers require an interaction before speech can begin.
- Mobile browsers may stop speech when the tab is backgrounded or the screen locks.
- Online fallback speech requires network access.
- The 20-project limit is enforced in the application layer.
- The tokenizer is whitespace-based and is not a full linguistic segmenter.
- Number normalization is intentionally conservative.
- Cloud sync, accounts, project export, and advanced CJK segmentation are outside the current scope.

## 17. Validation Checklist

For a future AI or maintainer, validate changes in this order:

1. Run `node --check` on every JavaScript file.
2. Use `http://localhost:8000` rather than relying only on a file URL.
3. Reload Home and confirm `window.UI`, `window.Router`, and `window.TTS` exist.
4. Open Settings and verify the pause default is `0.8`.
5. Open the demo reader and verify the footer pause control is present with a `0–3.5` range.
6. Change the pause to `0`, `1.2`, and `3.5`; verify the numeric and range controls stay synchronized.
7. Test all seven UI locales: `en`, `pt`, `fr`, `es`, `de`, `it`, and `ru`.
8. Test all seven speech locales with `@`, `#`, `%`, `+`, `=`, punctuation, decimals, times, and fractions.
9. Verify every spoken symbol unit has a 300ms pre-symbol pause.
10. Verify group and repetition transitions use the configured pause duration.
11. Verify the visible project text and word grouping do not change during speech preparation.
12. Check the browser console for runtime exceptions, not only syntax errors.

## 18. Maintenance Rules

- Keep UI language and dictation language separate.
- Do not alter stored visible text when improving speech pronunciation.
- Add new translation keys to every supported locale or provide an intentional fallback.
- Keep speech symbol dictionaries language-specific.
- Preserve the 20-project limit unless the storage contract changes.
- Update script cache versions after browser-loaded JavaScript changes.
- Keep dynamic CDN imports lazy.
- Prefer small, focused changes because the app has no build step or automated test runner.
- Update this README when behavior, routes, storage, browser requirements, or controls change.

## 19. Current Feature Summary

Dictator currently includes:

- Local dictation projects.
- Home writing and import surface.
- TXT, PDF, and DOCX import.
- Automatic or manually selected speech language.
- Seven localized frontend languages.
- Seven localized demo project variants.
- Browser voice ranking and selection.
- Voice Lab preview tooling.
- Clickable reader groups.
- Adjustable group size from 1 to 10 words.
- Adjustable repetitions from 1 to 10.
- Adjustable speech speed from 0.25x to 2x.
- Adjustable group/repetition pause from 0 to 3.5 seconds.
- Default pause of 0.8 seconds.
- Localized audible symbols and punctuation.
- 300ms pause before spoken symbols.
- Natural handling for common decimals, times, and fractions.
- Local IndexedDB persistence.
- Local draft recovery.
- Light, dark, and system theme behavior.
- Responsive desktop and mobile layouts.
